import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Bookmark, MessageCircle, ArrowLeft, Tag } from 'lucide-react';
import { useArtworksStore } from '@/store/artworks';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CommentSection } from '@/components/CommentSection';
import { Card } from '@/components/ui/card';
export function ImageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const artwork = useArtworksStore((state) => state.artworks.find((art) => art.id === id));
  if (!artwork) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 text-center">
          <h1 className="text-4xl font-bold">Artwork not found</h1>
          <p className="mt-4 text-muted-foreground">The piece you're looking for doesn't exist or has been moved.</p>
          <Button onClick={() => navigate('/')} className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Button>
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 bg-muted flex items-center justify-center p-4 sm:p-8">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:col-span-1 flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex items-center space-x-4 mb-4">
                  <Link to={`/profile/${artwork.artist.username}`}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={artwork.artist.avatarUrl} alt={artwork.artist.username} />
                      <AvatarFallback>{artwork.artist.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <h1 className="text-2xl font-display font-bold">{artwork.title}</h1>
                    <Link to={`/profile/${artwork.artist.username}`} className="text-md text-muted-foreground hover:underline">
                      by {artwork.artist.username}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1.5 text-red-500" /> {artwork.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1.5" /> {artwork.comments.length}
                  </div>
                </div>
                <div className="flex space-x-2 mb-6">
                  <Button size="lg" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" /> Like
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    <Bookmark className="mr-2 h-4 w-4" /> Save
                  </Button>
                </div>
                <Separator className="my-6" />
                <p className="text-foreground leading-relaxed">{artwork.description}</p>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold mb-2 flex items-center"><Tag className="h-4 w-4 mr-2 text-muted-foreground"/>Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-6 border-t">
                <CommentSection initialComments={artwork.comments} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}