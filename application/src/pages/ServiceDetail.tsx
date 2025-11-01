import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { RichTextRenderer } from '@/components/blocks/RichTextRenderer';
import { CtaBlock } from '@/components/blocks/CtaBlock';
import { useSanityData } from '@/lib/sanity/useSanityData';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Service {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  description: any[];
  keyFeatures: string[];
}

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, loading } = useSanityData<Service>('service', { slug });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Button asChild>
              <Link to="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = (Icons[service.icon as keyof typeof Icons] as LucideIcon) || Icons.Box;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-muted/30 py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" asChild className="-ml-4">
              <Link to="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>
          </div>
        </section>

        {/* Hero */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <IconComponent className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {service.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <RichTextRenderer content={service.description} />
              </div>

              {/* Sidebar - Key Features */}
              <div>
                <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {service.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaBlock
          heading="Ready to Get Started?"
          text="Contact us to learn how this service can benefit your organization."
          buttonText="Contact Us"
          buttonLink="/services"
        />
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
