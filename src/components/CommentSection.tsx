import { useState } from 'react';
import { Comment } from '@/lib/mock-data';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommentItem } from './CommentItem';
import { Separator } from './ui/separator';
interface CommentSectionProps {
  initialComments: Comment[];
}
export function CommentSection({ initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const currentUser = useAuthStore((state) => state.currentUser);
  const login = useAuthStore((state) => state.login);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;
    const commentToAdd: Comment = {
      id: `comment-${Date.now()}`,
      text: newComment.trim(),
      author: currentUser,
      createdAt: new Date().toISOString(),
    };
    setComments([commentToAdd, ...comments]);
    setNewComment('');
  };
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">{comments.length} Comments</h3>
      {currentUser ? (
        <form onSubmit={handleSubmit} className="flex items-start space-x-4 mb-8">
          <Avatar>
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.username} />
            <AvatarFallback>{currentUser.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="mb-2"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={!newComment.trim()}>Post Comment</Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center p-4 border rounded-lg bg-muted mb-8">
          <p className="text-muted-foreground mb-2">You must be logged in to comment.</p>
          <Button onClick={login}>Login</Button>
        </div>
      )}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <CommentItem comment={comment} />
            {index < comments.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}