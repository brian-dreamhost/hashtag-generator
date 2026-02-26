import { useState } from 'react'
import HashtagTier from './components/HashtagTier.jsx'
import StrategyPanel from './components/StrategyPanel.jsx'
import SelectedSet from './components/SelectedSet.jsx'
import { PLATFORMS, TOPICS, CONTENT_TYPES, generateHashtags } from './utils/hashtagData.js'

export default function App() {
  const [topic, setTopic] = useState('business')
  const [platform, setPlatform] = useState('instagram')
  const [contentType, setContentType] = useState('general')
  const [selected, setSelected] = useState([])
  const [generated, setGenerated] = useState(null)

  const currentPlatform = PLATFORMS.find(p => p.id === platform)

  const handleGenerate = () => {
    setGenerated(generateHashtags(topic, platform, contentType))
    setSelected([])
  }

  const toggleTag = (tag) => {
    setSelected(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  return (
    <div className="bg-glow bg-grid min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Hashtag Generator</h1>
          <p className="text-cloudy text-lg max-w-2xl mx-auto">
            Get platform-specific hashtags organized by reach tier — broad, medium, and niche — so you can build a strategic set instead of just dumping 30 random tags.
          </p>
        </div>

        {/* Controls */}
        <div className="card-gradient border border-metal/20 rounded-2xl p-6 flex flex-col gap-5 mb-6">
          {/* Topic */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-cloudy">Topic / Industry</label>
            <select
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-azure max-w-xs"
            >
              {TOPICS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-cloudy">Platform</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    platform === p.id
                      ? 'border-azure bg-azure/10 text-azure'
                      : 'border-metal/30 text-galactic hover:text-cloudy'
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
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    contentType === c.id
                      ? 'border-azure bg-azure/10 text-azure'
                      : 'border-metal/30 text-galactic hover:text-cloudy'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 rounded-lg bg-azure text-white font-semibold hover:bg-azure-hover transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Generate Hashtags
          </button>
        </div>

        {/* Results */}
        {generated && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <StrategyPanel platform={currentPlatform} />

            <div className="card-gradient border border-metal/20 rounded-2xl p-6 flex flex-col gap-6">
              <p className="text-sm text-galactic">Click hashtags to add them to your curated set. Mix tiers for the best strategy.</p>
              <HashtagTier
                tier="broad"
                label="Broad"
                description="High reach, very competitive"
                tags={generated.broad}
                selected={selected}
                onToggle={toggleTag}
              />
              <HashtagTier
                tier="medium"
                label="Medium"
                description="Balanced reach + relevance"
                tags={generated.medium}
                selected={selected}
                onToggle={toggleTag}
              />
              <HashtagTier
                tier="niche"
                label="Niche"
                description="Lower reach, high relevance"
                tags={generated.niche}
                selected={selected}
                onToggle={toggleTag}
              />
            </div>

            <SelectedSet selected={selected} onClear={() => setSelected([])} />
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
