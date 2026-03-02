export default function RelatedPanel({ sourceTag, related, selected, onAdd, onClose }) {
  const tierColors = {
    high: 'border-coral/20 text-coral hover:border-coral/40',
    medium: 'border-azure/20 text-azure hover:border-azure/40',
    niche: 'border-turtle/20 text-turtle hover:border-turtle/40',
    micro: 'border-prince/20 text-prince hover:border-prince/40',
  };

  const tierLabels = {
    high: 'High',
    medium: 'Med',
    niche: 'Niche',
    micro: 'Micro',
  };

  return (
    <div className="card-gradient border border-prince/20 rounded-2xl p-4 sm:p-5 animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-prince">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
          </svg>
          <span className="text-sm font-semibold text-white">
            Related to <span className="text-prince">{sourceTag}</span>
          </span>
          <span className="text-xs text-galactic">Commonly used together</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-galactic hover:text-white transition-colors rounded-lg hover:bg-metal/20"
          aria-label="Close related tags"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {related.map(({ tag, tier }) => {
          const formatted = '#' + tag;
          const isAlreadySelected = selected.includes(formatted);
          return (
            <button
              key={tag}
              onClick={() => !isAlreadySelected && onAdd(tag)}
              disabled={isAlreadySelected}
              className={`text-sm px-3 py-2 min-h-[44px] rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss ${
                isAlreadySelected
                  ? 'border-metal/20 text-metal/50 cursor-default'
                  : tierColors[tier] || tierColors.niche
              }`}
              title={isAlreadySelected ? 'Already in your set' : `Add ${formatted} to your set`}
            >
              {isAlreadySelected && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
              #{tag}
              <span className="ml-1.5 text-[10px] opacity-60">{tierLabels[tier]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
