import { useSanityData } from '@/lib/sanity/useSanityData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin, Twitter } from 'lucide-react';

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
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
          {authors.map((member) => {
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <div key={member.name} className="w-72 flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 rounded-full ring-2 ring-primary/10 overflow-hidden">
                  <AvatarImage src={member.image} alt={member.name} className="object-cover" />
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
    </section>
  );
}
