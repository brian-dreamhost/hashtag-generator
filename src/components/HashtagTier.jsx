export default function HashtagTier({ tier, label, description, tags, selected, onToggle }) {
  const tierColors = {
    broad: { badge: 'bg-coral/10 border-coral/30 text-coral', tag: 'border-coral/20 hover:border-coral text-coral' },
    medium: { badge: 'bg-azure/10 border-azure/30 text-azure', tag: 'border-azure/20 hover:border-azure text-azure' },
    niche: { badge: 'bg-turtle/10 border-turtle/30 text-turtle', tag: 'border-turtle/20 hover:border-turtle text-turtle' },
  };
  const colors = tierColors[tier];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold border rounded-full px-2 py-0.5 ${colors.badge}`}>{label}</span>
        <span className="text-xs text-galactic">{description}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => {
          const isSelected = selected.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              className={`text-sm px-3 py-2 min-h-[44px] rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
                isSelected
                  ? `${colors.badge} font-medium`
                  : 'border-metal/30 text-galactic hover:text-white hover:border-metal/60'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
