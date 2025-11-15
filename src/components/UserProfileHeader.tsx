import { User } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
interface UserProfileHeaderProps {
  user: User;
}
export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const currentUserId = useAuthStore((state) => state.currentUser?.id);
  const currentUserFollowingIds = useAuthStore((state) => state.currentUser?.followingIds ?? []);
  const toggleFollow = useAuthStore((state) => state.toggleFollow);
  const isFollowing = currentUserFollowingIds.includes(user.id);
  const isOwnProfile = currentUserId === user.id;
  const handleFollowClick = () => {
    if (!currentUserId) {
      toast.error("Please log in to follow users.");
      return;
    }
    toggleFollow(user.id);
  };
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
          {!isOwnProfile && (
            <Button onClick={handleFollowClick} variant={isFollowing ? 'secondary' : 'default'}>
              {isFollowing ? (
                <>
                  <UserCheck className="mr-2 h-4 w-4" /> Following
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" /> Follow
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}