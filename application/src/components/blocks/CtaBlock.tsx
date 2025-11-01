import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CtaBlockProps {
  heading: string;
  text: string;
  buttonText: string;
  buttonLink: string;
}

export function CtaBlock({ heading, text, buttonText, buttonLink }: CtaBlockProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-6 py-16 sm:px-12 sm:py-20">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
          
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              {text}
            </p>
            <div className="mt-8">
              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="group shadow-lg"
              >
                <Link to={buttonLink}>
                  {buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
