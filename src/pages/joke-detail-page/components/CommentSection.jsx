import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentSection = ({ comments, onAddComment, onReplyComment, onLikeComment }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = () => {
    if (newComment?.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (commentId) => {
    if (replyText?.trim()) {
      onReplyComment(commentId, replyText);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'ml-12' : ''} mb-6`}>
      <div className="glassmorphic-card rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 glassmorphic rounded-full overflow-hidden flex-shrink-0">
            <img
              src={comment?.avatar}
              alt={comment?.author}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-inter font-medium text-foreground">
                {comment?.author}
              </span>
              {comment?.reputation && (
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                  {comment?.reputation} rep
                </span>
              )}
              <span className="text-muted-foreground text-sm">
                {comment?.timestamp}
              </span>
            </div>
            
            <p className="font-inter text-foreground mb-3 leading-relaxed">
              {comment?.content}
            </p>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onLikeComment(comment?.id)}
                className="flex items-center space-x-1 text-muted-foreground hover:text-primary comedy-timing"
              >
                <Icon
                  name="ThumbsUp"
                  size={16}
                  className={comment?.isLiked ? 'text-primary fill-current' : ''}
                />
                <span className="text-sm">{comment?.likes}</span>
              </button>
              
              {!isReply && (
                <button
                  onClick={() => setReplyingTo(comment?.id)}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-primary comedy-timing"
                >
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm">Reply</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Reply Form */}
      {replyingTo === comment?.id && (
        <div className="ml-12 mt-3">
          <div className="glassmorphic-card rounded-xl p-4">
            <Input
              type="text"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e?.target?.value)}
              className="mb-3"
            />
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleSubmitReply(comment?.id)}
                disabled={!replyText?.trim()}
              >
                Reply
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyText('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Nested Replies */}
      {comment?.replies && comment?.replies?.map((reply) => (
        <div key={reply?.id} className="mt-3">
          <CommentItem comment={reply} isReply={true} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="glassmorphic-card rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="MessageSquare" size={24} className="text-primary" />
        <h3 className="font-poppins font-bold text-xl text-foreground">
          Comments ({comments?.length})
        </h3>
      </div>
      {/* Add Comment Form */}
      <div className="mb-8">
        <div className="glassmorphic-card rounded-xl p-4">
          <Input
            type="text"
            placeholder="Share your thoughts about this joke..."
            value={newComment}
            onChange={(e) => setNewComment(e?.target?.value)}
            className="mb-3"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <Icon name="Info" size={16} />
              <span>Be respectful and keep it fun!</span>
            </div>
            <Button
              variant="default"
              onClick={handleSubmitComment}
              disabled={!newComment?.trim()}
              iconName="Send"
              iconPosition="right"
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>
      {/* Comments List */}
      <div className="space-y-4">
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <CommentItem key={comment?.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-inter">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;