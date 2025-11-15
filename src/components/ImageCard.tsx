import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Bookmark } from 'lucide-react';
import { Artwork } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
interface ImageCardProps {
  artwork: Artwork;
}
export function ImageCard({ artwork }: ImageCardProps) {
  return (
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
          onClick={(e) => e.stopPropagation()} // Prevent navigating to image detail
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={artwork.artist.avatarUrl} />
            <AvatarFallback>{artwork.artist.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{artwork.artist.username}</span>
        </Link>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button variant="secondary" size="icon" className="h-8 w-8 mr-2" onClick={(e) => e.stopPropagation()}>
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}