import { Navbar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { ServiceCard } from '@/components/blocks/ServiceCard';
import { useSanityData } from '@/lib/sanity/useSanityData';

interface Service {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
}

const Services = () => {
  const { data: services, loading } = useSanityData<Service[]>('services');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                Our Services
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                At CTEX, we bring ideas to life through technology. Whether you need a striking website, social content that resonates, a polished video, or beautiful digital design, we craft solutions that help brands stand out and connect — both in Kenya and on the global stage. Our multidisciplinary team blends creativity, technical depth and practical delivery to produce work that looks great and drives results.
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                Our core services span creative production and technology: web and product design, social media management, filmography & video editing, graphic design, ZIM file installation for schools, plus digital automations and AI integrations that save time and unlock new capabilities.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services?.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    icon={service.icon}
                    title={service.title}
                    tagline={service.tagline}
                    slug={service.slug}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
