import { useState, useCallback, useRef, useEffect } from 'react'
import HashtagTier from './components/HashtagTier.jsx'
import StrategyPanel from './components/StrategyPanel.jsx'
import SelectedSet from './components/SelectedSet.jsx'
import RelatedPanel from './components/RelatedPanel.jsx'
import {
  generateHashtags,
  autoBuildSet,
  getRelatedHashtags,
  PLATFORMS,
  CONTENT_TYPES,
  QUICK_TOPICS,
} from './utils/hashtagEngine.js'

const TIER_CONFIG = [
  {
    key: 'high',
    label: 'High Volume',
    description: '1M+ posts — Broad reach, high competition',
    colors: {
      badge: 'bg-coral/10 border-coral/30 text-coral',
      tag: 'border-coral/20 hover:border-coral text-coral',
    },
  },
  {
    key: 'medium',
    label: 'Medium Volume',
    description: '100K-1M posts — Good balance of reach and discoverability',
    colors: {
      badge: 'bg-azure/10 border-azure/30 text-azure',
      tag: 'border-azure/20 hover:border-azure text-azure',
    },
  },
  {
    key: 'niche',
    label: 'Niche',
    description: '10K-100K posts — Low competition, highly targeted',
    colors: {
      badge: 'bg-turtle/10 border-turtle/30 text-turtle',
      tag: 'border-turtle/20 hover:border-turtle text-turtle',
    },
  },
  {
    key: 'micro',
    label: 'Micro',
    description: '<10K posts — Ultra-specific, best for small/new accounts',
    colors: {
      badge: 'bg-prince/10 border-prince/30 text-prince',
      tag: 'border-prince/20 hover:border-prince text-prince',
    },
  },
]

export default function App() {
  const [topicInput, setTopicInput] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [contentType, setContentType] = useState('general')
  const [selected, setSelected] = useState([])
  const [generated, setGenerated] = useState(null)
  const [relatedTag, setRelatedTag] = useState(null)
  const [showQuickTopics, setShowQuickTopics] = useState(false)
  const inputRef = useRef(null)
  const quickTopicsRef = useRef(null)

  const currentPlatform = PLATFORMS.find(p => p.id === platform)

  // Close quick topics dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        quickTopicsRef.current &&
        !quickTopicsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowQuickTopics(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fillTestData = useCallback(() => {
    setTopicInput('vegan meal prep for beginners')
    setPlatform('instagram')
    setContentType('educational')
  }, [])

  const handleGenerate = useCallback(() => {
    if (!topicInput.trim()) return
    const result = generateHashtags(topicInput, platform, contentType)
    setGenerated(result)
    setSelected([])
    setRelatedTag(null)
  }, [topicInput, platform, contentType])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleGenerate()
    }
  }, [handleGenerate])

  const toggleTag = useCallback((tag) => {
    setSelected(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag)
      }
      // Check platform max
      const max = currentPlatform?.maxHashtags || 30
      if (prev.length >= max) return prev
      return [...prev, tag]
    })
  }, [currentPlatform])

  const handleAutoBuild = useCallback(() => {
    if (!generated) return
    const autoSet = autoBuildSet(generated, platform)
    setSelected(autoSet)
  }, [generated, platform])

  const handleQuickTopic = useCallback((topic) => {
    setTopicInput(topic)
    setShowQuickTopics(false)
    // Auto-generate after selecting quick topic
    const result = generateHashtags(topic, platform, contentType)
    setGenerated(result)
    setSelected([])
    setRelatedTag(null)
  }, [platform, contentType])

  const handleTagHover = useCallback((tag) => {
    const related = getRelatedHashtags(tag)
    if (related.length > 0) {
      setRelatedTag({ tag, related })
    }
  }, [])

  const addRelatedTag = useCallback((tag) => {
    const formatted = tag.startsWith('#') ? tag : '#' + tag
    if (!selected.includes(formatted)) {
      const max = currentPlatform?.maxHashtags || 30
      if (selected.length < max) {
        setSelected(prev => [...prev, formatted])
      }
    }
  }, [selected, currentPlatform])

  // Count selected per tier
  const selectedCounts = { high: 0, medium: 0, niche: 0, micro: 0 }
  if (generated) {
    for (const tier of ['high', 'medium', 'niche', 'micro']) {
      const tierTags = (generated[tier] || []).map(t => t.tag)
      selectedCounts[tier] = selected.filter(s => tierTags.includes(s)).length
    }
  }

  return (
    <div className="bg-glow bg-grid min-h-screen">
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/social-media/" className="text-azure hover:text-white transition-colors">Social Media Tools</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Hashtag Generator</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center border border-turtle text-turtle rounded-full px-4 py-2 text-sm font-medium mb-4">
            Free Social Media Tool
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Hashtag Generator</h1>
          <p className="text-cloudy text-base sm:text-lg max-w-2xl mx-auto">
            Type any topic and get 30-50 hashtags organized by estimated reach, with an interactive set builder and platform-specific strategy.
          </p>
        </div>

        {/* Fill Test Data */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Fill Test Data
          </button>
        </div>

        {/* Controls */}
        <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6 flex flex-col gap-5 mb-6">
          {/* Topic input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-cloudy" htmlFor="topic-input">
              Topic or Niche
              <span className="text-galactic font-normal ml-2">Type anything (e.g., "vegan meal prep for beginners")</span>
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="topic-input"
                type="text"
                value={topicInput}
                onChange={e => setTopicInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => !topicInput && setShowQuickTopics(true)}
                placeholder="e.g., real estate investing tips, coffee shop marketing..."
                className="w-full bg-midnight border border-metal/30 rounded-lg px-4 py-3 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-azure transition-colors"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowQuickTopics(prev => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-galactic hover:text-cloudy transition-colors"
                aria-label="Show quick topic suggestions"
                title="Quick topic suggestions"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Quick topics dropdown */}
              {showQuickTopics && (
                <div
                  ref={quickTopicsRef}
                  className="absolute z-20 top-full mt-1 left-0 right-0 bg-oblivion border border-metal/30 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                >
                  <div className="px-3 py-2 text-xs text-galactic border-b border-metal/20 font-semibold uppercase tracking-wider">
                    Quick Topics
                  </div>
                  <div className="p-2 flex flex-wrap gap-1.5">
                    {QUICK_TOPICS.map(topic => (
                      <button
                        key={topic}
                        onClick={() => handleQuickTopic(topic)}
                        className="text-xs px-3 py-1.5 rounded-full border border-metal/30 text-cloudy hover:text-white hover:border-azure/50 hover:bg-azure/10 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Platform + Content Type row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Platform */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-cloudy">Platform</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`px-3 py-2 min-h-[44px] rounded-lg border text-sm transition-colors ${
                      platform === p.id
                        ? 'border-azure bg-azure/10 text-azure font-medium'
                        : 'border-metal/30 text-galactic hover:text-cloudy hover:border-metal/50'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-cloudy">Content Type</label>
              <div className="flex flex-wrap gap-2">
                {CONTENT_TYPES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setContentType(c.id)}
                    className={`px-3 py-2 min-h-[44px] rounded-lg border text-sm transition-colors ${
                      contentType === c.id
                        ? 'border-azure bg-azure/10 text-azure font-medium'
                        : 'border-metal/30 text-galactic hover:text-cloudy hover:border-metal/50'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topicInput.trim()}
            className="w-full py-3 rounded-lg bg-azure text-white font-semibold hover:bg-azure-hover transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Generate Hashtags
          </button>
        </div>

        {/* Results */}
        {generated && generated.total > 0 && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Strategy panel */}
            <StrategyPanel platform={currentPlatform} selectedCount={selected.length} />

            {/* Results summary + auto-build */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-sm text-cloudy">
                <span className="text-white font-semibold">{generated.total}</span> hashtags generated for{' '}
                <span className="text-white font-medium">"{topicInput}"</span>
              </div>
              <button
                onClick={handleAutoBuild}
                className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-lg bg-prince/10 border border-prince/30 text-prince text-sm font-medium hover:bg-prince/20 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
                Auto-Build Optimal Set for {currentPlatform.name}
              </button>
            </div>

            {/* Hashtag tiers */}
            <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6 flex flex-col gap-6">
              <p className="text-sm text-galactic">
                Click hashtags to add them to your set. Hover to see related tags. Mix tiers for the best reach-to-relevance ratio.
              </p>
              {TIER_CONFIG.map(tier => {
                const tags = generated[tier.key] || []
                if (tags.length === 0) return null
                return (
                  <HashtagTier
                    key={tier.key}
                    tier={tier.key}
                    label={tier.label}
                    description={tier.description}
                    tags={tags}
                    selected={selected}
                    selectedCount={selectedCounts[tier.key]}
                    onToggle={toggleTag}
                    onHover={handleTagHover}
                    colors={tier.colors}
                  />
                )
              })}
            </div>

            {/* Related hashtags panel */}
            {relatedTag && (
              <RelatedPanel
                sourceTag={relatedTag.tag}
                related={relatedTag.related}
                selected={selected}
                onAdd={addRelatedTag}
                onClose={() => setRelatedTag(null)}
              />
            )}

            {/* Selected set */}
            <SelectedSet
              selected={selected}
              platform={currentPlatform}
              onClear={() => setSelected([])}
              onRemove={(tag) => setSelected(prev => prev.filter(t => t !== tag))}
            />
          </div>
        )}

        {/* Empty state after generate with no results */}
        {generated && generated.total === 0 && (
          <div className="card-gradient border border-metal/20 rounded-2xl p-8 text-center animate-fadeIn">
            <p className="text-cloudy mb-2">No hashtags found for that topic.</p>
            <p className="text-sm text-galactic">Try different keywords or a broader topic description.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-metal/30 text-center text-sm text-galactic">
          Free marketing tools by{' '}
          <a href="https://www.dreamhost.com" target="_blank" rel="noopener" className="text-azure hover:text-white transition-colors">DreamHost</a>
        </footer>
      </div>
    </div>
  )
}
