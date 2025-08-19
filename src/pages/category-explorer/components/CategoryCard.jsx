import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategoryCard = ({ category, index }) => {
  const getDelayClass = (index) => {
    return `stagger-fade-in`;
  };

  const getMoodIcon = (mood) => {
    const moodIcons = {
      'funny': 'Smile',
      'witty': 'Lightbulb',
      'silly': 'Laugh',
      'clever': 'Brain',
      'sarcastic': 'Zap',
      'wholesome': 'Heart',
      'dark': 'Moon',
      'NSFW': 'Moon',
      'random': 'Shuffle'
    };
    return moodIcons?.[mood] || 'Tag';
  };

  return (
    <div 
      className={`glassmorphic-card rounded-xl p-6 hover-lift comedy-timing ${getDelayClass(index)}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg glassmorphic">
            <Icon 
              name={getMoodIcon(category?.mood)} 
              size={24} 
              className="text-primary" 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-poppins text-foreground">
              {category?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category?.jokeCount} jokes
            </p>
          </div>
        </div>
        
        {category?.trending && (
          <div className="flex items-center px-2 py-1 space-x-1 rounded-full bg-gradient-to-r from-primary to-secondary">
            <Icon name="TrendingUp" size={14} className="text-white" />
            <span className="text-xs font-medium text-white">Trending</span>
          </div>
        )}
      </div>
      <div className="mb-4">
        <p className="mb-2 text-sm text-muted-foreground">Preview:</p>
        <div className="p-3 border rounded-lg bg-muted/20 border-border">
          <p className="text-sm leading-relaxed text-foreground font-inter">
            {category?.previewJoke}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="fill-current text-warning" />
            <span>{category?.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{category?.avgReadTime}</span>
          </div>
          {category?.isNSFW && (
            <div className="px-2 py-1 rounded-full bg-destructive/20 text-destructive">
              <span className="text-xs font-medium">18+</span>
            </div>
          )}
        </div>
        
        <Link 
          to={`/category-explorer?category=${category?.slug}`}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 comedy-timing"
        >
          <span className="text-sm font-medium">Explore</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;