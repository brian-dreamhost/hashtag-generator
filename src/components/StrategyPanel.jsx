export default function StrategyPanel({ platform }) {
  return (
    <div className="bg-midnight/60 border border-azure/20 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-azure uppercase tracking-wider">{platform.name} Strategy</span>
        <span className="text-xs border border-azure/30 text-azure rounded-full px-2 py-0.5">{platform.recommended} hashtags recommended</span>
      </div>
      <p className="text-sm text-cloudy">{platform.tip}</p>
    </div>
  );
}
