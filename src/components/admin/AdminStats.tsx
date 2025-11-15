import { Users, Image, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useArtworksStore } from '@/store/artworks';
import { mockUsers } from '@/lib/mock-data';
export function AdminStats() {
  const totalArtworks = useArtworksStore((state) => state.artworks.length);
  const flaggedCount = useArtworksStore((state) => state.flaggedArtworks.length);
  const totalUsers = mockUsers.length;
  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Total Artworks',
      value: totalArtworks,
      icon: Image,
      color: 'text-green-500',
    },
    {
      title: 'Flagged Content',
      value: flaggedCount,
      icon: ShieldAlert,
      color: 'text-red-500',
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}