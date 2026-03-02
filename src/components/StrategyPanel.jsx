export default function StrategyPanel({ platform, selectedCount }) {
  const isOverMax = selectedCount > platform.maxHashtags;
  const isInRange = selectedCount >= platform.optimalRange[0] && selectedCount <= platform.optimalRange[1];
  const isUnder = selectedCount > 0 && selectedCount < platform.optimalRange[0];
  const isOver = selectedCount > platform.optimalRange[1] && !isOverMax;

  return (
    <div className="bg-midnight/60 border border-azure/20 rounded-xl p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <span className="text-sm font-semibold text-azure uppercase tracking-wider">
          {platform.name} Strategy
        </span>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs border border-azure/30 text-azure rounded-full px-2.5 py-0.5">
            {platform.recommended} recommended
          </span>
          <span className="text-xs border border-metal/30 text-galactic rounded-full px-2.5 py-0.5">
            {platform.maxHashtags} max
          </span>
        </div>
      </div>

      <p className="text-sm text-cloudy">{platform.tip}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        <div className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-galactic mt-0.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <div>
            <span className="text-xs text-galactic font-medium">Placement</span>
            <p className="text-xs text-cloudy">{platform.placement}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-galactic mt-0.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
          <div>
            <span className="text-xs text-galactic font-medium">Optimal Mix</span>
            <p className="text-xs text-cloudy">{platform.mixAdvice}</p>
          </div>
        </div>
      </div>

      {/* Selected count indicator */}
      {selectedCount > 0 && (
        <div className={`flex items-center gap-2 mt-1 text-xs font-medium rounded-lg px-3 py-2 ${
          isOverMax
            ? 'bg-coral/10 border border-coral/30 text-coral'
            : isInRange
              ? 'bg-turtle/10 border border-turtle/30 text-turtle'
              : isOver
                ? 'bg-tangerine/10 border border-tangerine/30 text-tangerine'
                : isUnder
                  ? 'bg-azure/10 border border-azure/30 text-azure'
                  : 'bg-metal/10 border border-metal/30 text-galactic'
        }`}>
          {isOverMax ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              {selectedCount}/{platform.maxHashtags} selected — exceeds {platform.name} maximum!
            </>
          ) : isInRange ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {selectedCount}/{platform.maxHashtags} selected — optimal range for {platform.name}
            </>
          ) : isOver ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              {selectedCount}/{platform.maxHashtags} selected — above recommended range ({platform.recommended})
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              {selectedCount}/{platform.maxHashtags} selected — add {platform.optimalRange[0] - selectedCount} more for optimal {platform.name} performance
            </>
          )}
        </div>
      )}
    </div>
  );
}
