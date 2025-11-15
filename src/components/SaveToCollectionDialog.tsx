import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PlusCircle, Bookmark, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useAuthStore } from '@/store/auth';
interface SaveToCollectionDialogProps {
  artworkId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const newCollectionSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50),
});
type NewCollectionFormValues = z.infer<typeof newCollectionSchema>;
export function SaveToCollectionDialog({ artworkId, open, onOpenChange }: SaveToCollectionDialogProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const createCollection = useAuthStore((state) => state.createCollection);
  const addArtworkToCollection = useAuthStore((state) => state.addArtworkToCollection);
  const [showNewCollectionForm, setShowNewCollectionForm] = useState(false);
  const form = useForm<NewCollectionFormValues>({
    resolver: zodResolver(newCollectionSchema),
    defaultValues: { name: '' },
  });
  const handleSave = (collectionId: string) => {
    addArtworkToCollection(collectionId, artworkId);
    toast.success('Artwork saved to collection!');
    onOpenChange(false);
  };
  const handleCreateCollection = (data: NewCollectionFormValues) => {
    const newCollectionId = createCollection(data.name);
    if (newCollectionId) {
      addArtworkToCollection(newCollectionId, artworkId);
      toast.success(`Artwork saved to new collection "${data.name}"!`);
      form.reset();
      setShowNewCollectionForm(false);
      onOpenChange(false);
    } else {
      toast.error('Failed to create collection.');
    }
  };
  if (!currentUser?.collections) {
    // This dialog should not be opened if user is not logged in, but this is a safeguard.
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save to Collection</DialogTitle>
          <DialogDescription>Add this artwork to one of your collections or create a new one.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ScrollArea className="h-48 pr-4">
            <div className="space-y-2">
              {currentUser.collections.map((collection) => {
                const isSaved = collection.artworkIds.includes(artworkId);
                return (
                  <Button
                    key={collection.id}
                    variant={isSaved ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => !isSaved && handleSave(collection.id)}
                    disabled={isSaved}
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    {collection.name}
                    {isSaved && <span className="ml-auto text-xs text-muted-foreground">Saved</span>}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
          <Separator className="my-4" />
          {showNewCollectionForm ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateCollection)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="e.g., Cyberpunk Landscapes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="sm:justify-start">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create & Save
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowNewCollectionForm(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setShowNewCollectionForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Collection
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}