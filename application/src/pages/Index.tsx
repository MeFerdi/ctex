import { Navbar } from '../components/layout/NavBar';
import { Footer } from '../components/layout/Footer';
import { HeroBlock } from '../components/blocks/HeroBlock';
import { ServiceCard } from '../components/blocks/ServiceCard';
import { BlogPostCard } from '../components/blocks/BlogPostCard';
import { CtaBlock } from '../components/blocks/CtaBlock';
import { useSanityData } from '@/lib/sanity/useSanityData';

interface Service {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
}

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
}

interface HomepageData {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  featuredServices: string[];
  latestPosts: number;
}

const Index = () => {
  const { data: homepage } = useSanityData<HomepageData>('homepage');
  const { data: allServices } = useSanityData<Service[]>('services');
  const { data: allPosts } = useSanityData<Post[]>('posts');

  // Get featured services based on homepage configuration
  const featuredServices = allServices?.filter((service) =>
    homepage?.featuredServices.includes(service.slug)
  ) || [];

  // Get latest posts
  const latestPosts = allPosts?.slice(0, homepage?.latestPosts || 3) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        {homepage?.hero && (
          <HeroBlock
            title={homepage.hero.title}
            subtitle={homepage.hero.subtitle}
            ctaText={homepage.hero.ctaText}
            ctaLink={homepage.hero.ctaLink}
          />
        )}

        {/* Services Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From locally relevant campaigns to global digital products — web design, social media, film production, graphic design, ZIM file installation for schools, and modern solutions like digital automations and AI integrations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard
                  key={service.slug}
                  icon={service.icon}
                  title={service.title}
                  tagline={service.tagline}
                  slug={service.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section (replaces Insights on homepage) */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Partners
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Organisations we collaborate with and support across projects and initiatives.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'EduHub' },
                { name: 'OpenLibrary' },
                { name: 'StudioNine' },
                { name: 'LocalGov' },
                { name: 'CreativeLab' }
              ].map((p) => (
                <div key={p.name} className="flex flex-col items-center w-40">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-xl font-semibold text-foreground">
                    {p.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground text-center">{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CtaBlock
          heading="Ready to Transform Your Business?"
          text="Let's discuss how CTEX Technologies can help you achieve your goals."
          buttonText="Get Started"
          buttonLink="/services"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
