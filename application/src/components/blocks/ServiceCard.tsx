import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: string;
  title: string;
  tagline: string;
  slug: string;
}

export function ServiceCard({ icon, title, tagline, slug }: ServiceCardProps) {
  // Get the icon component from lucide-react
  const IconComponent = (Icons[icon as keyof typeof Icons] as LucideIcon) || Icons.Box;

  return (
    <Link to={`/services/${slug}`} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card">
        <CardHeader>
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <IconComponent className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="mt-2">
            {tagline}
          </CardDescription>
          <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
