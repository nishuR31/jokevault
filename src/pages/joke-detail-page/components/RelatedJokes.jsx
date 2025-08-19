import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedJokes = ({ jokes, onJokeClick }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef?.current?.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef?.current?.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const JokeCard = ({ joke }) => (
    <div
      onClick={() => onJokeClick(joke?.id)}
      className="flex-shrink-0 w-80 glassmorphic-card rounded-xl p-4 hover-lift comedy-timing cursor-pointer"
    >
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-8 h-8 glassmorphic rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="Smile" size={16} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-poppins font-semibold text-foreground text-sm mb-1 line-clamp-2">
            {joke?.title}
          </h4>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>{joke?.category}</span>
            <span>•</span>
            <span>{joke?.readingTime} min</span>
          </div>
        </div>
      </div>

      <p className="font-inter text-sm text-foreground leading-relaxed mb-4 line-clamp-3">
        {joke?.preview}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-xs text-muted-foreground">{joke?.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{joke?.views}</span>
          </div>
        </div>

        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          joke?.contentRating === 'SFW' ?'bg-success/20 text-success' :'bg-warning/20 text-warning'
        }`}>
          {joke?.contentRating}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {joke?.tags?.slice(0, 3)?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="glassmorphic-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Zap" size={24} className="text-primary" />
          <h3 className="font-poppins font-bold text-xl text-foreground">
            Related Jokes
          </h3>
          <span className="px-2 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30">
            AI Powered
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollLeft}
            iconName="ChevronLeft"
            className="w-8 h-8 p-0"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollRight}
            iconName="ChevronRight"
            className="w-8 h-8 p-0"
          />
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {jokes?.map((joke) => (
          <JokeCard key={joke?.id} joke={joke} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-6">
        <Link to="/category-explorer">
          <Button
            variant="outline"
            iconName="Compass"
            iconPosition="left"
          >
            Explore More Jokes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedJokes;