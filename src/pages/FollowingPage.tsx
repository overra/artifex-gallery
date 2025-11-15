import { useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { useArtworksStore } from '@/store/artworks';
import { useAuthStore } from '@/store/auth';
import { ImageCard } from '@/components/ImageCard';
import { Users, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function FollowingPage() {
  const allArtworks = useArtworksStore((state) => state.artworks);
  const currentUser = useAuthStore((state) => state.currentUser);
  const login = useAuthStore((state) => state.login);
  const followingArtworks = useMemo(() => {
    if (!currentUser || !currentUser.followingIds) {
      return [];
    }
    return allArtworks.filter(artwork => currentUser.followingIds.includes(artwork.artist.id));
  }, [allArtworks, currentUser]);
  const breakpointColumnsObj = {
    default: 5,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };
  const renderContent = () => {
    if (!currentUser) {
      return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Log in to see your feed</h3>
          <p className="mt-1 text-sm text-muted-foreground mb-4">
            Log in to see the latest creations from artists you follow.
          </p>
          <Button onClick={login}>Login</Button>
        </div>
      );
    }
    if (currentUser.followingIds.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">You aren't following anyone yet</h3>
          <p className="mt-1 text-sm text-muted-foreground mb-4">
            Follow artists to see their work here.
          </p>
          <Button asChild>
            <Link to="/">Explore Art</Link>
          </Button>
        </div>
      );
    }
    if (followingArtworks.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Rss className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Your feed is quiet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            The artists you follow haven't posted anything yet.
          </p>
        </div>
      );
    }
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {followingArtworks.map((artwork) => (
          <ImageCard key={artwork.id} artwork={artwork} />
        ))}
      </Masonry>
    );
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-3 rounded-full mb-4">
            <Rss className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Following Feed
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            The latest creations from artists you follow.
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}