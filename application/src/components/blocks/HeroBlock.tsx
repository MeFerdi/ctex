import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroBlockProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

export function HeroBlock({ title, subtitle, ctaText, ctaLink }: HeroBlockProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl animate-fade-in-up">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {subtitle}
          </p>
          {ctaText && ctaLink && (
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg" className="group">
                <Link to={ctaLink}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
