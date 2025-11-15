import { useParams, useNavigate, Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { useArtworksStore } from '@/store/artworks';
import { mockUsers } from '@/lib/mock-data';
import { ImageCard } from '@/components/ImageCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Folder } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export function CollectionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const allArtworks = useArtworksStore((state) => state.artworks);
  const collectionData = (() => {
    for (const user of mockUsers) {
      const collection = user.collections.find((c) => c.id === id);
      if (collection) {
        return { user, collection };
      }
    }
    return null;
  })();
  if (!collectionData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 text-center">
          <h1 className="text-4xl font-bold">Collection not found</h1>
          <p className="mt-4 text-muted-foreground">The collection you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }
  const { user, collection } = collectionData;
  const artworksInCollection = collection.artworkIds
    .map(artworkId => allArtworks.find(art => art.id === artworkId))
    .filter(Boolean);
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
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center space-x-4">
            <Folder className="h-12 w-12 text-primary" />
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                {collection.name}
              </h1>
              <Link to={`/profile/${user.username}`} className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>by {user.username}</span>
              </Link>
            </div>
          </div>
        </div>
        {artworksInCollection.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {artworksInCollection.map((artwork) => (
              <ImageCard key={artwork.id} artwork={artwork} />
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Folder className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">This collection is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Artworks added to this collection will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}