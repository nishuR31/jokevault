import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JokeSidebar = ({ joke, onTextToSpeech, onFontSizeChange, onReport }) => {
  const [fontSize, setFontSize] = useState('default');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTextToSpeech = () => {
    setIsPlaying(!isPlaying);
    onTextToSpeech(!isPlaying);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    onFontSizeChange(size);
  };

  const StatItem = ({ icon, label, value, color = "text-muted-foreground" }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        <Icon name={icon} size={16} className={color} />
        <span className="font-inter text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="font-inter font-medium text-foreground">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Joke Statistics */}
      <div className="glassmorphic-card rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h4 className="font-poppins font-semibold text-foreground">Statistics</h4>
        </div>
        
        <div className="space-y-1">
          <StatItem
            icon="Eye"
            label="Views"
            value={joke?.views?.toLocaleString()}
          />
          <StatItem
            icon="Star"
            label="Average Rating"
            value={`${joke?.averageRating}/5`}
            color="text-warning"
          />
          <StatItem
            icon="MessageSquare"
            label="Comments"
            value={joke?.commentCount}
          />
          <StatItem
            icon="Heart"
            label="Bookmarks"
            value={joke?.bookmarkCount}
            color="text-destructive"
          />
          <StatItem
            icon="Share2"
            label="Shares"
            value={joke?.shareCount}
          />
          <StatItem
            icon="TrendingUp"
            label="Popularity"
            value={`${joke?.popularityScore}/100`}
            color="text-success"
          />
        </div>
      </div>
      {/* Accessibility Tools */}
      <div className="glassmorphic-card rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Accessibility" size={20} className="text-primary" />
          <h4 className="font-poppins font-semibold text-foreground">Accessibility</h4>
        </div>
        
        <div className="space-y-3">
          {/* Text to Speech */}
          <Button
            variant="ghost"
            fullWidth
            onClick={handleTextToSpeech}
            iconName={isPlaying ? "Pause" : "Play"}
            iconPosition="left"
            className="justify-start"
          >
            {isPlaying ? 'Pause Audio' : 'Listen to Joke'}
          </Button>

          {/* Font Size Controls */}
          <div>
            <span className="font-inter text-sm text-muted-foreground mb-2 block">
              Font Size
            </span>
            <div className="flex items-center space-x-1">
              <Button
                variant={fontSize === 'small' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleFontSizeChange('small')}
                className="text-xs"
              >
                A
              </Button>
              <Button
                variant={fontSize === 'default' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleFontSizeChange('default')}
                className="text-sm"
              >
                A
              </Button>
              <Button
                variant={fontSize === 'large' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleFontSizeChange('large')}
                className="text-base"
              >
                A
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Submission Info */}
      {joke?.contributor && (
        <div className="glassmorphic-card rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="User" size={20} className="text-primary" />
            <h4 className="font-poppins font-semibold text-foreground">Contributor</h4>
          </div>
          
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 glassmorphic rounded-full overflow-hidden">
              <img
                src={joke?.contributor?.avatar}
                alt={joke?.contributor?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-inter font-medium text-foreground">
                {joke?.contributor?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {joke?.contributor?.reputation} reputation
              </p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} />
              <span>Submitted: {joke?.submissionDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={14} />
              <span>{joke?.contributor?.totalJokes} jokes contributed</span>
            </div>
          </div>

          <Link to={`/user-profile/${joke?.contributor?.id}`}>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              className="mt-3"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View Profile
            </Button>
          </Link>
        </div>
      )}
      {/* Quick Actions */}
      <div className="glassmorphic-card rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Settings" size={20} className="text-primary" />
          <h4 className="font-poppins font-semibold text-foreground">Actions</h4>
        </div>
        
        <div className="space-y-2">
          <Button
            variant="ghost"
            fullWidth
            iconName="Flag"
            iconPosition="left"
            className="justify-start text-muted-foreground hover:text-destructive"
            onClick={onReport}
          >
            Report Content
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            iconName="Download"
            iconPosition="left"
            className="justify-start"
          >
            Save as Image
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            iconName="Printer"
            iconPosition="left"
            className="justify-start"
          >
            Print Joke
          </Button>
        </div>
      </div>
      {/* Navigation */}
      <div className="glassmorphic-card rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Navigation" size={20} className="text-primary" />
          <h4 className="font-poppins font-semibold text-foreground">Navigate</h4>
        </div>
        
        <div className="space-y-2">
          <Link to="/category-explorer">
            <Button
              variant="ghost"
              fullWidth
              iconName="Compass"
              iconPosition="left"
              className="justify-start"
            >
              Browse Categories
            </Button>
          </Link>
          
          <Link to="/search-discovery">
            <Button
              variant="ghost"
              fullWidth
              iconName="Search"
              iconPosition="left"
              className="justify-start"
            >
              Search Jokes
            </Button>
          </Link>
          
          <Link to="/user-dashboard">
            <Button
              variant="ghost"
              fullWidth
              iconName="User"
              iconPosition="left"
              className="justify-start"
            >
              My Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JokeSidebar;