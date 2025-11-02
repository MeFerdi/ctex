import { useState } from 'react';
import { Navbar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { BlogPostCard } from '@/components/blocks/BlogPostCard';
import { useSanityData } from '@/lib/sanity/useSanityData';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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

const Changelog = () => {
  const { data: posts, loading } = useSanityData<Post[]>('posts');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts?.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                  <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                    Changelog
              </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Product and project updates, release notes, and quick technical summaries from our work.
              </p>
            </div>
          </div>
        </section>

        {/* No major updates message */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-semibold text-foreground">No major updates at the moment</h3>
              <p className="mt-4 text-muted-foreground">
                We're continuously improving our products and services. There are no significant releases or
                announcements right now — check back soon for updates, or follow us on our social channels for
                the latest news.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <a href="/" className="px-4 py-2 rounded bg-primary text-primary-foreground">Return home</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Changelog;
