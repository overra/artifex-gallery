import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment } from '@/lib/mock-data';
import { Link } from 'react-router-dom';
interface CommentItemProps {
  comment: Comment;
}
export function CommentItem({ comment }: CommentItemProps) {
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
  return (
    <div className="flex items-start space-x-4 py-4">
      <Link to={`/profile/${comment.author.username}`}>
        <Avatar>
          <AvatarImage src={comment.author.avatarUrl} alt={comment.author.username} />
          <AvatarFallback>{comment.author.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <Link to={`/profile/${comment.author.username}`} className="font-semibold text-sm hover:underline">
            {comment.author.username}
          </Link>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
        <p className="text-sm text-foreground mt-1">{comment.text}</p>
      </div>
    </div>
  );
}