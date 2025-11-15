import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminStats } from '@/components/admin/AdminStats';
import { FlaggedContentTable } from '@/components/admin/FlaggedContentTable';
export function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="flex items-center mb-8">
          <Shield className="h-10 w-10 text-primary mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Oversee community health and manage content.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <AdminStats />
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <FlaggedContentTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}