import { User } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
interface UserProfileHeaderProps {
  user: User;
}
export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
      <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background ring-2 ring-primary">
        <AvatarImage src={user.avatarUrl} alt={user.username} />
        <AvatarFallback className="text-4xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center md:items-start flex-1">
        <h1 className="text-3xl md:text-4xl font-display font-bold">{user.username}</h1>
        <div className="flex items-center space-x-6 mt-2 text-muted-foreground">
          <div className="text-center">
            <span className="font-bold text-foreground">1.2k</span> Followers
          </div>
          <div className="text-center">
            <span className="font-bold text-foreground">480</span> Following
          </div>
          <div className="text-center">
            <span className="font-bold text-foreground">8.9k</span> Likes
          </div>
        </div>
        <div className="mt-4">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Follow
          </Button>
        </div>
      </div>
    </div>
  );
}