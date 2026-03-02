/**
 * Hashtag Generation Engine
 *
 * Algorithmic hashtag generation from free-text input.
 * Extracts keywords, matches against database, generates compound variations,
 * adds trending formats, and estimates popularity tiers.
 */

import {
  KEYWORD_HASHTAG_MAP,
  COMPOUND_RULES,
  TRENDING_FORMATS,
  CONTENT_TYPE_TAGS,
  CO_OCCURRENCE,
  CATEGORY_BROADENERS,
  STOP_WORDS,
  TIER,
} from '../data/hashtagDatabase.js';

/**
 * Extract meaningful keywords from user input text.
 * Handles multi-word phrases and single keywords.
 */
export function extractKeywords(input) {
  if (!input || typeof input !== 'string') return [];

  const cleaned = input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return [];

  const words = cleaned.split(' ').filter(w => w.length > 1);

  // Filter stop words but keep them for compound matching
  const keywords = words.filter(w => !STOP_WORDS.has(w));

  // Also include all words (including stop words) for phrase matching
  return { keywords, allWords: words };
}

/**
 * Generate a raw hashtag directly from input words by joining them.
 * e.g., ["vegan", "meal", "prep"] -> "veganmealprep"
 */
function generateDirectHashtags(keywords) {
  const results = [];

  // Single keyword direct tags
  for (const kw of keywords) {
    results.push({ tag: kw, tier: estimateTier(kw), source: 'direct' });
  }

  // Two-word compounds
  for (let i = 0; i < keywords.length - 1; i++) {
    for (let j = i + 1; j < keywords.length && j <= i + 3; j++) {
      const compound = keywords[i] + keywords[j];
      results.push({ tag: compound, tier: estimateTier(compound), source: 'compound' });
      // Reverse order too
      const reverse = keywords[j] + keywords[i];
      if (reverse !== compound) {
        results.push({ tag: reverse, tier: estimateTier(reverse), source: 'compound' });
      }
    }
  }

  // Three-word compounds (if input has 3+ keywords)
  if (keywords.length >= 3) {
    for (let i = 0; i < keywords.length - 2; i++) {
      const compound = keywords[i] + keywords[i + 1] + keywords[i + 2];
      results.push({ tag: compound, tier: estimateTier(compound), source: 'long-tail' });
    }
  }

  // Full input as one tag (if 2-4 words)
  if (keywords.length >= 2 && keywords.length <= 4) {
    const full = keywords.join('');
    results.push({ tag: full, tier: 'micro', source: 'long-tail' });
  }

  // Add common suffixes
  const suffixes = ['tips', 'life', 'daily', 'community', 'lover', 'goals', 'inspo'];
  for (const kw of keywords.slice(0, 3)) {
    for (const suffix of suffixes) {
      if (kw !== suffix && !keywords.includes(suffix)) {
        const combined = kw + suffix;
        if (combined.length <= 25) {
          results.push({ tag: combined, tier: estimateTier(combined), source: 'variation' });
        }
      }
    }
  }

  return results;
}

/**
 * Estimate the popularity tier of a hashtag based on its composition.
 * Single common words = high, multi-word compound = niche/micro.
 */
function estimateTier(tag) {
  const len = tag.length;

  // Check if it's in our database for accurate tier
  for (const entries of Object.values(KEYWORD_HASHTAG_MAP)) {
    const found = entries.find(e => e.tag === tag);
    if (found) return found.tier;
  }

  // Heuristic: shorter = more popular
  if (len <= 5) return TIER.HIGH;
  if (len <= 10) return TIER.MEDIUM;
  if (len <= 18) return TIER.NICHE;
  return TIER.MICRO;
}

/**
 * Look up keywords in the database and collect matching hashtags.
 */
function lookupKeywords(keywords) {
  const results = [];

  for (const kw of keywords) {
    // Direct keyword match
    if (KEYWORD_HASHTAG_MAP[kw]) {
      for (const entry of KEYWORD_HASHTAG_MAP[kw]) {
        results.push({ ...entry, source: 'database' });
      }
    }

    // Partial match: check if any database key starts with or contains the keyword
    for (const [dbKey, entries] of Object.entries(KEYWORD_HASHTAG_MAP)) {
      if (dbKey !== kw && (dbKey.startsWith(kw) || kw.startsWith(dbKey))) {
        for (const entry of entries.slice(0, 4)) {
          results.push({ ...entry, source: 'partial-match' });
        }
      }
    }
  }

  return results;
}

/**
 * Find and apply compound rules where multiple keywords match.
 */
function applyCompoundRules(keywords) {
  const results = [];
  const keywordSet = new Set(keywords);

  for (const rule of COMPOUND_RULES) {
    if (rule.keys.every(k => keywordSet.has(k))) {
      for (const entry of rule.tags) {
        results.push({ ...entry, source: 'compound-rule' });
      }
    }
  }

  return results;
}

/**
 * Broaden the search by looking up parent categories.
 */
function getBroaderTags(keywords) {
  const results = [];
  const addedCategories = new Set();

  for (const kw of keywords) {
    const broader = CATEGORY_BROADENERS[kw];
    if (broader) {
      for (const cat of broader) {
        if (!addedCategories.has(cat) && !keywords.includes(cat)) {
          addedCategories.add(cat);
          const entries = KEYWORD_HASHTAG_MAP[cat];
          if (entries) {
            // Only take the top broad/medium tags from broader categories
            for (const entry of entries.filter(e => e.tier === 'high' || e.tier === 'medium').slice(0, 3)) {
              results.push({ ...entry, source: 'broader' });
            }
          }
        }
      }
    }
  }

  return results;
}

/**
 * Get platform-specific trending format tags.
 */
function getTrendingTags(platformId) {
  return (TRENDING_FORMATS[platformId] || []).map(entry => ({
    ...entry,
    source: 'trending',
  }));
}

/**
 * Get content-type-specific tags.
 */
function getContentTypeTags(contentTypeId) {
  return (CONTENT_TYPE_TAGS[contentTypeId] || []).map(entry => ({
    ...entry,
    source: 'content-type',
  }));
}

/**
 * Get related/co-occurring hashtags for a given hashtag.
 */
export function getRelatedHashtags(tag) {
  const cleanTag = tag.replace(/^#/, '');
  const related = CO_OCCURRENCE[cleanTag];
  if (!related) return [];

  return related.map(relTag => {
    // Find tier from database
    let tier = 'niche';
    for (const entries of Object.values(KEYWORD_HASHTAG_MAP)) {
      const found = entries.find(e => e.tag === relTag);
      if (found) {
        tier = found.tier;
        break;
      }
    }
    return { tag: relTag, tier };
  });
}

/**
 * Main generation function. Takes user input and returns a deduplicated,
 * scored, and categorized set of hashtags.
 */
export function generateHashtags(input, platformId, contentTypeId) {
  const { keywords } = extractKeywords(input);

  if (keywords.length === 0) {
    return { high: [], medium: [], niche: [], micro: [], total: 0 };
  }

  // Collect all hashtags from different sources
  const allTags = [
    ...lookupKeywords(keywords),
    ...applyCompoundRules(keywords),
    ...generateDirectHashtags(keywords),
    ...getBroaderTags(keywords),
    ...getTrendingTags(platformId),
    ...getContentTypeTags(contentTypeId),
  ];

  // Deduplicate by tag name, keeping the entry with the most authoritative source
  const sourcePriority = {
    'database': 5,
    'compound-rule': 4,
    'content-type': 3,
    'trending': 3,
    'broader': 2,
    'partial-match': 2,
    'compound': 1,
    'direct': 1,
    'variation': 0,
    'long-tail': 0,
  };

  const tagMap = new Map();
  for (const entry of allTags) {
    const key = entry.tag.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!key || key.length < 2) continue;

    const existing = tagMap.get(key);
    if (!existing || (sourcePriority[entry.source] || 0) > (sourcePriority[existing.source] || 0)) {
      tagMap.set(key, { ...entry, tag: key });
    }
  }

  // Filter out tags that are just single common words with no relevance
  const filtered = Array.from(tagMap.values()).filter(entry => {
    // Keep all database/compound-rule/content-type/trending entries
    if (['database', 'compound-rule', 'content-type', 'trending'].includes(entry.source)) return true;
    // For generated tags, filter very short generic ones
    if (entry.tag.length < 3) return false;
    // Filter out tags that are identical to stop words
    if (STOP_WORDS.has(entry.tag)) return false;
    return true;
  });

  // Sort by tier priority then alphabetically
  const tierOrder = { high: 0, medium: 1, niche: 2, micro: 3 };
  filtered.sort((a, b) => {
    const tierDiff = (tierOrder[a.tier] || 3) - (tierOrder[b.tier] || 3);
    if (tierDiff !== 0) return tierDiff;
    return a.tag.localeCompare(b.tag);
  });

  // Group by tier
  const result = { high: [], medium: [], niche: [], micro: [] };
  for (const entry of filtered) {
    const tier = entry.tier || 'niche';
    if (result[tier]) {
      result[tier].push({
        tag: '#' + entry.tag,
        source: entry.source,
      });
    }
  }

  // Limit per tier to avoid overwhelming
  result.high = result.high.slice(0, 15);
  result.medium = result.medium.slice(0, 15);
  result.niche = result.niche.slice(0, 15);
  result.micro = result.micro.slice(0, 15);

  result.total = result.high.length + result.medium.length + result.niche.length + result.micro.length;

  return result;
}

/**
 * Auto-build an optimal hashtag set for a given platform.
 * Returns a balanced mix based on platform best practices.
 */
export function autoBuildSet(generated, platformId) {
  const platformMixes = {
    instagram: { high: 2, medium: 3, niche: 4, micro: 1, total: 10 },
    tiktok: { high: 1, medium: 2, niche: 2, micro: 0, total: 5 },
    linkedin: { high: 1, medium: 2, niche: 2, micro: 0, total: 5 },
    twitter: { high: 1, medium: 1, niche: 0, micro: 0, total: 2 },
    pinterest: { high: 1, medium: 2, niche: 2, micro: 0, total: 5 },
  };

  const mix = platformMixes[platformId] || platformMixes.instagram;
  const selected = [];

  for (const tier of ['high', 'medium', 'niche', 'micro']) {
    const available = generated[tier] || [];
    const count = Math.min(mix[tier], available.length);
    for (let i = 0; i < count; i++) {
      selected.push(available[i].tag);
    }
  }

  return selected;
}

/**
 * Platform configuration with limits and recommendations.
 */
export const PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    maxHashtags: 30,
    recommended: '3-5',
    optimalRange: [3, 10],
    tip: 'Instagram recommends 3-5 highly relevant hashtags. The algorithm uses hashtags as search signals, not reach amplifiers. Niche tags often outperform broad ones. Place in caption for best discovery.',
    placement: 'Caption (first comment works too, but caption is slightly better for discovery)',
    mixAdvice: '2 high-volume + 3 medium + 4-5 niche = optimal mix for growth accounts',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    maxHashtags: 10,
    recommended: '3-5',
    optimalRange: [3, 5],
    tip: 'TikTok hashtags drive discoverability through search. Mix 1-2 broad tags with 2-3 niche tags. Avoid irrelevant trending tags — the algorithm penalizes mismatches.',
    placement: 'In the caption, woven naturally into text',
    mixAdvice: '1 trending + 1 broad + 2-3 niche = best TikTok strategy',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    maxHashtags: 5,
    recommended: '3-5',
    optimalRange: [3, 5],
    tip: 'LinkedIn hashtags should be professional and specific. 3-5 max — more hurts reach. Include at least one industry-specific niche tag.',
    placement: 'At the end of your post, separated by line break',
    mixAdvice: '1 industry + 2 topic-specific + 1-2 niche = professional visibility',
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    maxHashtags: 3,
    recommended: '1-2',
    optimalRange: [1, 2],
    tip: 'On X, 1-2 hashtags perform best. More reduces engagement. Use trending or established community tags, not invented ones.',
    placement: 'Woven naturally into the tweet text',
    mixAdvice: '1 trending or community tag + 1 topic tag = maximum engagement',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    maxHashtags: 20,
    recommended: '2-5',
    optimalRange: [2, 5],
    tip: 'Pinterest uses hashtags for search discovery. Use descriptive, keyword-rich tags that match what people search for.',
    placement: 'In the pin description, naturally integrated',
    mixAdvice: '2 broad searchable + 2-3 descriptive niche = best Pinterest discovery',
  },
];

/**
 * Content types for the selector.
 */
export const CONTENT_TYPES = [
  { id: 'general', name: 'General / Mixed' },
  { id: 'product', name: 'Product Launch' },
  { id: 'tips', name: 'Tips & How-To' },
  { id: 'bts', name: 'Behind the Scenes' },
  { id: 'testimonial', name: 'Customer Story' },
  { id: 'event', name: 'Event / Announcement' },
];

/**
 * Quick-fill topic suggestions for the text input.
 */
export const QUICK_TOPICS = [
  'Small Business', 'E-commerce', 'Food & Restaurant', 'Health & Fitness',
  'Real Estate', 'Marketing', 'Tech / SaaS', 'Beauty & Skincare',
  'Travel', 'Photography', 'Sustainability', 'Freelancing',
  'Personal Finance', 'Pet Care', 'Yoga & Wellness', 'Coffee Shop',
  'Local Business', 'Web Design', 'Interior Design', 'Wedding',
];
