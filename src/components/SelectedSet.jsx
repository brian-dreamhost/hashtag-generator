import { useState } from 'react';

export default function SelectedSet({ selected, platform, onClear, onRemove }) {
  const [copied, setCopied] = useState(false);
  const text = selected.join(' ');

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (selected.length === 0) {
    return (
      <div className="card-gradient border border-metal/20 rounded-2xl p-5 text-center">
        <p className="text-sm text-galactic">
          Click hashtags above to build your set, or use "Auto-Build Optimal Set" for a curated mix.
        </p>
      </div>
    );
  }

  const isOverMax = selected.length > platform.maxHashtags;

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 sticky bottom-4 animate-fadeIn shadow-lg shadow-abyss/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">
            Your Set
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
            isOverMax
              ? 'border-coral/40 text-coral bg-coral/10'
              : 'border-azure/40 text-azure bg-azure/10'
          }`}>
            {selected.length}/{platform.maxHashtags}
          </span>
          {isOverMax && (
            <span className="text-xs text-coral">
              Exceeds {platform.name} limit
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="text-xs px-3 py-2 min-h-[44px] rounded-lg border border-metal/40 text-galactic hover:text-white hover:border-metal/60 transition-colors focus:outline-none focus:ring-2 focus:ring-metal focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Clear All
          </button>
          <button
            onClick={handleCopy}
            className={`text-xs px-4 py-2 min-h-[44px] rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
              copied
                ? 'bg-turtle/20 border border-turtle/40 text-turtle'
                : 'bg-azure text-white hover:bg-azure-hover'
            }`}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                Copy All
              </>
            )}
          </button>
        </div>
      </div>

      {/* Selected tags as removable pills */}
      <div className="flex flex-wrap gap-1.5">
        {selected.map(tag => (
          <button
            key={tag}
            onClick={() => onRemove(tag)}
            className="group text-xs px-2.5 py-1.5 rounded-full bg-azure/10 border border-azure/20 text-azure hover:bg-coral/10 hover:border-coral/30 hover:text-coral transition-colors"
            title="Click to remove"
          >
            {tag}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 inline-block ml-1 opacity-50 group-hover:opacity-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        ))}
      </div>

      {/* Copyable text block */}
      <div className="bg-midnight/60 rounded-lg p-3 border border-metal/20">
        <p className="text-xs text-cloudy break-all select-all leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
