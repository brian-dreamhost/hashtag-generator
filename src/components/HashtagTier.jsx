import { memo } from 'react';

function HashtagTier({ label, description, tags, selected, selectedCount, onToggle, onHover, colors }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs font-semibold border rounded-full px-2.5 py-0.5 ${colors.badge}`}>
          {label}
        </span>
        <span className="text-xs text-galactic">{description}</span>
        <span className="text-xs text-galactic ml-auto">
          {tags.length} tags
          {selectedCount > 0 && (
            <span className="text-azure ml-1">({selectedCount} selected)</span>
          )}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag }) => {
          const isSelected = selected.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              onMouseEnter={() => onHover(tag)}
              className={`text-sm px-3 py-2 min-h-[44px] rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
                isSelected
                  ? `${colors.badge} font-medium ring-1 ring-current`
                  : 'border-metal/30 text-galactic hover:text-white hover:border-metal/60'
              }`}
              title={isSelected ? 'Click to remove from set' : 'Click to add to set'}
            >
              {isSelected && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(HashtagTier);
