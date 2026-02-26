import { useState } from 'react';

export default function SelectedSet({ selected, onClear }) {
  const [copied, setCopied] = useState(false);
  const text = selected.join(' ');

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (selected.length === 0) return null;

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-5 flex flex-col gap-3 sticky bottom-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Your Set ({selected.length} tags)</span>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="text-xs px-3 py-1.5 rounded-lg border border-metal/40 text-galactic hover:text-white transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1.5 rounded-lg bg-azure/10 border border-azure/30 text-azure hover:bg-azure hover:text-white transition-colors"
          >
            {copied ? 'Copied!' : 'Copy All'}
          </button>
        </div>
      </div>
      <p className="text-sm text-cloudy break-all">{text}</p>
    </div>
  );
}
