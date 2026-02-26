export const PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    recommended: '5–10',
    tip: 'In 2025–2026, Instagram recommends 3–5 highly relevant hashtags. More isn\'t better — the algorithm now uses hashtags as search signals, not reach amplifiers. Niche tags often outperform broad ones.',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    recommended: '3–6',
    tip: 'TikTok hashtags drive discoverability through its search function. Mix 1–2 broad tags (for FYP exposure) with 2–4 niche tags. Avoid irrelevant trending tags — the algorithm penalizes mismatches.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    recommended: '3–5',
    tip: 'LinkedIn hashtags work best when they\'re professional and specific. Use 3–5 max — more hurts reach. Always include at least one industry-specific niche tag.',
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    recommended: '1–2',
    tip: 'On X, 1–2 hashtags perform best. More reduces engagement. Use hashtags that are actively trending or are established community tags — not created ones.',
  },
];

export const CONTENT_TYPES = [
  { id: 'general', name: 'General / Mixed' },
  { id: 'product', name: 'Product Launch / Promotion' },
  { id: 'tips', name: 'Tips & How-To' },
  { id: 'bts', name: 'Behind the Scenes' },
  { id: 'testimonial', name: 'Customer Story / Testimonial' },
  { id: 'event', name: 'Event / Announcement' },
];

export const TOPICS = [
  { id: 'business', name: 'Small Business' },
  { id: 'ecommerce', name: 'E-commerce / Online Store' },
  { id: 'food', name: 'Food & Restaurant' },
  { id: 'fitness', name: 'Health & Fitness' },
  { id: 'realestate', name: 'Real Estate' },
  { id: 'marketing', name: 'Marketing & Social Media' },
  { id: 'tech', name: 'Tech / SaaS' },
  { id: 'beauty', name: 'Beauty & Lifestyle' },
  { id: 'travel', name: 'Travel' },
  { id: 'nonprofit', name: 'Non-Profit / Community' },
  { id: 'webhosting', name: 'Web Hosting / Website' },
  { id: 'creative', name: 'Creative / Design' },
];

// Hashtag bank — organized by topic
const HASHTAG_BANK = {
  business: {
    broad: ['#smallbusiness', '#entrepreneur', '#business', '#startup', '#businessowner', '#success', '#hustle'],
    medium: ['#smallbiz', '#smb', '#businesstips', '#solopreneur', '#womeninbusiness', '#sidehustle', '#growthmindset'],
    niche: ['#smallbusinessowner', '#localbusiness', '#shoplocal', '#supportsmallbusiness', '#smallbusinesstips', '#buildingabusiness'],
  },
  ecommerce: {
    broad: ['#ecommerce', '#onlineshopping', '#shopping', '#shop', '#fashion', '#lifestyle'],
    medium: ['#ecommercebusiness', '#shopnow', '#onlinestore', '#etsy', '#shopify', '#dropshipping'],
    niche: ['#ecommercetips', '#productphotography', '#shopthelook', '#newproduct', '#productlaunch', '#shopsmall'],
  },
  food: {
    broad: ['#food', '#foodie', '#restaurant', '#foodphotography', '#delicious', '#instafood'],
    medium: ['#foodstagram', '#homecooking', '#mealprep', '#foodblogger', '#foodlover', '#cheflife'],
    niche: ['#localrestaurant', '#foodielife', '#restaurantmarketing', '#menuinspiration', '#eatlocal', '#foodbusiness'],
  },
  fitness: {
    broad: ['#fitness', '#workout', '#health', '#gym', '#motivation', '#fitlife'],
    medium: ['#fitnessmotivation', '#healthylifestyle', '#personaltrainer', '#weightloss', '#fitnesstips', '#gymlife'],
    niche: ['#fitnesscoach', '#onlinecoach', '#strengthtraining', '#functionalfitness', '#fitnesstransformation', '#wellnesscoach'],
  },
  realestate: {
    broad: ['#realestate', '#property', '#home', '#housing', '#realtor', '#mortgage'],
    medium: ['#realestateinvesting', '#homeselling', '#homebuying', '#realestatemarket', '#housingmarket', '#realtorlife'],
    niche: ['#realestateagent', '#listingagent', '#homebuyers', '#firsttimehomebuyer', '#realestatemarketing', '#luxuryhomes'],
  },
  marketing: {
    broad: ['#marketing', '#socialmedia', '#digitalmarketing', '#branding', '#business', '#contentmarketing'],
    medium: ['#marketingtips', '#socialmediamarketing', '#contentcreator', '#marketingstrategy', '#growthhacking', '#seo'],
    niche: ['#marketingcoach', '#socialmediatips', '#contentstrategy', '#emailmarketing', '#b2bmarketing', '#marketingagency'],
  },
  tech: {
    broad: ['#tech', '#technology', '#software', '#startup', '#innovation', '#ai'],
    medium: ['#saas', '#techstartup', '#productlaunch', '#coding', '#webdevelopment', '#techbusiness'],
    niche: ['#saasfounder', '#b2bsaas', '#productmanagement', '#techentrepreneur', '#indiemaker', '#devtools'],
  },
  beauty: {
    broad: ['#beauty', '#makeup', '#skincare', '#fashion', '#style', '#lifestyle'],
    medium: ['#beautytips', '#skincaretips', '#beautyproducts', '#grwm', '#motd', '#skincareadvice'],
    niche: ['#beautyentrepreneur', '#cleanskincare', '#beautybusiness', '#skincarecommunity', '#selfcare', '#naturalskincare'],
  },
  travel: {
    broad: ['#travel', '#vacation', '#adventure', '#wanderlust', '#explore', '#tourism'],
    medium: ['#travelgram', '#travelblogger', '#travelphoto', '#traveltips', '#digitalnomad', '#travellife'],
    niche: ['#travelbusiness', '#tourismmarketing', '#boutiquehospitality', '#experientialtravel', '#localtourism', '#travelbrand'],
  },
  nonprofit: {
    broad: ['#nonprofit', '#community', '#volunteer', '#charity', '#giveback', '#socialgood'],
    medium: ['#nonprofitmarketing', '#fundraising', '#communityimpact', '#socialenterprise', '#changemaker', '#nonprofitlife'],
    niche: ['#nonprofitleader', '#grantwriting', '#communityorganizer', '#501c3', '#philanthropymatters', '#nonprofitsocialmedia'],
  },
  webhosting: {
    broad: ['#website', '#webdesign', '#wordpress', '#business', '#online', '#smallbusiness'],
    medium: ['#webhosting', '#websitedesign', '#webhostingtips', '#wordpresstips', '#websitelaunch', '#digitalmarketing'],
    niche: ['#websiteowner', '#websitetips', '#dreamhost', '#wordpresshosting', '#websitesecurity', '#managedhosting'],
  },
  creative: {
    broad: ['#design', '#creative', '#art', '#graphicdesign', '#branding', '#logo'],
    medium: ['#designer', '#creativeagency', '#branddesign', '#visualdesign', '#brandstrategy', '#creativeentrepreneur'],
    niche: ['#brandingdesigner', '#logodesigner', '#creativecoach', '#designportfolio', '#brandidentity', '#freelancedesigner'],
  },
};

// Content type modifier adds extra content-specific tags
const CONTENT_TYPE_TAGS = {
  product: {
    broad: ['#newproduct', '#launch', '#shop'],
    medium: ['#productlaunch', '#shopnow', '#getitwhileitlasts'],
    niche: ['#newlaunch', '#launchday', '#productdrop'],
  },
  tips: {
    broad: ['#tips', '#howto', '#learn'],
    medium: ['#protips', '#quicktips', '#learnsomething'],
    niche: ['#tipsandtricks', '#expertadvice', '#didyouknow'],
  },
  bts: {
    broad: ['#behindthescenes', '#bts', '#process'],
    medium: ['#dayinmylife', '#makingof', '#worklife'],
    niche: ['#businesslife', '#creativeprocess', '#smallbizlife'],
  },
  testimonial: {
    broad: ['#testimonial', '#review', '#customers'],
    medium: ['#happycustomer', '#customerlove', '#clientresults'],
    niche: ['#clienttestimonial', '#customerstory', '#socialproof'],
  },
  event: {
    broad: ['#event', '#announcement', '#news'],
    medium: ['#businessevent', '#savethedate', '#comingsoon'],
    niche: ['#eventannouncement', '#bigannouncement', '#exciting'],
  },
  general: { broad: [], medium: [], niche: [] },
};

export function generateHashtags(topicId, platformId, contentTypeId) {
  const topicTags = HASHTAG_BANK[topicId] || HASHTAG_BANK.business;
  const contentTags = CONTENT_TYPE_TAGS[contentTypeId] || { broad: [], medium: [], niche: [] };

  return {
    broad: [...new Set([...topicTags.broad, ...contentTags.broad])],
    medium: [...new Set([...topicTags.medium, ...contentTags.medium])],
    niche: [...new Set([...topicTags.niche, ...contentTags.niche])],
  };
}
