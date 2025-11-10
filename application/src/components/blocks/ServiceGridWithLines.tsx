import React, { useEffect, useRef, useState } from 'react';
import { ServiceCard } from './ServiceCard';

interface Service {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
}

interface Props {
  services: Service[];
  // how many nearest neighbors to connect per node
  k?: number;
}

type Pos = { x: number; y: number };

export default function ServiceGridWithLines({ services = [], k = 2 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [positions, setPositions] = useState<Record<string, Pos>>({});
  const [mounted, setMounted] = useState(false);
  const [animateLines, setAnimateLines] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Measure positions of card centers relative to the container
  const updatePositions = () => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const next: Record<string, Pos> = {};
    services.forEach((s) => {
      const el = cardRefs.current.get(s.slug);
      if (el) {
        const r = el.getBoundingClientRect();
        next[s.slug] = {
          x: r.left - cRect.left + r.width / 2,
          y: r.top - cRect.top + r.height / 2,
        };
      }
    });
    setPositions(next);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    updatePositions();
    // animate lines after a short delay so stroke animation is visible
    const t = setTimeout(() => setAnimateLines(true), 150);

    const ro = new ResizeObserver(() => {
      // throttle with rAF
      requestAnimationFrame(updatePositions);
    });
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updatePositions);

    // observe cards as well (in case their size changes)
    cardRefs.current.forEach((el) => el && ro.observe(el));

    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', updatePositions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, services]);

  // Build edges using k-nearest neighbors
  const edges = React.useMemo(() => {
    const keys = Object.keys(positions);
    const pts = keys.reduce((acc: [string, Pos][], key) => {
      const p = positions[key];
      if (p) acc.push([key, p]);
      return acc;
    }, [] as [string, Pos][]);
    const out = new Set<string>();
    for (let i = 0; i < pts.length; i++) {
      const [id, p] = pts[i];
      // compute distances to others
      const distances: Array<{ id: string; d: number }> = [];
      for (let j = 0; j < pts.length; j++) {
        if (i === j) continue;
        const [id2, p2] = pts[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        distances.push({ id: id2, d: dx * dx + dy * dy });
      }
      distances.sort((a, b) => a.d - b.d);
      for (let n = 0; n < Math.min(k, distances.length); n++) {
        const other = distances[n].id;
        const a = [id, other].sort().join('__');
        out.add(a);
      }
    }
    return Array.from(out).map((s) => s.split('__') as [string, string]);
  }, [positions, k]);

  return (
    <div ref={containerRef} className="relative">
      {/* SVG overlay for lines - decorative */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], idx) => {
          const pa = positions[a];
          const pb = positions[b];
          if (!pa || !pb) return null;
          const dx = pb.x - pa.x;
          const dy = pb.y - pa.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const isHighlighted = hovered && (hovered === a || hovered === b);
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={isHighlighted ? 'url(#g1)' : 'rgba(124,58,237,0.12)'}
              strokeWidth={isHighlighted ? 2.2 : 1}
              strokeLinecap="round"
              style={{
                transition: 'stroke-width 200ms ease, stroke 200ms ease, opacity 300ms ease',
                opacity: animateLines ? 1 : 0,
                strokeDasharray: length,
                strokeDashoffset: animateLines ? 0 : length,
              }}
            />
          );
        })}
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.slug}
            ref={(el) => cardRefs.current.set(s.slug, el)}
            onMouseEnter={() => setHovered(s.slug)}
            onMouseLeave={() => setHovered((h) => (h === s.slug ? null : h))}
          >
            {/* ServiceCard is a named export */}
            <ServiceCard icon={s.icon} title={s.title} tagline={s.tagline} slug={s.slug} />
          </div>
        ))}
      </div>
    </div>
  );
}
