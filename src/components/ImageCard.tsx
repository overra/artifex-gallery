import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Bookmark } from 'lucide-react';
import { Artwork } from '@/lib/mock-data';
import { useAuthStore } from '@/store/auth';
import { useArtworksStore } from '@/store/artworks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SaveToCollectionDialog } from '@/components/SaveToCollectionDialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
interface ImageCardProps {
  artwork: Artwork;
}
export function ImageCard({ artwork }: ImageCardProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const likedArtworks = useArtworksStore((state) => state.likedArtworks);
  const toggleLike = useArtworksStore((state) => state.toggleLike);
  const isLiked = likedArtworks.has(artwork.id);
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentUser) {
      setDialogOpen(true);
    } else {
      toast.error('Please log in to save artwork.');
    }
  };
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(artwork.id);
  };
  return (
    <>
      <motion.div
        className="relative group overflow-hidden rounded-lg break-inside-avoid"
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Link to={`/art/${artwork.id}`}>
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
          <h3 className="font-bold truncate">{artwork.title}</h3>
          <Link
            to={`/profile/${artwork.artist.username}`}
            className="flex items-center space-x-2 mt-2 text-sm hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={artwork.artist.avatarUrl} />
              <AvatarFallback>{artwork.artist.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{artwork.artist.username}</span>
          </Link>
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="secondary" size="icon" className="h-8 w-8 mr-2" onClick={handleSaveClick}>
            <Bookmark className="h-4 w-4" />
          </Button>
          <motion.div whileTap={{ scale: 1.2 }} className="inline-block">
            <Button variant="secondary" size="icon" className="h-8 w-8" onClick={handleLikeClick}>
              <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
            </Button>
          </motion.div>
        </div>
      </motion.div>
      {currentUser && (
        <SaveToCollectionDialog
          artworkId={artwork.id}
          open={isDialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
}