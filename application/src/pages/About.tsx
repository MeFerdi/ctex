import { Navbar } from '../components/layout/NavBar';
import { Footer } from '../components/layout/Footer';
import { HeroBlock } from '../components/blocks/HeroBlock';
import { TeamGridBlock } from '../components/blocks/TeamGridBlock';
import { CtaBlock } from '../components/blocks/CtaBlock';
import { useSanityData } from '../lib/sanity/useSanityData';

interface PageBlock {
  _type: string;
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface AboutData {
  pageBuilder: PageBlock[];
}

const About = () => {
  const { data: aboutData, loading } = useSanityData<AboutData>('about');

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {aboutData?.pageBuilder.map((block, index) => {
          switch (block._type) {
            case 'heroBlock':
              return (
                <HeroBlock
                  key={index}
                  title={block.heading || ''}
                  subtitle={block.text || ''}
                />
              );
            
            case 'textBlock':
              return (
                <section key={index} className="py-12">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-3xl font-bold text-foreground mb-4">
                        {block.heading}
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {block.text}
                      </p>
                    </div>
                  </div>
                </section>
              );
            
            case 'teamGrid':
              return <TeamGridBlock key={index} heading={block.heading} />;
            
            case 'ctaBlock':
              return (
                <CtaBlock
                  key={index}
                  heading={block.heading || ''}
                  text={block.text || ''}
                  buttonText={block.buttonText || 'Learn More'}
                  buttonLink={block.buttonLink || '/services'}
                />
              );
            
            default:
              return null;
          }
        })}
      </main>

      <Footer />
    </div>
  );
};

export default About;
