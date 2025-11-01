import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/NavBar';
import { Footer } from '../components/layout/Footer';
import { RichTextRenderer } from '@/components/blocks/RichTextRenderer';
import { useSanityData } from '@/lib/sanity/useSanityData';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Post {
  slug: string;
  title: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
  body: any[];
}

const InsightDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, loading } = useSanityData<Post>('post', { slug });

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

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
            <Button asChild>
              <Link to="/insights">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Insights
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const initials = post.author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-muted/30 py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" asChild className="-ml-4">
              <Link to="/insights">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Insights
              </Link>
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>{formattedDate}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}`} 
                      alt={post.author.name} 
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto">
              <RichTextRenderer content={post.body} />
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InsightDetail;
