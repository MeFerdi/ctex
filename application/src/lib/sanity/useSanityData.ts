/**
 * Placeholder hook for Sanity CMS data fetching
 * 
 * This hook will eventually connect to Sanity CMS using GROQ queries.
 * For now, it returns mock data to allow the UI to be fully developed.
 * 
 * Usage:
 * const { data, loading, error } = useSanityData('service', { slug: 'cloud-solutions' });
 */

import { useState, useEffect } from 'react';

// Mock data imports
import servicesData from '../data/services.json';
import postsData from '../data/posts.json';
import authorsData from '../data/authors.json';
import homepageData from '../data/homepage.json';
import aboutData from '../data/about.json';

type DataType = 'service' | 'services' | 'post' | 'posts' | 'authors' | 'homepage' | 'about';

interface UseSanityDataOptions {
  slug?: string;
}

interface UseSanityDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useSanityData<T = any>(
  type: DataType,
  options?: UseSanityDataOptions
): UseSanityDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        let result: any = null;

        switch (type) {
          case 'services':
            result = servicesData;
            break;
          case 'service':
            if (options?.slug) {
              result = servicesData.find((s: any) => s.slug === options.slug);
            }
            break;
          case 'posts':
            result = postsData;
            break;
          case 'post':
            if (options?.slug) {
              result = postsData.find((p: any) => p.slug === options.slug);
            }
            break;
          case 'authors':
            result = authorsData;
            break;
          case 'homepage':
            result = homepageData;
            break;
          case 'about':
            result = aboutData;
            break;
          default:
            throw new Error(`Unknown data type: ${type}`);
        }

        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, options?.slug]);

  return { data, loading, error };
}

/**
 * Future Sanity client setup will look like this:
 * 
 * import { createClient } from '@sanity/client';
 * 
 * export const sanityClient = createClient({
 *   projectId: 'your-project-id',
 *   dataset: 'production',
 *   useCdn: true,
 *   apiVersion: '2024-01-01',
 * });
 * 
 * Example GROQ query:
 * const query = `*[_type == "service" && slug.current == $slug][0]`;
 * const service = await sanityClient.fetch(query, { slug });
 */
