import { Shield, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-12 w-12 text-primary mr-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
        </div>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="h-5 w-5 mr-2" />
              Under Construction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This section is reserved for site administrators. Features for managing flagged content,
              reviewing user reports, and viewing site analytics are coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}