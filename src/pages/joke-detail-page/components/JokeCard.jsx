import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JokeCard = ({ joke, onRate, onBookmark, onShare }) => {
  const [currentRating, setCurrentRating] = useState(joke?.userRating || 0);
  const [isBookmarked, setIsBookmarked] = useState(joke?.isBookmarked || false);
  const [showFullJoke, setShowFullJoke] = useState(false);

  const handleRating = (rating) => {
    setCurrentRating(rating);
    onRate(rating);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(!isBookmarked);
  };

  const handleShare = (platform) => {
    onShare(platform);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        onClick={() => handleRating(index + 1)}
        className="comedy-timing hover:scale-110"
      >
        <Icon
          name="Star"
          size={24}
          className={`${
            index < currentRating
              ? 'text-warning fill-current' :'text-muted-foreground hover:text-warning'
          } comedy-timing`}
        />
      </button>
    ));
  };

  const truncatedContent = joke?.content?.length > 300 
    ? joke?.content?.substring(0, 300) + '...' 
    : joke?.content;

  return (
    <div className="glassmorphic-card rounded-2xl p-8 max-w-4xl mx-auto hover-lift">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 glassmorphic rounded-xl flex items-center justify-center">
            <Icon name="Smile" size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="font-poppins font-bold text-2xl text-foreground">
              {joke?.title}
            </h1>
            <p className="text-muted-foreground font-inter">
              {joke?.category} • {joke?.readingTime} min read
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {joke?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 glassmorphic rounded-full text-sm font-inter text-primary border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Content Rating Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full text-sm font-inter font-medium ${
            joke?.contentRating === 'SFW' ?'bg-success/20 text-success border border-success/30' :'bg-warning/20 text-warning border border-warning/30'
          }`}>
            {joke?.contentRating}
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Eye" size={16} />
            <span className="text-sm font-inter">{joke?.views?.toLocaleString()} views</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="TrendingUp" size={16} />
            <span className="text-sm font-inter">Popularity: {joke?.popularityScore}/100</span>
          </div>
        </div>
      </div>
      {/* Joke Content */}
      <div className="mb-8">
        <div className="prose prose-invert max-w-none">
          <p className="font-inter text-lg leading-relaxed text-foreground">
            {showFullJoke ? joke?.content : truncatedContent}
          </p>
        </div>
        
        {joke?.content?.length > 300 && (
          <Button
            variant="ghost"
            onClick={() => setShowFullJoke(!showFullJoke)}
            className="mt-4"
            iconName={showFullJoke ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showFullJoke ? 'Show Less' : 'Read More'}
          </Button>
        )}
      </div>
      {/* Rating System */}
      <div className="flex items-center justify-between mb-6 p-4 glassmorphic rounded-xl">
        <div className="flex items-center space-x-4">
          <span className="font-inter font-medium text-foreground">Rate this joke:</span>
          <div className="flex items-center space-x-1">
            {renderStars()}
          </div>
          <span className="text-muted-foreground font-inter text-sm">
            ({joke?.totalRatings} ratings)
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className="p-2 glassmorphic rounded-lg hover-lift comedy-timing micro-bounce"
          >
            <Icon
              name="Heart"
              size={20}
              className={`${
                isBookmarked
                  ? 'text-destructive fill-current' :'text-muted-foreground hover:text-destructive'
              } comedy-timing`}
            />
          </button>

          {/* Share Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 glassmorphic rounded-lg hover-lift comedy-timing"
            >
              <Icon name="Twitter" size={20} className="text-muted-foreground hover:text-primary" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 glassmorphic rounded-lg hover-lift comedy-timing"
            >
              <Icon name="Facebook" size={20} className="text-muted-foreground hover:text-primary" />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="p-2 glassmorphic rounded-lg hover-lift comedy-timing"
            >
              <Icon name="Copy" size={20} className="text-muted-foreground hover:text-primary" />
            </button>
          </div>
        </div>
      </div>
      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-muted-foreground font-inter">
        <div className="flex items-center space-x-4">
          <span>Submitted: {joke?.submissionDate}</span>
          {joke?.contributor && (
            <span>By: {joke?.contributor}</span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Flag"
          iconPosition="left"
          className="text-muted-foreground hover:text-destructive"
        >
          Report
        </Button>
      </div>
    </div>
  );
};

export default JokeCard;