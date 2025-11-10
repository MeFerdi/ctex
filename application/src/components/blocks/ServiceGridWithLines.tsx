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
}

export default function ServiceGridWithLines({ services = [] }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Clear any previous timeouts / observers
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const isLarge = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false;

    if (isLarge) {
      // On desktop: staggered fade-in on mount
      services.forEach((s, idx) => {
        const t = window.setTimeout(() => {
          setVisibleMap((prev) => ({ ...prev, [s.slug]: true }));
        }, idx * 120);
        timeoutsRef.current.push(t);
      });
    } else {
      // On small screens: reveal on scroll using IntersectionObserver
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            const slug = el.getAttribute('data-slug') || '';
            if (entry.isIntersecting) {
              setVisibleMap((prev) => ({ ...prev, [slug]: true }));
              if (observerRef.current) observerRef.current.unobserve(el);
            }
          });
        },
        { threshold: 0.15 }
      );

      // Observe each card element
      services.forEach((s) => {
        const el = cardRefs.current.get(s.slug);
        if (el && observerRef.current) observerRef.current.observe(el);
      });
    }

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [services]);

  return (
    <div ref={containerRef} className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, idx) => {
          const isVisible = !!visibleMap[s.slug];
          return (
            <div
              key={s.slug}
              ref={(el) => cardRefs.current.set(s.slug, el)}
              data-slug={s.slug}
              className={`transform transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: isVisible ? `${idx * 60}ms` : '0ms' }}
            >
              <ServiceCard icon={s.icon} title={s.title} tagline={s.tagline} slug={s.slug} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
