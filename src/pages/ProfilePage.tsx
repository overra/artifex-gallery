import { useParams, useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { mockUsers } from '@/lib/mock-data';
import { useAuthStore } from '@/store/auth';
import { useArtworksStore } from '@/store/artworks';
import { UserProfileHeader } from '@/components/UserProfileHeader';
import { ImageCard } from '@/components/ImageCard';
import { CollectionCard } from '@/components/CollectionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Image as ImageIcon, Folder, UserX } from 'lucide-react';

export function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const allArtworks = useArtworksStore((state) => state.artworks);
  const likedArtworksSet = useArtworksStore((state) => state.likedArtworks);
  const user = mockUsers.find((u) => u.username === username);
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 text-center">
          <UserX className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-4xl font-display font-bold">User not found</h1>
          <p className="mt-4 text-muted-foreground">The profile you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }
  const userArtworks = allArtworks.filter((art) => art.artist.id === user.id);
  // Show liked art specific to the profile being viewed if it's the current user's profile
  const isOwnProfile = currentUser?.id === user.id;
  const likedArtworks = isOwnProfile ? allArtworks.filter((art) => likedArtworksSet.has(art.id)) : [];

  const breakpointColumnsObj = {
    default: 4,
    1280: 3, // xl
    1024: 3, // lg
    768: 2,  // md
    640: 1   // sm
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="mb-12">
          <UserProfileHeader user={user} />
        </div>
        <Tabs defaultValue="creations" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[600px] mx-auto">
            <TabsTrigger value="creations">Creations ({userArtworks.length})</TabsTrigger>
            <TabsTrigger value="collections">Collections ({user.collections?.length ?? 0})</TabsTrigger>
            {/* Only show liked tab with count for the logged-in user's own profile */}
            <TabsTrigger value="liked" disabled={!isOwnProfile}>Liked {isOwnProfile ? `(${likedArtworks.length})` : ''}</TabsTrigger>
          </TabsList>
          <TabsContent value="creations" className="mt-8">
            {userArtworks.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                {userArtworks.map((artwork) => (
                  <ImageCard key={artwork.id} artwork={artwork} />
                ))}
              </Masonry>
            ) : (
              <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Creations Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  This user hasn't uploaded any art yet.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="collections" className="mt-8">
            {user.collections && user.collections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {user.collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <Folder className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Collections Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  This user hasn't created any collections yet.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="liked" className="mt-8" >
            {likedArtworks.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                {likedArtworks.map((artwork) => (
                  <ImageCard key={artwork.id} artwork={artwork} />
                ))}
              </Masonry>
            ) : (
              <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Liked Artwork</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isOwnProfile
                    ? "Artworks you like will appear here."
                    : "You can only see your own liked artwork."}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}