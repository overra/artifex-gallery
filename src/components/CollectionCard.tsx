import { Link } from 'react-router-dom';
import { Collection, mockArtworks } from '@/lib/mock-data';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
interface CollectionCardProps {
  collection: Collection;
}
export function CollectionCard({ collection }: CollectionCardProps) {
  const artworksInCollection = collection.artworkIds
    .map(id => mockArtworks.find(art => art.id === id))
    .filter((art): art is NonNullable<typeof art> => art !== undefined);
  const previewImages = artworksInCollection.slice(0, 4);
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Link to={`/collection/${collection.id}`} className="block">
        <Card className="overflow-hidden h-full flex flex-col">
          <CardContent className="p-2 flex-grow">
            {previewImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-1 aspect-square">
                {previewImages.map((art, index) => (
                  <div key={art.id} className={`bg-muted ${previewImages.length === 1 ? 'col-span-2' : ''} ${previewImages.length === 2 && index === 0 ? 'col-span-2' : ''} ${previewImages.length === 3 && index === 0 ? 'col-span-2' : ''}`}>
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-square bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Empty Collection</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 bg-muted/50">
            <h3 className="font-bold truncate">{collection.name}</h3>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}