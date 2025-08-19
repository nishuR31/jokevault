import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsSection = ({ recommendations }) => {
  const handleLike = (jokeId) => {
    console.log('Liked joke:', jokeId);
  };

  const handleSave = (jokeId) => {
    console.log('Saved joke:', jokeId);
  };

  const handleShare = (jokeId) => {
    console.log('Shared joke:', jokeId);
  };

  return (
    <div className="glassmorphic-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-poppins font-bold text-foreground">Jokes You'll Love</h2>
            <p className="text-sm text-muted-foreground">Personalized recommendations just for you</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
          Refresh
        </Button>
      </div>
      <div className="space-y-4">
        {recommendations?.map((joke) => (
          <div key={joke?.id} className="group bg-muted/10 rounded-xl p-4 border border-border hover:border-primary/30 comedy-timing hover-lift">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {joke?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} className="text-success" />
                  <span className="text-xs text-success font-medium">{joke?.matchScore}% match</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-xs text-muted-foreground">{joke?.rating}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-foreground leading-relaxed">{joke?.content}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(joke?.id)}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-red-500 comedy-timing"
                >
                  <Icon name="Heart" size={16} className={joke?.isLiked ? "text-red-500 fill-current" : ""} />
                  <span className="text-sm">{joke?.likes}</span>
                </button>
                
                <button
                  onClick={() => handleSave(joke?.id)}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-primary comedy-timing"
                >
                  <Icon name="Bookmark" size={16} className={joke?.isSaved ? "text-primary fill-current" : ""} />
                  <span className="text-sm">Save</span>
                </button>
                
                <button
                  onClick={() => handleShare(joke?.id)}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-secondary comedy-timing"
                >
                  <Icon name="Share2" size={16} />
                  <span className="text-sm">Share</span>
                </button>
              </div>

              <Link 
                to={`/joke-detail-page/${joke?.id}`}
                className="text-sm text-primary hover:text-primary/80 comedy-timing"
              >
                View Details →
              </Link>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <Icon name="Info" size={12} className="inline mr-1" />
                Recommended because you liked {joke?.reasonTag} jokes
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to="/search-discovery">
          <Button variant="outline" iconName="ArrowRight" iconPosition="right">
            Discover More Jokes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecommendationsSection;