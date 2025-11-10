import { useSanityData } from '@/lib/sanity/useSanityData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin, Twitter } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Decorative animated background web (random nodes, drifting, comets)
function TeamWebOverlay() {
  const wrapperSelector = '#team-grid-wrapper';
  const rafRef = useRef<number | null>(null);
  const nodesRef = useRef<Array<{ id: number; x: number; y: number; vx: number; vy: number; r: number }>>([]);
  const cometRef = useRef<{ edge: [number, number] | null; t: number; speed: number } | null>(null);
  const [, setTick] = useState(0);

  const init = (w: number, h: number) => {
    const count = Math.max(12, Math.min(30, Math.floor((w * h) / 50000)));
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 2,
      });
    }
    nodesRef.current = arr;
    // init comet
    cometRef.current = { edge: null, t: 0, speed: 0.002 + Math.random() * 0.004 };
  };

  const step = (w: number, h: number) => {
    const nodes = nodesRef.current;
    // update positions
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      // small wandering
      n.vx += (Math.random() - 0.5) * 0.04;
      n.vy += (Math.random() - 0.5) * 0.04;
      // clamp speed
      const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (speed > 1) {
        n.vx *= 0.9;
        n.vy *= 0.9;
      }
      // bounce
      if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx); }
      if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy); }
      if (n.x > w) { n.x = w; n.vx = -Math.abs(n.vx); }
      if (n.y > h) { n.y = h; n.vy = -Math.abs(n.vy); }
    }

    // update comet
    if (cometRef.current) {
      let c = cometRef.current;
      if (!c.edge) {
        // pick a random edge among current nearest neighbors
        const edges = computeEdges(nodes, 3);
        if (edges.length > 0 && Math.random() < 0.02) {
          const e = edges[Math.floor(Math.random() * edges.length)];
          c.edge = e;
          c.t = 0;
          c.speed = 0.002 + Math.random() * 0.008;
        }
      } else {
        c.t += c.speed * (0.5 + Math.random());
        if (c.t >= 1) {
          c.edge = null;
          c.t = 0;
        }
      }
      cometRef.current = c;
    }
  };

  const computeEdges = (nodes: Array<{ id: number; x: number; y: number }>, k = 3) => {
    const out: Array<[number, number]> = [];
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const dists: Array<{ id: number; d: number }> = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const b = nodes[j];
        const dx = a.x - b.x; const dy = a.y - b.y;
        dists.push({ id: b.id, d: dx * dx + dy * dy });
      }
      dists.sort((p, q) => p.d - q.d);
      for (let n = 0; n < Math.min(k, dists.length); n++) {
        const other = dists[n].id;
        const key = [Math.min(a.id, other), Math.max(a.id, other)] as [number, number];
        out.push(key);
      }
    }
    // dedupe
    const uniq = new Map<string, [number, number]>();
    for (const e of out) uniq.set(e.join('__'), e);
    return Array.from(uniq.values());
  };

  useEffect(() => {
    let mounted = true;
    const wrapper = document.querySelector(wrapperSelector) as HTMLElement | null;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const w = Math.max(200, rect.width);
    const h = Math.max(200, rect.height);
    init(w, h);

    const loop = () => {
      if (!mounted) return;
      const wrapper2 = document.querySelector(wrapperSelector) as HTMLElement | null;
      if (!wrapper2) return;
      const r = wrapper2.getBoundingClientRect();
      step(r.width, r.height);
      // trigger render
      setTick((t) => t + 1);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      const wrapper3 = document.querySelector(wrapperSelector) as HTMLElement | null;
      if (!wrapper3) return;
      const r = wrapper3.getBoundingClientRect();
      // reinit with new bounds if size changed significantly
      if (nodesRef.current.length === 0) init(r.width, r.height);
    });
    ro.observe(wrapper);

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // visible check (hide on small screens)
  const wrapperEl = typeof window !== 'undefined' ? document.querySelector(wrapperSelector) as HTMLElement | null : null;
  const visible = wrapperEl ? wrapperEl.getBoundingClientRect().width >= 520 : false;
  if (!visible) return null;

  const nodes = nodesRef.current;
  const edges = computeEdges(nodes, 3);
  const comet = cometRef.current;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden>
      <defs>
        <linearGradient id="gw" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#F472B6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      {/* edges */}
      {edges.map(([a, b]) => {
        const na = nodes.find((n) => n.id === a);
        const nb = nodes.find((n) => n.id === b);
        if (!na || !nb) return null;
        const dx = nb.x - na.x; const dy = nb.y - na.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        return (
          <line
            key={`${a}-${b}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
            strokeLinecap="round"
            style={{ mixBlendMode: 'screen' }}
          />
        );
      })}

      {/* stars */}
      {nodes.map((n) => (
        <circle key={`s-${n.id}`} cx={n.x} cy={n.y} r={n.r} fill="rgba(255,255,255,0.9)" style={{ mixBlendMode: 'screen' }} />
      ))}

      {/* comet */}
      {comet && comet.edge && (() => {
        const [a, b] = comet.edge;
        const na = nodes.find((n) => n.id === a);
        const nb = nodes.find((n) => n.id === b);
        if (!na || !nb) return null;
        const t = Math.max(0, Math.min(1, comet.t));
        const cx = na.x + (nb.x - na.x) * t;
        const cy = na.y + (nb.y - na.y) * t;
        return (
          <g key="comet">
            <circle cx={cx} cy={cy} r={3.5} fill="url(#gw)" style={{ filter: 'blur(2px)', mixBlendMode: 'screen' }} />
            <circle cx={cx} cy={cy} r={1.2} fill="#fff" />
          </g>
        );
      })()}
    </svg>
  );
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

interface TeamGridBlockProps {
  heading?: string;
}

export function TeamGridBlock({ heading = 'Our Team' }: TeamGridBlockProps) {
  const { data: authors, loading } = useSanityData<TeamMember[]>('authors');

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            {heading}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-72 flex flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-muted mx-auto mb-3 animate-pulse" />
                <div className="h-4 bg-muted rounded w-28" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!authors || authors.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">
          {heading}
        </h2>
  {/* Background web overlay + team grid */}
  <div id="team-grid-wrapper" className="relative">
          {/* SVG web background will be absolutely positioned here */}
          <TeamWebOverlay />

          <div className="relative z-10">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
              {authors.map((member) => {
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();
            // Resolve image path for production robustly:
            // - If the stored path includes 'src/assets/images' or 'assets/images',
            //   map it to the public path `/assets/images/<filename>` so the browser
            //   requests the static file served from public.
            // - If the image is already an absolute URL (http/https) leave it as-is.
            const rawImage = (member.image || '').trim();
            let imageSrc = rawImage;
            try {
              const isAbsolute = /^https?:\/\//i.test(rawImage);
              if (!isAbsolute && rawImage) {
                // Extract filename and use a sanitized public assets filename.
                // Sanitize: replace unsafe chars with '-', collapse repeats, lowercase.
                const parts = rawImage.split('/');
                const filename = parts[parts.length - 1] || rawImage;
                const ext = filename.includes('.') ? filename.substring(filename.lastIndexOf('.')) : '';
                const base = ext ? filename.substring(0, filename.lastIndexOf('.')) : filename;
                const safeBase = base.replace(/[^a-z0-9._-]+/gi, '-').replace(/-+/g, '-').toLowerCase();
                const safeFilename = `${safeBase}${ext.toLowerCase()}`;
                imageSrc = `/assets/images/${safeFilename}`;
              }
            } catch (e) {
              // fallback to rawImage
              imageSrc = rawImage;
            }
                return (
              <div key={member.name} className="w-72 flex flex-col items-center text-center team-node" data-name={member.name}>
                <Avatar className="h-32 w-32 rounded-full ring-2 ring-primary/10 overflow-hidden">
                  <AvatarImage src={imageSrc} alt={member.name} className="object-cover" />
                  <AvatarFallback className="text-lg bg-primary/10">{initials}</AvatarFallback>
                </Avatar>

                <div className="flex items-center space-x-3 mt-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}

                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            );
          })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
