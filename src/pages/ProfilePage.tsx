import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export function ProfilePage() {
  const { username } = useParams();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <Card>
          <CardHeader>
            <CardTitle>User Profile Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is the placeholder profile page for user: <strong>{username}</strong>.</p>
            <p>Full implementation will be in Phase 3.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}