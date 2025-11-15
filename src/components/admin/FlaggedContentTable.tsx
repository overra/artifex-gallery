import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';
import { useArtworksStore } from '@/store/artworks';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
export function FlaggedContentTable() {
  const allArtworks = useArtworksStore((state) => state.artworks);
  const flaggedArtworks = useArtworksStore((state) => state.flaggedArtworks);
  const approveArtwork = useArtworksStore((state) => state.approveArtwork);
  const removeArtwork = useArtworksStore((state) => state.removeArtwork);
  const tableData = useMemo(() => {
    return flaggedArtworks
      .map((flagged) => {
        const artwork = allArtworks.find((art) => art.id === flagged.artworkId);
        if (!artwork) return null;
        return {
          ...flagged,
          artwork,
        };
      })
      .filter(Boolean);
  }, [flaggedArtworks, allArtworks]);
  const handleApprove = (artworkId: string, title: string) => {
    approveArtwork(artworkId);
    toast.success(`Artwork "${title}" has been approved.`);
  };
  const handleRemove = (artworkId: string, title: string) => {
    removeArtwork(artworkId);
    toast.error(`Artwork "${title}" has been removed.`);
  };
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Artwork</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.length > 0 ? (
            tableData.map((item) => (
              <TableRow key={item.artworkId}>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.artwork.imageUrl}
                      alt={item.artwork.title}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div>
                      <Link to={`/art/${item.artwork.id}`} className="font-medium hover:underline">
                        {item.artwork.title}
                      </Link>
                      <div className="text-sm text-muted-foreground truncate">
                        {item.artwork.tags.join(', ')}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Link to={`/profile/${item.artwork.artist.username}`} className="flex items-center space-x-2 hover:underline">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.artwork.artist.avatarUrl} />
                      <AvatarFallback>{item.artwork.artist.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{item.artwork.artist.username}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.reason}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-500 hover:text-green-600"
                    onClick={() => handleApprove(item.artworkId, item.artwork.title)}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRemove(item.artworkId, item.artwork.title)}
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No flagged content to review.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}