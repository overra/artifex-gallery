import { useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { useArtworksStore } from '@/store/artworks';
import { ImageCard } from '@/components/ImageCard';
import { TrendingUp } from 'lucide-react';
export function TrendingPage() {
  const allArtworks = useArtworksStore((state) => state.artworks);
  const trendingArtworks = useMemo(() => {
    return [...allArtworks].sort((a, b) => b.likes - a.likes);
  }, [allArtworks]);
  const breakpointColumnsObj = {
    default: 5,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-3 rounded-full mb-4">
            <TrendingUp className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Trending Artworks
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and liked creations from the Artifex community.
          </p>
        </div>
        {trendingArtworks.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {trendingArtworks.map((artwork) => (
              <ImageCard key={artwork.id} artwork={artwork} />
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No artworks available to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}