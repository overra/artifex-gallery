import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Sparkles, UploadCloud } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuthStore } from '@/store/auth';
import { useArtworksStore } from '@/store/artworks';
import { Artwork } from '@/lib/mock-data';
interface UploadSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const uploadSchema = z.object({
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }).max(1000),
  tags: z.string().regex(/^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/, { message: 'Tags must be comma-separated words.' }),
});
type UploadFormValues = z.infer<typeof uploadSchema>;
export function UploadSheet({ open, onOpenChange }: UploadSheetProps) {
  const [isModerating, setIsModerating] = useState(false);
  const currentUserForUpload = useAuthStore((state) => state.currentUser); // Need the whole object for submission
  const addArtwork = useArtworksStore((state) => state.addArtwork);
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      imageUrl: '',
      title: '',
      description: '',
      tags: '',
    },
  });
  const onSubmit = async (data: UploadFormValues) => {
    if (!currentUserForUpload) {
      toast.error('You must be logged in to upload art.');
      return;
    }
    setIsModerating(true);
    toast.info('Submitting for AI moderation...', {
      icon: <Sparkles className="h-4 w-4" />,
    });
    // Simulate AI moderation delay
    await new Promise((resolve) => setTimeout(resolve, 2500));
    // Simulate a random moderation outcome
    const isApproved = Math.random() > 0.1; // 90% chance of approval
    setIsModerating(false);
    if (isApproved) {
      const newArtwork: Artwork = {
        id: `art-${Date.now()}`,
        title: data.title,
        imageUrl: data.imageUrl,
        artist: currentUserForUpload,
        description: data.description,
        tags: data.tags.split(',').map(tag => tag.trim()),
        comments: [],
        likes: 0,
      };
      addArtwork(newArtwork);
      toast.success('Your artwork has been approved and published!');
      form.reset();
      onOpenChange(false);
    } else {
      toast.error('Moderation failed. Your artwork could not be published.');
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle className="flex items-center text-2xl font-display">
            <UploadCloud className="mr-2 h-6 w-6 text-primary" />
            Upload Your Creation
          </SheetTitle>
          <SheetDescription>
            Share your AI-generated masterpiece with the community. Fill out the details below.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://images.unsplash.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cosmic Leviathan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your artwork, the prompt, or the model used..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="space,leviathan,cosmic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit" disabled={isModerating} className="w-full">
                {isModerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Moderating...
                  </>
                ) : (
                  'Submit for Review'
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}