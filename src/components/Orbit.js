// Rotating rings of tech labels around a center element. Pure CSS animation.

function Ring({ items, radius, speed, reverse, offset = 0 }) {
  return (
    <div
      className={`absolute inset-0 ${reverse ? "animate-orbit-rev" : "animate-orbit"}`}
      style={{ "--orbit-speed": `${speed}s` }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line"
        style={{ width: `${radius * 2}cqw`, height: `${radius * 2}cqw` }}
      />
      {items.map((label, i) => {
        const a = offset + (360 / items.length) * i;
        return (
          <div
            key={label}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${a}deg) translateX(${radius}cqw) rotate(${-a}deg)` }}
          >
            <div className={`origin-top-left ${reverse ? "animate-orbit" : "animate-orbit-rev"}`} style={{ "--orbit-speed": `${speed}s` }}>
              <span className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[clamp(9px,2.6cqw,13px)] text-fg shadow-sm transition-colors hover:border-accent hover:text-accent">
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Orbit({ rings, center, className = "" }) {
  return (
    <div className={`@container relative aspect-square w-full ${className}`}>
      <div className="absolute inset-[18%] rounded-full bg-accent/15 blur-3xl" />
      <Ring items={rings.outer} radius={43} speed={60} offset={10} />
      <Ring items={rings.middle} radius={34} speed={45} reverse offset={30} />
      <Ring items={rings.inner} radius={24} speed={30} offset={60} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{center}</div>
    </div>
  );
}
