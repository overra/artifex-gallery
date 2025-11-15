import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UploadCloud } from 'lucide-react';
export function UploadPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 text-center flex flex-col items-center">
        <UploadCloud className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-display font-bold">Upload Artwork</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Artwork uploads are handled through our upload panel, which you can access from the header.
        </p>
        <Button onClick={() => navigate('/')} className="mt-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Button>
      </div>
    </div>
  );
}