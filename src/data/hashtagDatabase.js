/**
 * Comprehensive hashtag database for algorithmic generation.
 *
 * Structure:
 * - KEYWORD_HASHTAG_MAP: Maps keywords to relevant hashtags with estimated popularity tiers
 * - TRENDING_FORMATS: Platform-specific trending hashtag formats
 * - CO_OCCURRENCE: Hashtags commonly used together
 * - CATEGORY_HIERARCHY: Maps specific keywords to broader categories
 */

// Popularity tiers based on typical post volumes
// high: 1M+ posts, medium: 100K-1M, niche: 10K-100K, micro: <10K
export const TIER = { HIGH: 'high', MEDIUM: 'medium', NICHE: 'niche', MICRO: 'micro' };

/**
 * Master keyword-to-hashtag mapping. Each keyword maps to an array of
 * { tag, tier } objects. This is the core generation database.
 */
export const KEYWORD_HASHTAG_MAP = {
  // --- FOOD & COOKING ---
  food: [
    { tag: 'food', tier: 'high' }, { tag: 'foodie', tier: 'high' }, { tag: 'instafood', tier: 'high' },
    { tag: 'foodporn', tier: 'high' }, { tag: 'yummy', tier: 'high' }, { tag: 'delicious', tier: 'high' },
    { tag: 'foodphotography', tier: 'medium' }, { tag: 'foodstagram', tier: 'medium' },
    { tag: 'foodlover', tier: 'medium' }, { tag: 'foodblogger', tier: 'medium' },
    { tag: 'homemade', tier: 'medium' }, { tag: 'foodiesofinstagram', tier: 'niche' },
    { tag: 'fooddiary', tier: 'niche' }, { tag: 'foodgasm', tier: 'niche' },
  ],
  vegan: [
    { tag: 'vegan', tier: 'high' }, { tag: 'plantbased', tier: 'high' },
    { tag: 'veganfood', tier: 'medium' }, { tag: 'vegansofinstagram', tier: 'medium' },
    { tag: 'veganrecipes', tier: 'medium' }, { tag: 'veganlife', tier: 'medium' },
    { tag: 'crueltyfree', tier: 'medium' }, { tag: 'veganmealprep', tier: 'niche' },
    { tag: 'veganfoodshare', tier: 'niche' }, { tag: 'whatveganseat', tier: 'niche' },
    { tag: 'vegancommunity', tier: 'micro' }, { tag: 'veganforbeginners', tier: 'micro' },
  ],
  meal: [
    { tag: 'mealprep', tier: 'high' }, { tag: 'mealprepping', tier: 'medium' },
    { tag: 'mealprepideas', tier: 'medium' }, { tag: 'mealplan', tier: 'medium' },
    { tag: 'mealprepmonday', tier: 'niche' }, { tag: 'mealprepdaily', tier: 'niche' },
    { tag: 'mealprepsunday', tier: 'niche' }, { tag: 'mealpreplife', tier: 'micro' },
  ],
  prep: [
    { tag: 'mealprep', tier: 'high' }, { tag: 'foodprep', tier: 'medium' },
    { tag: 'prepday', tier: 'niche' }, { tag: 'sundayprep', tier: 'niche' },
  ],
  recipe: [
    { tag: 'recipe', tier: 'high' }, { tag: 'recipes', tier: 'high' },
    { tag: 'easyrecipe', tier: 'medium' }, { tag: 'recipeideas', tier: 'medium' },
    { tag: 'recipeoftheday', tier: 'medium' }, { tag: 'healthyrecipes', tier: 'medium' },
    { tag: 'recipeshare', tier: 'niche' }, { tag: 'homecooking', tier: 'medium' },
    { tag: 'cookingathome', tier: 'niche' }, { tag: 'recipedevelopment', tier: 'micro' },
  ],
  cooking: [
    { tag: 'cooking', tier: 'high' }, { tag: 'homecooking', tier: 'medium' },
    { tag: 'cookingathome', tier: 'niche' }, { tag: 'cookingtips', tier: 'niche' },
    { tag: 'cookingclass', tier: 'niche' }, { tag: 'cookingwithkids', tier: 'micro' },
  ],
  restaurant: [
    { tag: 'restaurant', tier: 'high' }, { tag: 'restaurants', tier: 'medium' },
    { tag: 'restaurantlife', tier: 'medium' }, { tag: 'localrestaurant', tier: 'niche' },
    { tag: 'restaurantmarketing', tier: 'niche' }, { tag: 'restaurantowner', tier: 'micro' },
  ],
  healthy: [
    { tag: 'healthy', tier: 'high' }, { tag: 'healthyfood', tier: 'high' },
    { tag: 'healthyeating', tier: 'high' }, { tag: 'healthylifestyle', tier: 'high' },
    { tag: 'healthyrecipes', tier: 'medium' }, { tag: 'healthyliving', tier: 'medium' },
    { tag: 'healthymeals', tier: 'medium' }, { tag: 'cleaneating', tier: 'medium' },
    { tag: 'healthychoices', tier: 'niche' }, { tag: 'healthyhabits', tier: 'niche' },
  ],
  nutrition: [
    { tag: 'nutrition', tier: 'high' }, { tag: 'nutritious', tier: 'medium' },
    { tag: 'nutritiontips', tier: 'medium' }, { tag: 'nutritioncoach', tier: 'niche' },
    { tag: 'nutritionist', tier: 'niche' }, { tag: 'macros', tier: 'niche' },
    { tag: 'nutritionalscience', tier: 'micro' },
  ],
  baking: [
    { tag: 'baking', tier: 'high' }, { tag: 'bakingfromscratch', tier: 'medium' },
    { tag: 'homebaking', tier: 'medium' }, { tag: 'bakingtips', tier: 'niche' },
    { tag: 'bakingofinstagram', tier: 'niche' }, { tag: 'bakersofinstagram', tier: 'niche' },
  ],
  coffee: [
    { tag: 'coffee', tier: 'high' }, { tag: 'coffeelover', tier: 'high' },
    { tag: 'coffeetime', tier: 'medium' }, { tag: 'coffeeaddict', tier: 'medium' },
    { tag: 'coffeeshop', tier: 'medium' }, { tag: 'coffeeart', tier: 'niche' },
    { tag: 'specialtycoffee', tier: 'niche' }, { tag: 'coffeeoftheday', tier: 'niche' },
  ],

  // --- FITNESS & HEALTH ---
  fitness: [
    { tag: 'fitness', tier: 'high' }, { tag: 'fit', tier: 'high' },
    { tag: 'fitnessmotivation', tier: 'high' }, { tag: 'fitlife', tier: 'medium' },
    { tag: 'fitfam', tier: 'medium' }, { tag: 'fitnessjourney', tier: 'medium' },
    { tag: 'fitnesstips', tier: 'medium' }, { tag: 'fitnessgoals', tier: 'niche' },
    { tag: 'fitnesscoach', tier: 'niche' }, { tag: 'fitnesscommunity', tier: 'niche' },
  ],
  workout: [
    { tag: 'workout', tier: 'high' }, { tag: 'workoutmotivation', tier: 'medium' },
    { tag: 'workoutroutine', tier: 'medium' }, { tag: 'workoutvideos', tier: 'niche' },
    { tag: 'workouttips', tier: 'niche' }, { tag: 'workoutathome', tier: 'niche' },
    { tag: 'workoutplan', tier: 'micro' },
  ],
  gym: [
    { tag: 'gym', tier: 'high' }, { tag: 'gymlife', tier: 'high' },
    { tag: 'gymmotivation', tier: 'medium' }, { tag: 'gymrat', tier: 'medium' },
    { tag: 'gymtime', tier: 'medium' }, { tag: 'gymworkout', tier: 'niche' },
  ],
  yoga: [
    { tag: 'yoga', tier: 'high' }, { tag: 'yogapractice', tier: 'medium' },
    { tag: 'yogainspiration', tier: 'medium' }, { tag: 'yogalife', tier: 'medium' },
    { tag: 'yogaeveryday', tier: 'niche' }, { tag: 'yogateacher', tier: 'niche' },
    { tag: 'yogaforbeginners', tier: 'niche' }, { tag: 'yogaflow', tier: 'niche' },
    { tag: 'homeyoga', tier: 'micro' },
  ],
  weight: [
    { tag: 'weightloss', tier: 'high' }, { tag: 'weightlossjourney', tier: 'medium' },
    { tag: 'weighttraining', tier: 'medium' }, { tag: 'weightlifting', tier: 'medium' },
    { tag: 'weightlosstips', tier: 'niche' }, { tag: 'weightlosstransformation', tier: 'niche' },
  ],
  training: [
    { tag: 'training', tier: 'high' }, { tag: 'personaltrainer', tier: 'medium' },
    { tag: 'strengthtraining', tier: 'medium' }, { tag: 'personaltraining', tier: 'niche' },
    { tag: 'trainingtips', tier: 'niche' }, { tag: 'functionaltraining', tier: 'niche' },
  ],
  wellness: [
    { tag: 'wellness', tier: 'high' }, { tag: 'wellnessjourney', tier: 'medium' },
    { tag: 'wellnesscoach', tier: 'niche' }, { tag: 'holisticwellness', tier: 'niche' },
    { tag: 'wellnesscommunity', tier: 'micro' },
  ],
  mental: [
    { tag: 'mentalhealth', tier: 'high' }, { tag: 'mentalhealthawareness', tier: 'medium' },
    { tag: 'mentalhealthmatters', tier: 'medium' }, { tag: 'mentalwellness', tier: 'niche' },
    { tag: 'mentalfitness', tier: 'micro' },
  ],
  selfcare: [
    { tag: 'selfcare', tier: 'high' }, { tag: 'selflove', tier: 'high' },
    { tag: 'selfcaretips', tier: 'medium' }, { tag: 'selfcareday', tier: 'niche' },
    { tag: 'selfcareroutine', tier: 'niche' },
  ],
  running: [
    { tag: 'running', tier: 'high' }, { tag: 'runnersofinstagram', tier: 'medium' },
    { tag: 'runningcommunity', tier: 'niche' }, { tag: 'trailrunning', tier: 'niche' },
    { tag: 'marathontraining', tier: 'niche' }, { tag: 'runningmotivation', tier: 'niche' },
  ],

  // --- BUSINESS & ENTREPRENEURSHIP ---
  business: [
    { tag: 'business', tier: 'high' }, { tag: 'entrepreneur', tier: 'high' },
    { tag: 'smallbusiness', tier: 'high' }, { tag: 'businessowner', tier: 'medium' },
    { tag: 'businesstips', tier: 'medium' }, { tag: 'onlinebusiness', tier: 'medium' },
    { tag: 'businessgrowth', tier: 'niche' }, { tag: 'businessstrategy', tier: 'niche' },
    { tag: 'businesscoach', tier: 'niche' }, { tag: 'businessmindset', tier: 'micro' },
  ],
  startup: [
    { tag: 'startup', tier: 'high' }, { tag: 'startuplife', tier: 'medium' },
    { tag: 'startups', tier: 'medium' }, { tag: 'startupfounder', tier: 'niche' },
    { tag: 'startuptips', tier: 'niche' }, { tag: 'startupworld', tier: 'micro' },
    { tag: 'startupgrind', tier: 'micro' },
  ],
  entrepreneur: [
    { tag: 'entrepreneur', tier: 'high' }, { tag: 'entrepreneurship', tier: 'high' },
    { tag: 'entrepreneurlife', tier: 'medium' }, { tag: 'entrepreneurmindset', tier: 'medium' },
    { tag: 'solopreneur', tier: 'niche' }, { tag: 'womenentrepreneurs', tier: 'niche' },
    { tag: 'entrepreneurtips', tier: 'micro' },
  ],
  small: [
    { tag: 'smallbusiness', tier: 'high' }, { tag: 'smallbiz', tier: 'medium' },
    { tag: 'smallbusinessowner', tier: 'medium' }, { tag: 'smallbusinesstips', tier: 'niche' },
    { tag: 'shopsmall', tier: 'niche' }, { tag: 'supportsmallbusiness', tier: 'niche' },
  ],
  money: [
    { tag: 'money', tier: 'high' }, { tag: 'moneytips', tier: 'medium' },
    { tag: 'moneymanagement', tier: 'medium' }, { tag: 'makemoney', tier: 'medium' },
    { tag: 'financialfreedom', tier: 'medium' }, { tag: 'moneymindset', tier: 'niche' },
  ],
  investing: [
    { tag: 'investing', tier: 'high' }, { tag: 'investment', tier: 'high' },
    { tag: 'investingtips', tier: 'medium' }, { tag: 'realestateinvesting', tier: 'medium' },
    { tag: 'passiveincome', tier: 'medium' }, { tag: 'stockmarket', tier: 'medium' },
    { tag: 'investingforbeginners', tier: 'niche' }, { tag: 'wealthbuilding', tier: 'niche' },
  ],
  finance: [
    { tag: 'finance', tier: 'high' }, { tag: 'personalfinance', tier: 'medium' },
    { tag: 'financetips', tier: 'medium' }, { tag: 'financialliteracy', tier: 'niche' },
    { tag: 'financeplanning', tier: 'niche' }, { tag: 'financecoach', tier: 'micro' },
  ],
  freelance: [
    { tag: 'freelance', tier: 'medium' }, { tag: 'freelancer', tier: 'medium' },
    { tag: 'freelancelife', tier: 'niche' }, { tag: 'freelancetips', tier: 'niche' },
    { tag: 'freelancedesigner', tier: 'micro' }, { tag: 'freelancework', tier: 'micro' },
  ],
  productivity: [
    { tag: 'productivity', tier: 'high' }, { tag: 'productivitytips', tier: 'medium' },
    { tag: 'productivityhacks', tier: 'niche' }, { tag: 'timemanagement', tier: 'medium' },
    { tag: 'getthingsdone', tier: 'niche' }, { tag: 'worksmarter', tier: 'micro' },
  ],
  leadership: [
    { tag: 'leadership', tier: 'high' }, { tag: 'leadershiptips', tier: 'medium' },
    { tag: 'leadershipdevelopment', tier: 'niche' }, { tag: 'thoughtleadership', tier: 'niche' },
    { tag: 'womenleaders', tier: 'micro' },
  ],

  // --- MARKETING & SOCIAL MEDIA ---
  marketing: [
    { tag: 'marketing', tier: 'high' }, { tag: 'digitalmarketing', tier: 'high' },
    { tag: 'marketingtips', tier: 'medium' }, { tag: 'marketingstrategy', tier: 'medium' },
    { tag: 'contentmarketing', tier: 'medium' }, { tag: 'socialmediamarketing', tier: 'medium' },
    { tag: 'marketingdigital', tier: 'niche' }, { tag: 'marketingcoach', tier: 'niche' },
    { tag: 'marketingagency', tier: 'niche' }, { tag: 'growthmarketing', tier: 'micro' },
  ],
  social: [
    { tag: 'socialmedia', tier: 'high' }, { tag: 'socialmediamarketing', tier: 'medium' },
    { tag: 'socialmediatips', tier: 'medium' }, { tag: 'socialmediastrategy', tier: 'niche' },
    { tag: 'socialmediamanager', tier: 'niche' }, { tag: 'socialmediaexpert', tier: 'micro' },
  ],
  media: [
    { tag: 'socialmedia', tier: 'high' }, { tag: 'mediamarketing', tier: 'niche' },
    { tag: 'contentcreator', tier: 'medium' },
  ],
  content: [
    { tag: 'content', tier: 'medium' }, { tag: 'contentcreator', tier: 'high' },
    { tag: 'contentmarketing', tier: 'medium' }, { tag: 'contentcreation', tier: 'medium' },
    { tag: 'contentstrategy', tier: 'niche' }, { tag: 'contenttips', tier: 'niche' },
    { tag: 'contentcalendar', tier: 'micro' },
  ],
  brand: [
    { tag: 'branding', tier: 'high' }, { tag: 'brand', tier: 'medium' },
    { tag: 'brandstrategy', tier: 'niche' }, { tag: 'brandidentity', tier: 'niche' },
    { tag: 'branddesign', tier: 'niche' }, { tag: 'personalbrand', tier: 'niche' },
    { tag: 'brandbuilding', tier: 'micro' }, { tag: 'brandawareness', tier: 'micro' },
  ],
  seo: [
    { tag: 'seo', tier: 'high' }, { tag: 'seotips', tier: 'medium' },
    { tag: 'searchengineoptimization', tier: 'niche' }, { tag: 'seoexpert', tier: 'niche' },
    { tag: 'seostrategy', tier: 'niche' }, { tag: 'localSEO', tier: 'micro' },
  ],
  email: [
    { tag: 'emailmarketing', tier: 'medium' }, { tag: 'emailtips', tier: 'niche' },
    { tag: 'emaillist', tier: 'niche' }, { tag: 'emailcampaign', tier: 'micro' },
    { tag: 'newslettertips', tier: 'micro' },
  ],
  advertising: [
    { tag: 'advertising', tier: 'high' }, { tag: 'ads', tier: 'medium' },
    { tag: 'facebookads', tier: 'medium' }, { tag: 'googleads', tier: 'medium' },
    { tag: 'paidmedia', tier: 'niche' }, { tag: 'adstrategy', tier: 'micro' },
  ],
  influencer: [
    { tag: 'influencer', tier: 'high' }, { tag: 'influencermarketing', tier: 'medium' },
    { tag: 'microinfluencer', tier: 'niche' }, { tag: 'influencertips', tier: 'niche' },
    { tag: 'brandcollaboration', tier: 'niche' },
  ],

  // --- TECHNOLOGY ---
  tech: [
    { tag: 'tech', tier: 'high' }, { tag: 'technology', tier: 'high' },
    { tag: 'techlife', tier: 'medium' }, { tag: 'technews', tier: 'medium' },
    { tag: 'techtips', tier: 'medium' }, { tag: 'techcommunity', tier: 'niche' },
    { tag: 'techstartup', tier: 'niche' },
  ],
  ai: [
    { tag: 'ai', tier: 'high' }, { tag: 'artificialintelligence', tier: 'high' },
    { tag: 'machinelearning', tier: 'medium' }, { tag: 'aitools', tier: 'medium' },
    { tag: 'generativeai', tier: 'medium' }, { tag: 'chatgpt', tier: 'medium' },
    { tag: 'aitechnology', tier: 'niche' }, { tag: 'aiforbusiness', tier: 'niche' },
    { tag: 'aiautomation', tier: 'micro' },
  ],
  software: [
    { tag: 'software', tier: 'high' }, { tag: 'saas', tier: 'medium' },
    { tag: 'softwaredevelopment', tier: 'medium' }, { tag: 'softwareengineer', tier: 'medium' },
    { tag: 'saasfounder', tier: 'niche' }, { tag: 'b2bsaas', tier: 'micro' },
  ],
  coding: [
    { tag: 'coding', tier: 'high' }, { tag: 'programming', tier: 'high' },
    { tag: 'developer', tier: 'medium' }, { tag: 'webdevelopment', tier: 'medium' },
    { tag: 'codinglife', tier: 'niche' }, { tag: 'learntocode', tier: 'niche' },
    { tag: 'codingtips', tier: 'niche' }, { tag: 'fullstackdeveloper', tier: 'micro' },
  ],
  web: [
    { tag: 'webdesign', tier: 'high' }, { tag: 'website', tier: 'high' },
    { tag: 'webdevelopment', tier: 'medium' }, { tag: 'webdev', tier: 'medium' },
    { tag: 'webdesigner', tier: 'niche' }, { tag: 'websitedesign', tier: 'niche' },
    { tag: 'webhostingtips', tier: 'micro' },
  ],
  app: [
    { tag: 'app', tier: 'high' }, { tag: 'appdesign', tier: 'medium' },
    { tag: 'appdevelopment', tier: 'medium' }, { tag: 'mobileapp', tier: 'niche' },
    { tag: 'appdev', tier: 'niche' },
  ],
  data: [
    { tag: 'data', tier: 'high' }, { tag: 'datascience', tier: 'medium' },
    { tag: 'dataanalytics', tier: 'medium' }, { tag: 'bigdata', tier: 'medium' },
    { tag: 'datadriven', tier: 'niche' }, { tag: 'datavisualization', tier: 'niche' },
  ],
  hosting: [
    { tag: 'webhosting', tier: 'medium' }, { tag: 'hosting', tier: 'medium' },
    { tag: 'cloudhosting', tier: 'niche' }, { tag: 'webhostingtips', tier: 'micro' },
    { tag: 'managedhosting', tier: 'micro' }, { tag: 'wordpresshosting', tier: 'micro' },
  ],
  wordpress: [
    { tag: 'wordpress', tier: 'high' }, { tag: 'wordpresstips', tier: 'medium' },
    { tag: 'wordpressdesign', tier: 'niche' }, { tag: 'wordpressplugins', tier: 'niche' },
    { tag: 'wordpressdeveloper', tier: 'micro' },
  ],
  cyber: [
    { tag: 'cybersecurity', tier: 'medium' }, { tag: 'infosec', tier: 'medium' },
    { tag: 'hacking', tier: 'medium' }, { tag: 'cybersecuritytips', tier: 'niche' },
    { tag: 'datasecurity', tier: 'niche' },
  ],

  // --- REAL ESTATE ---
  real: [
    { tag: 'realestate', tier: 'high' }, { tag: 'realtor', tier: 'high' },
    { tag: 'realestateagent', tier: 'medium' }, { tag: 'realestateinvesting', tier: 'medium' },
    { tag: 'realestatemarket', tier: 'niche' }, { tag: 'realestatemarketing', tier: 'niche' },
  ],
  estate: [
    { tag: 'realestate', tier: 'high' }, { tag: 'realestateagent', tier: 'medium' },
    { tag: 'realestateinvesting', tier: 'medium' }, { tag: 'estateplanning', tier: 'niche' },
  ],
  property: [
    { tag: 'property', tier: 'high' }, { tag: 'propertyinvestment', tier: 'medium' },
    { tag: 'propertymarket', tier: 'niche' }, { tag: 'propertymanagement', tier: 'niche' },
    { tag: 'propertydevelopment', tier: 'micro' },
  ],
  home: [
    { tag: 'home', tier: 'high' }, { tag: 'homedesign', tier: 'high' },
    { tag: 'homedecor', tier: 'high' }, { tag: 'homesweethome', tier: 'medium' },
    { tag: 'homebuying', tier: 'medium' }, { tag: 'homeimprovement', tier: 'medium' },
    { tag: 'homebuyers', tier: 'niche' }, { tag: 'firsttimehomebuyer', tier: 'niche' },
    { tag: 'homeselling', tier: 'niche' }, { tag: 'homestaging', tier: 'micro' },
  ],
  house: [
    { tag: 'house', tier: 'high' }, { tag: 'househunting', tier: 'medium' },
    { tag: 'housedesign', tier: 'medium' }, { tag: 'dreamhome', tier: 'medium' },
    { tag: 'houseflipping', tier: 'niche' }, { tag: 'housetour', tier: 'niche' },
  ],
  mortgage: [
    { tag: 'mortgage', tier: 'medium' }, { tag: 'mortgagetips', tier: 'niche' },
    { tag: 'mortgagerates', tier: 'niche' }, { tag: 'mortgagebroker', tier: 'micro' },
    { tag: 'firsttimebuyer', tier: 'niche' },
  ],
  luxury: [
    { tag: 'luxury', tier: 'high' }, { tag: 'luxurylifestyle', tier: 'medium' },
    { tag: 'luxuryhomes', tier: 'medium' }, { tag: 'luxuryrealestate', tier: 'niche' },
    { tag: 'luxuryliving', tier: 'niche' }, { tag: 'luxuryinterior', tier: 'micro' },
  ],

  // --- BEAUTY & FASHION ---
  beauty: [
    { tag: 'beauty', tier: 'high' }, { tag: 'beautytips', tier: 'medium' },
    { tag: 'beautyblogger', tier: 'medium' }, { tag: 'beautyproducts', tier: 'medium' },
    { tag: 'beautycommunity', tier: 'niche' }, { tag: 'beautyentrepreneur', tier: 'niche' },
    { tag: 'beautyinspo', tier: 'niche' },
  ],
  skincare: [
    { tag: 'skincare', tier: 'high' }, { tag: 'skincareroutine', tier: 'high' },
    { tag: 'skincaretips', tier: 'medium' }, { tag: 'skincareproducts', tier: 'medium' },
    { tag: 'skincarecommunity', tier: 'niche' }, { tag: 'cleanskincare', tier: 'niche' },
    { tag: 'naturalskincare', tier: 'niche' }, { tag: 'skincarejunkie', tier: 'micro' },
  ],
  makeup: [
    { tag: 'makeup', tier: 'high' }, { tag: 'makeupartist', tier: 'high' },
    { tag: 'makeuptutorial', tier: 'medium' }, { tag: 'makeupaddict', tier: 'medium' },
    { tag: 'makeuplover', tier: 'medium' }, { tag: 'makeuplooks', tier: 'niche' },
    { tag: 'makeupoftheday', tier: 'niche' },
  ],
  fashion: [
    { tag: 'fashion', tier: 'high' }, { tag: 'style', tier: 'high' },
    { tag: 'fashionblogger', tier: 'medium' }, { tag: 'fashionstyle', tier: 'medium' },
    { tag: 'ootd', tier: 'high' }, { tag: 'fashioninspo', tier: 'medium' },
    { tag: 'streetstyle', tier: 'medium' }, { tag: 'sustainablefashion', tier: 'niche' },
    { tag: 'fashiontrends', tier: 'niche' },
  ],
  hair: [
    { tag: 'hair', tier: 'high' }, { tag: 'hairstyle', tier: 'high' },
    { tag: 'haircare', tier: 'medium' }, { tag: 'haircolor', tier: 'medium' },
    { tag: 'hairtips', tier: 'niche' }, { tag: 'hairinspo', tier: 'niche' },
    { tag: 'naturalhair', tier: 'medium' },
  ],

  // --- TRAVEL ---
  travel: [
    { tag: 'travel', tier: 'high' }, { tag: 'traveling', tier: 'high' },
    { tag: 'travelgram', tier: 'high' }, { tag: 'wanderlust', tier: 'high' },
    { tag: 'travelphotography', tier: 'medium' }, { tag: 'travelblogger', tier: 'medium' },
    { tag: 'traveltheworld', tier: 'medium' }, { tag: 'traveltips', tier: 'medium' },
    { tag: 'travellife', tier: 'niche' }, { tag: 'travelbug', tier: 'niche' },
    { tag: 'traveladdict', tier: 'niche' },
  ],
  adventure: [
    { tag: 'adventure', tier: 'high' }, { tag: 'adventuretravel', tier: 'medium' },
    { tag: 'adventuretime', tier: 'medium' }, { tag: 'outdooradventure', tier: 'niche' },
    { tag: 'adventureawaits', tier: 'niche' },
  ],
  vacation: [
    { tag: 'vacation', tier: 'high' }, { tag: 'vacationmode', tier: 'medium' },
    { tag: 'vacationtime', tier: 'medium' }, { tag: 'familyvacation', tier: 'niche' },
    { tag: 'vacationvibes', tier: 'niche' },
  ],
  hotel: [
    { tag: 'hotel', tier: 'high' }, { tag: 'hotels', tier: 'medium' },
    { tag: 'luxuryhotel', tier: 'medium' }, { tag: 'boutiquehotel', tier: 'niche' },
    { tag: 'hotellife', tier: 'niche' }, { tag: 'hoteldesign', tier: 'micro' },
  ],
  beach: [
    { tag: 'beach', tier: 'high' }, { tag: 'beachlife', tier: 'medium' },
    { tag: 'beachvibes', tier: 'medium' }, { tag: 'beachday', tier: 'niche' },
    { tag: 'beachvacation', tier: 'niche' },
  ],
  outdoor: [
    { tag: 'outdoor', tier: 'medium' }, { tag: 'outdoors', tier: 'medium' },
    { tag: 'outdoorlife', tier: 'niche' }, { tag: 'outdooradventure', tier: 'niche' },
    { tag: 'getoutside', tier: 'niche' }, { tag: 'exploremore', tier: 'niche' },
  ],
  hiking: [
    { tag: 'hiking', tier: 'high' }, { tag: 'hike', tier: 'medium' },
    { tag: 'hikingadventures', tier: 'niche' }, { tag: 'hikerlife', tier: 'micro' },
    { tag: 'trailhiking', tier: 'micro' },
  ],
  nomad: [
    { tag: 'digitalnomad', tier: 'medium' }, { tag: 'nomadlife', tier: 'niche' },
    { tag: 'digitalnomadlife', tier: 'niche' }, { tag: 'remotework', tier: 'medium' },
    { tag: 'workfromanywhere', tier: 'niche' }, { tag: 'locationindependent', tier: 'micro' },
  ],

  // --- DESIGN & CREATIVE ---
  design: [
    { tag: 'design', tier: 'high' }, { tag: 'graphicdesign', tier: 'high' },
    { tag: 'designer', tier: 'medium' }, { tag: 'designinspiration', tier: 'medium' },
    { tag: 'designtips', tier: 'niche' }, { tag: 'uidesign', tier: 'niche' },
    { tag: 'uxdesign', tier: 'niche' }, { tag: 'designcommunity', tier: 'micro' },
  ],
  creative: [
    { tag: 'creative', tier: 'high' }, { tag: 'creativity', tier: 'medium' },
    { tag: 'creativedesign', tier: 'medium' }, { tag: 'creativeentrepreneur', tier: 'niche' },
    { tag: 'creativeprocess', tier: 'niche' }, { tag: 'creativecommunity', tier: 'micro' },
  ],
  art: [
    { tag: 'art', tier: 'high' }, { tag: 'artist', tier: 'high' },
    { tag: 'artwork', tier: 'medium' }, { tag: 'artoftheday', tier: 'medium' },
    { tag: 'digitalart', tier: 'medium' }, { tag: 'artcommunity', tier: 'niche' },
    { tag: 'artistsoninstagram', tier: 'niche' },
  ],
  photography: [
    { tag: 'photography', tier: 'high' }, { tag: 'photographer', tier: 'high' },
    { tag: 'photooftheday', tier: 'high' }, { tag: 'photographytips', tier: 'medium' },
    { tag: 'photographylovers', tier: 'medium' }, { tag: 'portraitphotography', tier: 'niche' },
    { tag: 'landscapephotography', tier: 'niche' },
  ],
  photo: [
    { tag: 'photooftheday', tier: 'high' }, { tag: 'photography', tier: 'high' },
    { tag: 'photoshoot', tier: 'medium' }, { tag: 'photoedit', tier: 'niche' },
    { tag: 'photoart', tier: 'niche' },
  ],
  video: [
    { tag: 'video', tier: 'high' }, { tag: 'videography', tier: 'medium' },
    { tag: 'videoproduction', tier: 'niche' }, { tag: 'videoediting', tier: 'niche' },
    { tag: 'videocreator', tier: 'niche' }, { tag: 'contentvideo', tier: 'micro' },
  ],
  logo: [
    { tag: 'logo', tier: 'medium' }, { tag: 'logodesign', tier: 'medium' },
    { tag: 'logodesigner', tier: 'niche' }, { tag: 'logoinspiration', tier: 'niche' },
    { tag: 'brandidentity', tier: 'niche' },
  ],
  interior: [
    { tag: 'interiordesign', tier: 'high' }, { tag: 'interior', tier: 'medium' },
    { tag: 'interiordesigner', tier: 'medium' }, { tag: 'interiorstyle', tier: 'niche' },
    { tag: 'interiorinspo', tier: 'niche' }, { tag: 'homeinterior', tier: 'niche' },
  ],

  // --- ECOMMERCE & SHOPPING ---
  ecommerce: [
    { tag: 'ecommerce', tier: 'high' }, { tag: 'onlineshopping', tier: 'high' },
    { tag: 'ecommercebusiness', tier: 'medium' }, { tag: 'shopify', tier: 'medium' },
    { tag: 'ecommercetips', tier: 'niche' }, { tag: 'onlinestore', tier: 'niche' },
    { tag: 'ecommercemarketing', tier: 'micro' },
  ],
  shop: [
    { tag: 'shopping', tier: 'high' }, { tag: 'shopnow', tier: 'medium' },
    { tag: 'shoplocal', tier: 'medium' }, { tag: 'shopsmall', tier: 'medium' },
    { tag: 'shopifyseller', tier: 'niche' }, { tag: 'shoppingonline', tier: 'niche' },
  ],
  product: [
    { tag: 'product', tier: 'medium' }, { tag: 'productlaunch', tier: 'medium' },
    { tag: 'productphotography', tier: 'medium' }, { tag: 'productdesign', tier: 'niche' },
    { tag: 'productreview', tier: 'niche' }, { tag: 'newproduct', tier: 'niche' },
  ],
  sell: [
    { tag: 'sellingonline', tier: 'niche' }, { tag: 'etsyseller', tier: 'niche' },
    { tag: 'amazonseller', tier: 'niche' }, { tag: 'handmade', tier: 'medium' },
    { tag: 'sellonline', tier: 'micro' },
  ],
  store: [
    { tag: 'onlinestore', tier: 'niche' }, { tag: 'storedesign', tier: 'micro' },
    { tag: 'retaildesign', tier: 'micro' }, { tag: 'shoplocal', tier: 'medium' },
  ],
  dropshipping: [
    { tag: 'dropshipping', tier: 'medium' }, { tag: 'dropship', tier: 'niche' },
    { tag: 'dropshippingtips', tier: 'niche' }, { tag: 'dropshippingbusiness', tier: 'micro' },
  ],

  // --- EDUCATION & LEARNING ---
  education: [
    { tag: 'education', tier: 'high' }, { tag: 'learning', tier: 'high' },
    { tag: 'onlinelearning', tier: 'medium' }, { tag: 'educationtips', tier: 'niche' },
    { tag: 'elearning', tier: 'niche' }, { tag: 'teachersofinstagram', tier: 'niche' },
  ],
  learn: [
    { tag: 'learning', tier: 'high' }, { tag: 'learnwithme', tier: 'medium' },
    { tag: 'learnsomething', tier: 'niche' }, { tag: 'neversstoplearning', tier: 'niche' },
    { tag: 'onlinecourse', tier: 'niche' },
  ],
  tips: [
    { tag: 'tips', tier: 'medium' }, { tag: 'tipsandtricks', tier: 'medium' },
    { tag: 'protips', tier: 'niche' }, { tag: 'lifehacks', tier: 'medium' },
    { tag: 'helpfultips', tier: 'niche' },
  ],
  course: [
    { tag: 'onlinecourse', tier: 'medium' }, { tag: 'courselaunch', tier: 'niche' },
    { tag: 'onlinecourses', tier: 'niche' }, { tag: 'coursecreator', tier: 'micro' },
    { tag: 'digitalcourse', tier: 'micro' },
  ],
  coaching: [
    { tag: 'coaching', tier: 'medium' }, { tag: 'lifecoach', tier: 'medium' },
    { tag: 'businesscoach', tier: 'niche' }, { tag: 'coachingbusiness', tier: 'niche' },
    { tag: 'coachingtips', tier: 'micro' },
  ],

  // --- NONPROFIT & COMMUNITY ---
  nonprofit: [
    { tag: 'nonprofit', tier: 'medium' }, { tag: 'charity', tier: 'medium' },
    { tag: 'volunteer', tier: 'medium' }, { tag: 'giveback', tier: 'medium' },
    { tag: 'socialgood', tier: 'niche' }, { tag: 'nonprofitmarketing', tier: 'niche' },
    { tag: 'communityimpact', tier: 'niche' }, { tag: 'changemaker', tier: 'micro' },
  ],
  community: [
    { tag: 'community', tier: 'high' }, { tag: 'communitybuilding', tier: 'niche' },
    { tag: 'communitylove', tier: 'niche' }, { tag: 'communityovercompetition', tier: 'micro' },
  ],
  donate: [
    { tag: 'donate', tier: 'medium' }, { tag: 'fundraising', tier: 'medium' },
    { tag: 'donations', tier: 'niche' }, { tag: 'gofundme', tier: 'niche' },
    { tag: 'supportacause', tier: 'micro' },
  ],

  // --- LIFESTYLE ---
  lifestyle: [
    { tag: 'lifestyle', tier: 'high' }, { tag: 'lifestyleblogger', tier: 'medium' },
    { tag: 'lifestyleinspo', tier: 'niche' }, { tag: 'lifestyledesign', tier: 'niche' },
    { tag: 'minimalistlifestyle', tier: 'niche' },
  ],
  motivation: [
    { tag: 'motivation', tier: 'high' }, { tag: 'motivational', tier: 'medium' },
    { tag: 'motivationmonday', tier: 'medium' }, { tag: 'motivationalquotes', tier: 'medium' },
    { tag: 'dailymotivation', tier: 'niche' }, { tag: 'staymotivated', tier: 'niche' },
  ],
  inspiration: [
    { tag: 'inspiration', tier: 'high' }, { tag: 'inspired', tier: 'medium' },
    { tag: 'inspirational', tier: 'medium' }, { tag: 'inspirationalquotes', tier: 'medium' },
    { tag: 'dailyinspiration', tier: 'niche' },
  ],
  mindset: [
    { tag: 'mindset', tier: 'high' }, { tag: 'growthmindset', tier: 'medium' },
    { tag: 'mindsetshift', tier: 'niche' }, { tag: 'mindsetcoach', tier: 'niche' },
    { tag: 'mindsetiseverything', tier: 'niche' }, { tag: 'positivemindset', tier: 'niche' },
  ],
  parenting: [
    { tag: 'parenting', tier: 'high' }, { tag: 'momlife', tier: 'high' },
    { tag: 'parentingtips', tier: 'medium' }, { tag: 'dadlife', tier: 'medium' },
    { tag: 'parenthood', tier: 'medium' }, { tag: 'mumlife', tier: 'niche' },
  ],
  kids: [
    { tag: 'kids', tier: 'high' }, { tag: 'kidsactivities', tier: 'medium' },
    { tag: 'kidsfashion', tier: 'medium' }, { tag: 'kidsofinstagram', tier: 'niche' },
  ],
  pet: [
    { tag: 'pets', tier: 'high' }, { tag: 'petsofinstagram', tier: 'medium' },
    { tag: 'petlover', tier: 'medium' }, { tag: 'petcare', tier: 'niche' },
  ],
  dog: [
    { tag: 'dog', tier: 'high' }, { tag: 'dogsofinstagram', tier: 'high' },
    { tag: 'doglover', tier: 'medium' }, { tag: 'doglife', tier: 'medium' },
    { tag: 'puppy', tier: 'high' }, { tag: 'dogtraining', tier: 'niche' },
  ],
  cat: [
    { tag: 'cat', tier: 'high' }, { tag: 'catsofinstagram', tier: 'high' },
    { tag: 'catlover', tier: 'medium' }, { tag: 'catlife', tier: 'medium' },
    { tag: 'kitten', tier: 'medium' },
  ],
  sustainable: [
    { tag: 'sustainable', tier: 'medium' }, { tag: 'sustainability', tier: 'medium' },
    { tag: 'sustainableliving', tier: 'medium' }, { tag: 'sustainablefashion', tier: 'niche' },
    { tag: 'ecofriendly', tier: 'medium' }, { tag: 'zerowaste', tier: 'niche' },
    { tag: 'gogreen', tier: 'niche' },
  ],
  garden: [
    { tag: 'gardening', tier: 'high' }, { tag: 'garden', tier: 'high' },
    { tag: 'gardenlife', tier: 'medium' }, { tag: 'gardeningtips', tier: 'niche' },
    { tag: 'homegarden', tier: 'niche' }, { tag: 'urbanfarming', tier: 'micro' },
  ],
  music: [
    { tag: 'music', tier: 'high' }, { tag: 'musician', tier: 'high' },
    { tag: 'musicproduction', tier: 'medium' }, { tag: 'newmusic', tier: 'medium' },
    { tag: 'musiclife', tier: 'niche' }, { tag: 'indiemusic', tier: 'niche' },
  ],
  gaming: [
    { tag: 'gaming', tier: 'high' }, { tag: 'gamer', tier: 'high' },
    { tag: 'gamingcommunity', tier: 'medium' }, { tag: 'gamerlife', tier: 'niche' },
    { tag: 'indiegames', tier: 'niche' }, { tag: 'gamedev', tier: 'niche' },
  ],
  book: [
    { tag: 'books', tier: 'high' }, { tag: 'booklover', tier: 'medium' },
    { tag: 'bookstagram', tier: 'medium' }, { tag: 'bookrecommendations', tier: 'niche' },
    { tag: 'reading', tier: 'high' }, { tag: 'bookclub', tier: 'niche' },
  ],
  wedding: [
    { tag: 'wedding', tier: 'high' }, { tag: 'weddingplanning', tier: 'medium' },
    { tag: 'weddingphotography', tier: 'medium' }, { tag: 'weddinginspo', tier: 'medium' },
    { tag: 'weddingdecor', tier: 'niche' }, { tag: 'bridal', tier: 'medium' },
  ],
  car: [
    { tag: 'cars', tier: 'high' }, { tag: 'carsofinstagram', tier: 'medium' },
    { tag: 'carlife', tier: 'medium' }, { tag: 'automotive', tier: 'medium' },
    { tag: 'electricvehicle', tier: 'niche' }, { tag: 'cardetailing', tier: 'niche' },
  ],
  dental: [
    { tag: 'dental', tier: 'medium' }, { tag: 'dentist', tier: 'medium' },
    { tag: 'dentalcare', tier: 'niche' }, { tag: 'dentistry', tier: 'niche' },
    { tag: 'dentalhealth', tier: 'micro' }, { tag: 'oralhealth', tier: 'micro' },
  ],
  legal: [
    { tag: 'legal', tier: 'medium' }, { tag: 'lawyer', tier: 'medium' },
    { tag: 'lawfirm', tier: 'niche' }, { tag: 'legaladvice', tier: 'niche' },
    { tag: 'legaltips', tier: 'micro' }, { tag: 'attorney', tier: 'niche' },
  ],
  medical: [
    { tag: 'medical', tier: 'medium' }, { tag: 'healthcare', tier: 'medium' },
    { tag: 'doctor', tier: 'medium' }, { tag: 'healthcareprofessional', tier: 'niche' },
    { tag: 'medicalcommunity', tier: 'micro' },
  ],
  cleaning: [
    { tag: 'cleaning', tier: 'medium' }, { tag: 'cleaningtips', tier: 'medium' },
    { tag: 'cleanhome', tier: 'niche' }, { tag: 'cleaningmotivation', tier: 'niche' },
    { tag: 'professionalcleaning', tier: 'micro' },
  ],
  plumbing: [
    { tag: 'plumbing', tier: 'niche' }, { tag: 'plumber', tier: 'niche' },
    { tag: 'plumbingtips', tier: 'micro' }, { tag: 'plumbingservice', tier: 'micro' },
  ],
  construction: [
    { tag: 'construction', tier: 'medium' }, { tag: 'constructionlife', tier: 'niche' },
    { tag: 'contractor', tier: 'niche' }, { tag: 'generalcontractor', tier: 'micro' },
    { tag: 'constructionsite', tier: 'niche' },
  ],
  landscaping: [
    { tag: 'landscaping', tier: 'medium' }, { tag: 'landscapedesign', tier: 'niche' },
    { tag: 'landscaper', tier: 'niche' }, { tag: 'lawncare', tier: 'niche' },
    { tag: 'hardscaping', tier: 'micro' },
  ],
  auto: [
    { tag: 'auto', tier: 'medium' }, { tag: 'autorepair', tier: 'niche' },
    { tag: 'automotive', tier: 'medium' }, { tag: 'mechanic', tier: 'niche' },
    { tag: 'autodetailing', tier: 'niche' },
  ],
  salon: [
    { tag: 'salon', tier: 'medium' }, { tag: 'hairstylist', tier: 'medium' },
    { tag: 'salonlife', tier: 'niche' }, { tag: 'hairsalon', tier: 'niche' },
    { tag: 'nailsalon', tier: 'niche' }, { tag: 'beautysalon', tier: 'micro' },
  ],
  spa: [
    { tag: 'spa', tier: 'medium' }, { tag: 'spaday', tier: 'medium' },
    { tag: 'spaexperience', tier: 'niche' }, { tag: 'dayspa', tier: 'niche' },
    { tag: 'spatreatment', tier: 'micro' },
  ],
  bakery: [
    { tag: 'bakery', tier: 'medium' }, { tag: 'bakerylove', tier: 'niche' },
    { tag: 'localbakery', tier: 'micro' }, { tag: 'artisanbakery', tier: 'micro' },
    { tag: 'freshbaked', tier: 'niche' },
  ],
  yoga_studio: [
    { tag: 'yogastudio', tier: 'niche' }, { tag: 'yogaclass', tier: 'niche' },
    { tag: 'yogalife', tier: 'medium' }, { tag: 'yogacommunity', tier: 'niche' },
  ],
  event: [
    { tag: 'events', tier: 'medium' }, { tag: 'eventplanning', tier: 'medium' },
    { tag: 'eventplanner', tier: 'niche' }, { tag: 'eventdesign', tier: 'niche' },
    { tag: 'corporateevents', tier: 'micro' },
  ],
  podcast: [
    { tag: 'podcast', tier: 'high' }, { tag: 'podcasting', tier: 'medium' },
    { tag: 'podcastlife', tier: 'niche' }, { tag: 'podcasttips', tier: 'niche' },
    { tag: 'newpodcast', tier: 'micro' },
  ],

  // --- GENERIC ENGAGEMENT KEYWORDS ---
  beginner: [
    { tag: 'beginners', tier: 'medium' }, { tag: 'beginnertips', tier: 'niche' },
    { tag: 'forbeginners', tier: 'niche' }, { tag: 'startingout', tier: 'micro' },
  ],
  daily: [
    { tag: 'daily', tier: 'medium' }, { tag: 'dailyroutine', tier: 'niche' },
    { tag: 'dailyinspiration', tier: 'niche' }, { tag: 'dailytips', tier: 'niche' },
  ],
  diy: [
    { tag: 'diy', tier: 'high' }, { tag: 'diyprojects', tier: 'medium' },
    { tag: 'diyideas', tier: 'medium' }, { tag: 'diyhome', tier: 'niche' },
    { tag: 'diycrafts', tier: 'niche' },
  ],
  free: [
    { tag: 'free', tier: 'medium' }, { tag: 'freetools', tier: 'niche' },
    { tag: 'freeresources', tier: 'niche' }, { tag: 'freebies', tier: 'niche' },
  ],
  success: [
    { tag: 'success', tier: 'high' }, { tag: 'successmindset', tier: 'medium' },
    { tag: 'successtips', tier: 'niche' }, { tag: 'successstory', tier: 'niche' },
  ],
  growth: [
    { tag: 'growth', tier: 'medium' }, { tag: 'personalgrowth', tier: 'medium' },
    { tag: 'growthmindset', tier: 'medium' }, { tag: 'businessgrowth', tier: 'niche' },
    { tag: 'growthstrategy', tier: 'micro' },
  ],
  strategy: [
    { tag: 'strategy', tier: 'medium' }, { tag: 'marketingstrategy', tier: 'medium' },
    { tag: 'businessstrategy', tier: 'niche' }, { tag: 'contentstrategy', tier: 'niche' },
    { tag: 'growthstrategy', tier: 'micro' },
  ],
  local: [
    { tag: 'local', tier: 'medium' }, { tag: 'shoplocal', tier: 'medium' },
    { tag: 'localbusiness', tier: 'medium' }, { tag: 'supportlocal', tier: 'niche' },
    { tag: 'localseo', tier: 'micro' },
  ],
  review: [
    { tag: 'review', tier: 'medium' }, { tag: 'reviews', tier: 'medium' },
    { tag: 'productreview', tier: 'niche' }, { tag: 'customerreview', tier: 'micro' },
    { tag: 'honeystreview', tier: 'micro' },
  ],
  women: [
    { tag: 'womeninbusiness', tier: 'medium' }, { tag: 'womenempowerment', tier: 'medium' },
    { tag: 'girlboss', tier: 'medium' }, { tag: 'femalebusiness', tier: 'niche' },
    { tag: 'womenentrepreneurs', tier: 'niche' },
  ],
  remote: [
    { tag: 'remotework', tier: 'medium' }, { tag: 'workfromhome', tier: 'medium' },
    { tag: 'wfh', tier: 'medium' }, { tag: 'remotejobs', tier: 'niche' },
    { tag: 'remoteworklife', tier: 'niche' }, { tag: 'workfromanywhere', tier: 'niche' },
  ],
  side: [
    { tag: 'sidehustle', tier: 'medium' }, { tag: 'sidehustleideas', tier: 'niche' },
    { tag: 'sideincome', tier: 'niche' }, { tag: 'makemoneyonline', tier: 'medium' },
  ],
};

/**
 * Compound word generation rules. When multiple keywords are present,
 * combine them into compound hashtags.
 */
export const COMPOUND_RULES = [
  // [keyword1, keyword2] -> generated compound hashtags
  { keys: ['vegan', 'meal'], tags: [
    { tag: 'veganmealprep', tier: 'niche' }, { tag: 'veganmeals', tier: 'niche' },
    { tag: 'plantbasedmealprep', tier: 'micro' },
  ]},
  { keys: ['vegan', 'recipe'], tags: [
    { tag: 'veganrecipes', tier: 'medium' }, { tag: 'plantbasedrecipes', tier: 'niche' },
    { tag: 'easyveganrecipes', tier: 'micro' },
  ]},
  { keys: ['healthy', 'meal'], tags: [
    { tag: 'healthymealprep', tier: 'medium' }, { tag: 'healthymeals', tier: 'medium' },
    { tag: 'healthymealideas', tier: 'niche' },
  ]},
  { keys: ['healthy', 'recipe'], tags: [
    { tag: 'healthyrecipes', tier: 'medium' }, { tag: 'healthycooking', tier: 'niche' },
    { tag: 'healthyeasyrecipes', tier: 'micro' },
  ]},
  { keys: ['real', 'estate'], tags: [
    { tag: 'realestateinvesting', tier: 'medium' }, { tag: 'realestatetips', tier: 'niche' },
    { tag: 'realestatelife', tier: 'niche' }, { tag: 'realestatemarketing', tier: 'niche' },
  ]},
  { keys: ['social', 'media'], tags: [
    { tag: 'socialmediamarketing', tier: 'medium' }, { tag: 'socialmediatips', tier: 'medium' },
    { tag: 'socialmediastrategy', tier: 'niche' }, { tag: 'socialmediamanager', tier: 'niche' },
  ]},
  { keys: ['small', 'business'], tags: [
    { tag: 'smallbusinessowner', tier: 'medium' }, { tag: 'smallbusinesstips', tier: 'niche' },
    { tag: 'smallbusinessmarketing', tier: 'micro' }, { tag: 'supportsmallbusiness', tier: 'niche' },
  ]},
  { keys: ['content', 'marketing'], tags: [
    { tag: 'contentmarketingtips', tier: 'niche' }, { tag: 'contentmarketingstrategy', tier: 'micro' },
  ]},
  { keys: ['weight', 'loss'], tags: [
    { tag: 'weightlosstips', tier: 'niche' }, { tag: 'weightlossjourney', tier: 'medium' },
    { tag: 'weightlosstransformation', tier: 'niche' },
  ]},
  { keys: ['digital', 'marketing'], tags: [
    { tag: 'digitalmarketingtips', tier: 'niche' }, { tag: 'digitalmarketingstrategy', tier: 'micro' },
    { tag: 'digitalmarketingagency', tier: 'micro' },
  ]},
  { keys: ['home', 'improvement'], tags: [
    { tag: 'homeimprovement', tier: 'medium' }, { tag: 'homerenovation', tier: 'niche' },
    { tag: 'diyhomedecor', tier: 'niche' },
  ]},
  { keys: ['personal', 'brand'], tags: [
    { tag: 'personalbrand', tier: 'niche' }, { tag: 'personalbranding', tier: 'niche' },
    { tag: 'personalbrandingtips', tier: 'micro' },
  ]},
  { keys: ['email', 'marketing'], tags: [
    { tag: 'emailmarketingtips', tier: 'micro' }, { tag: 'emailstrategy', tier: 'micro' },
    { tag: 'emailcampaign', tier: 'micro' },
  ]},
  { keys: ['online', 'business'], tags: [
    { tag: 'onlinebusiness', tier: 'medium' }, { tag: 'onlinebusinesstips', tier: 'niche' },
    { tag: 'makemoneyonline', tier: 'medium' },
  ]},
  { keys: ['meal', 'prep'], tags: [
    { tag: 'mealprepsunday', tier: 'niche' }, { tag: 'mealprepdaily', tier: 'niche' },
    { tag: 'mealprepideas', tier: 'medium' }, { tag: 'mealpreplife', tier: 'micro' },
  ]},
  { keys: ['fitness', 'tips'], tags: [
    { tag: 'fitnesstips', tier: 'medium' }, { tag: 'workoutroutine', tier: 'medium' },
    { tag: 'fitnessadvice', tier: 'niche' },
  ]},
  { keys: ['beauty', 'tips'], tags: [
    { tag: 'beautytips', tier: 'medium' }, { tag: 'beautyhacks', tier: 'niche' },
    { tag: 'beautyadvice', tier: 'niche' },
  ]},
  { keys: ['travel', 'tips'], tags: [
    { tag: 'traveltips', tier: 'medium' }, { tag: 'travelhacks', tier: 'niche' },
    { tag: 'traveladvice', tier: 'niche' },
  ]},
  { keys: ['skin', 'care'], tags: [
    { tag: 'skincareroutine', tier: 'high' }, { tag: 'skincaretips', tier: 'medium' },
    { tag: 'skincarecommunity', tier: 'niche' },
  ]},
  { keys: ['web', 'design'], tags: [
    { tag: 'webdesign', tier: 'high' }, { tag: 'webdesigner', tier: 'niche' },
    { tag: 'websitedesign', tier: 'niche' }, { tag: 'webdesigntips', tier: 'micro' },
  ]},
  { keys: ['graphic', 'design'], tags: [
    { tag: 'graphicdesign', tier: 'high' }, { tag: 'graphicdesigner', tier: 'medium' },
    { tag: 'designinspiration', tier: 'medium' },
  ]},
];

/**
 * Trending format hashtags by platform. These are format/trend-specific
 * tags that work well on specific platforms.
 */
export const TRENDING_FORMATS = {
  instagram: [
    { tag: 'reels', tier: 'high' }, { tag: 'reelsinstagram', tier: 'medium' },
    { tag: 'instagramreels', tier: 'medium' }, { tag: 'explorepage', tier: 'medium' },
    { tag: 'instatips', tier: 'niche' }, { tag: 'igdaily', tier: 'niche' },
    { tag: 'instadaily', tier: 'high' }, { tag: 'instagood', tier: 'high' },
  ],
  tiktok: [
    { tag: 'tiktok', tier: 'high' }, { tag: 'fyp', tier: 'high' },
    { tag: 'foryou', tier: 'high' }, { tag: 'foryoupage', tier: 'high' },
    { tag: 'viral', tier: 'high' }, { tag: 'trending', tier: 'high' },
    { tag: 'tiktokviral', tier: 'medium' },
  ],
  linkedin: [
    { tag: 'linkedintips', tier: 'niche' }, { tag: 'linkedinlife', tier: 'niche' },
    { tag: 'networking', tier: 'medium' }, { tag: 'professionaldevelopment', tier: 'niche' },
    { tag: 'careeradvice', tier: 'niche' }, { tag: 'thoughtleadership', tier: 'niche' },
  ],
  twitter: [
    { tag: 'thread', tier: 'medium' },
  ],
  pinterest: [
    { tag: 'pinterestinspiration', tier: 'niche' }, { tag: 'pinterestideas', tier: 'niche' },
    { tag: 'pinoftheday', tier: 'niche' }, { tag: 'pinteresttips', tier: 'micro' },
  ],
};

/**
 * Content type modifiers. When a content type is selected, add these
 * extra hashtags.
 */
export const CONTENT_TYPE_TAGS = {
  product: [
    { tag: 'newproduct', tier: 'niche' }, { tag: 'productlaunch', tier: 'medium' },
    { tag: 'shopnow', tier: 'medium' }, { tag: 'launch', tier: 'medium' },
    { tag: 'newrelease', tier: 'niche' }, { tag: 'productdrop', tier: 'niche' },
    { tag: 'launchday', tier: 'micro' },
  ],
  tips: [
    { tag: 'tips', tier: 'medium' }, { tag: 'howto', tier: 'medium' },
    { tag: 'tipsandtricks', tier: 'medium' }, { tag: 'protips', tier: 'niche' },
    { tag: 'learnwithme', tier: 'medium' }, { tag: 'quicktips', tier: 'niche' },
    { tag: 'didyouknow', tier: 'niche' },
  ],
  bts: [
    { tag: 'behindthescenes', tier: 'medium' }, { tag: 'bts', tier: 'medium' },
    { tag: 'dayinmylife', tier: 'medium' }, { tag: 'process', tier: 'niche' },
    { tag: 'makingof', tier: 'niche' }, { tag: 'creativeprocess', tier: 'niche' },
    { tag: 'worklife', tier: 'niche' },
  ],
  testimonial: [
    { tag: 'testimonial', tier: 'niche' }, { tag: 'happycustomer', tier: 'niche' },
    { tag: 'clientresults', tier: 'niche' }, { tag: 'customerlove', tier: 'niche' },
    { tag: 'socialproof', tier: 'micro' }, { tag: 'customerstory', tier: 'micro' },
    { tag: 'review', tier: 'medium' },
  ],
  event: [
    { tag: 'event', tier: 'medium' }, { tag: 'announcement', tier: 'niche' },
    { tag: 'savethedate', tier: 'niche' }, { tag: 'comingsoon', tier: 'niche' },
    { tag: 'bigannouncement', tier: 'niche' }, { tag: 'exciting', tier: 'niche' },
  ],
  general: [],
};

/**
 * Co-occurrence map. When a hashtag is selected, suggest these related ones.
 */
export const CO_OCCURRENCE = {
  smallbusiness: ['shoplocal', 'supportsmallbusiness', 'smallbiz', 'entrepreneur', 'localbusiness'],
  entrepreneur: ['startup', 'hustle', 'businessowner', 'success', 'motivation'],
  fitness: ['workout', 'gym', 'fitlife', 'health', 'motivation'],
  food: ['foodie', 'instafood', 'foodphotography', 'delicious', 'homemade'],
  vegan: ['plantbased', 'crueltyfree', 'veganfood', 'healthyeating', 'nutrition'],
  mealprep: ['mealplan', 'healthyeating', 'mealprepideas', 'nutrition', 'cleaneating'],
  realestate: ['realtor', 'homebuying', 'property', 'investment', 'mortgage'],
  marketing: ['digitalmarketing', 'socialmedia', 'branding', 'seo', 'contentmarketing'],
  travel: ['wanderlust', 'adventure', 'travelgram', 'explore', 'vacation'],
  skincare: ['beauty', 'skincareroutine', 'selfcare', 'naturalskincare', 'beautytips'],
  fashion: ['style', 'ootd', 'fashionblogger', 'streetstyle', 'fashioninspo'],
  photography: ['photographer', 'photooftheday', 'naturephotography', 'portraitphotography', 'photoshoot'],
  design: ['graphicdesign', 'uidesign', 'branding', 'creative', 'designinspiration'],
  coffee: ['coffeelover', 'coffeetime', 'morningcoffee', 'coffeeshop', 'barista'],
  yoga: ['meditation', 'mindfulness', 'wellness', 'flexibility', 'yogalife'],
  coding: ['programming', 'developer', 'webdevelopment', 'javascript', 'python'],
  ecommerce: ['onlineshopping', 'shopify', 'dropshipping', 'onlinestore', 'shopnow'],
  wedding: ['bride', 'weddingplanning', 'weddinginspo', 'bridal', 'weddingdecor'],
  sustainability: ['ecofriendly', 'zerowaste', 'sustainable', 'gogreen', 'climateaction'],
  podcast: ['podcasting', 'podcastlife', 'newpodcast', 'podcastersofinstagram', 'podcaster'],
  ai: ['machinelearning', 'artificialintelligence', 'deeplearning', 'datascience', 'automation'],
  socialmedia: ['socialmediamarketing', 'contentcreator', 'instagram', 'tiktok', 'socialmediatips'],
  remotework: ['workfromhome', 'digitalnomad', 'wfh', 'remotejobs', 'workfromanywhere'],
  nonprofit: ['charity', 'giveback', 'volunteer', 'socialgood', 'communityimpact'],
  wordpress: ['webdesign', 'blogging', 'website', 'wordpresstips', 'webhosting'],
};

/**
 * Category hierarchy for broadening searches. Maps specific keywords
 * to their parent categories.
 */
export const CATEGORY_BROADENERS = {
  vegan: ['food', 'healthy', 'nutrition', 'lifestyle'],
  meal: ['food', 'cooking', 'healthy', 'nutrition'],
  prep: ['meal', 'cooking', 'food'],
  recipe: ['food', 'cooking'],
  baking: ['food', 'cooking'],
  coffee: ['food', 'lifestyle'],
  restaurant: ['food', 'business', 'local'],
  workout: ['fitness', 'health'],
  gym: ['fitness', 'workout'],
  yoga: ['fitness', 'wellness', 'selfcare'],
  running: ['fitness', 'outdoor'],
  weight: ['fitness', 'health'],
  training: ['fitness'],
  wellness: ['health', 'selfcare', 'lifestyle'],
  skincare: ['beauty', 'selfcare'],
  makeup: ['beauty', 'fashion'],
  hair: ['beauty', 'salon'],
  startup: ['business', 'entrepreneur', 'tech'],
  freelance: ['business', 'creative'],
  investing: ['finance', 'money', 'business'],
  ecommerce: ['business', 'shop', 'marketing'],
  dropshipping: ['ecommerce', 'business'],
  coding: ['tech', 'software'],
  ai: ['tech', 'software'],
  wordpress: ['web', 'hosting', 'tech'],
  hosting: ['web', 'tech', 'business'],
  seo: ['marketing', 'web', 'business'],
  email: ['marketing', 'business'],
  salon: ['beauty', 'local', 'business'],
  dental: ['medical', 'local', 'business'],
  plumbing: ['construction', 'local', 'business'],
  landscaping: ['outdoor', 'local', 'business'],
  bakery: ['food', 'local', 'business'],
  podcast: ['content', 'media', 'marketing'],
  photography: ['creative', 'art', 'design'],
  video: ['creative', 'content', 'marketing'],
  wedding: ['event', 'photography', 'lifestyle'],
  parenting: ['lifestyle', 'kids'],
  dog: ['pet', 'lifestyle'],
  cat: ['pet', 'lifestyle'],
  gaming: ['tech', 'entertainment'],
  music: ['creative', 'art', 'entertainment'],
};

/**
 * Stop words to filter out when extracting keywords from user input.
 */
export const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'it', 'its', 'this', 'that', 'be',
  'are', 'was', 'were', 'been', 'being', 'have', 'has', 'had', 'do',
  'does', 'did', 'will', 'would', 'shall', 'should', 'may', 'might',
  'can', 'could', 'not', 'no', 'nor', 'so', 'if', 'then', 'than',
  'too', 'very', 'just', 'about', 'up', 'out', 'how', 'what', 'when',
  'where', 'who', 'which', 'why', 'all', 'each', 'every', 'both',
  'few', 'more', 'most', 'other', 'some', 'such', 'only', 'own',
  'same', 'also', 'into', 'over', 'after', 'before', 'between',
  'under', 'above', 'below', 'while', 'during', 'through', 'my',
  'your', 'his', 'her', 'our', 'their', 'i', 'me', 'we', 'you',
  'he', 'she', 'they', 'them', 'us', 'as', 'get', 'got', 'make',
  'made', 'like', 'need', 'want', 'use', 'using', 'used', 'way',
  'much', 'many', 'here', 'there', 'now', 'new', 'good', 'best',
  'well', 'still', 'even', 'any', 'help', 'great', 'big', 'things',
]);
