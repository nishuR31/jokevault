import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const SearchResults = ({ results, isLoading, searchQuery, onSaveJoke, onShareJoke }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="glassmorphic-card rounded-xl p-6 border border-border animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted/30 rounded w-3/4"></div>
                <div className="h-3 bg-muted/20 rounded w-1/2"></div>
              </div>
              <div className="h-8 w-16 bg-muted/30 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted/20 rounded w-full"></div>
              <div className="h-3 bg-muted/20 rounded w-5/6"></div>
              <div className="h-3 bg-muted/20 rounded w-4/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results?.length === 0 && searchQuery) {
    return (
      <div className="text-center py-16">
        <div className="glassmorphic-card rounded-xl p-8 border border-border max-w-md mx-auto">
          <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">
            No jokes found
          </h3>
          <p className="text-muted-foreground mb-6">
            We couldn't find any jokes matching "{searchQuery}". Try different keywords or browse our categories.
          </p>
          <Link to="/category-explorer">
            <Button variant="default">
              <Icon name="Compass" size={16} className="mr-2" />
              Explore Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {searchQuery && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-poppins font-semibold text-foreground">
            Search Results for "{searchQuery}"
          </h2>
          <span className="text-sm text-muted-foreground">
            {results?.length} jokes found
          </span>
        </div>
      )}
      <div className="space-y-4">
        {results?.map((joke) => (
          <div key={joke?.id} className="glassmorphic-card rounded-xl p-6 border border-border hover-lift comedy-timing">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-inter text-muted-foreground">
                    Relevance: {joke?.relevanceScore}%
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm text-muted-foreground">{joke?.rating}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {joke?.tags?.slice(0, 2)?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-inter"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-foreground font-inter leading-relaxed">
                {joke?.content?.length > 200 
                  ? `${joke?.content?.substring(0, 200)}...` 
                  : joke?.content
                }
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} />
                  <span>{joke?.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={14} />
                  <span>{joke?.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Share" size={14} />
                  <span>{joke?.shares}</span>
                </div>
                <span>•</span>
                <span>{joke?.timeAgo}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSaveJoke(joke?.id)}
                  className="rounded-lg"
                >
                  <Icon name={joke?.isSaved ? "BookmarkCheck" : "Bookmark"} size={16} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onShareJoke(joke?.id)}
                  className="rounded-lg"
                >
                  <Icon name="Share2" size={16} />
                </Button>
                
                <Link to={`/joke-detail-page?id=${joke?.id}`}>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;