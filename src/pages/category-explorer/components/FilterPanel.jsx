import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onClearFilters, isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState('mood');

  const moodOptions = [
    { id: 'funny', label: 'Funny', icon: 'Smile', color: 'text-yellow-400' },
    { id: 'witty', label: 'Witty', icon: 'Lightbulb', color: 'text-blue-400' },
    { id: 'silly', label: 'Silly', icon: 'Laugh', color: 'text-pink-400' },
    { id: 'clever', label: 'Clever', icon: 'Brain', color: 'text-purple-400' },
    { id: 'sarcastic', label: 'Sarcastic', icon: 'Zap', color: 'text-orange-400' },
    { id: 'wholesome', label: 'Wholesome', icon: 'Heart', color: 'text-green-400' },
    { id: 'dark', label: 'Dark', icon: 'Moon', color: 'text-gray-400' },
    { id: 'NSFW', label: 'Dark', icon: 'Moon', color: 'text-red-400' },
    { id: 'random', label: 'Random', icon: 'Shuffle', color: 'text-indigo-400' }
  ];

  const lengthOptions = [
    { id: 'quick', label: 'Quick Laughs', description: 'Under 50 words', icon: 'Zap' },
    { id: 'medium', label: 'Story Jokes', description: '50-150 words', icon: 'BookOpen' },
    { id: 'long', label: 'One-Liners', description: 'Single sentence', icon: 'MessageCircle' }
  ];

  const popularityOptions = [
    { id: 'trending', label: 'Trending Now', icon: 'TrendingUp' },
    { id: 'popular', label: 'Most Popular', icon: 'Star' },
    { id: 'newest', label: 'Newest First', icon: 'Clock' },
    { id: 'highest-rated', label: 'Highest Rated', icon: 'Award' }
  ];

  const tabs = [
    { id: 'mood', label: 'Mood', icon: 'Smile' },
    { id: 'length', label: 'Length', icon: 'AlignLeft' },
    { id: 'popularity', label: 'Sort', icon: 'Filter' },
    { id: 'content', label: 'Content', icon: 'Shield' }
  ];

  const handleMoodToggle = (moodId) => {
    const currentMoods = filters?.moods || [];
    const newMoods = currentMoods?.includes(moodId)
      ? currentMoods?.filter(m => m !== moodId)
      : [...currentMoods, moodId];
    onFilterChange({ ...filters, moods: newMoods });
  };

  const handleLengthChange = (lengthId) => {
    onFilterChange({ ...filters, length: lengthId });
  };

  const handlePopularityChange = (popularityId) => {
    onFilterChange({ ...filters, sortBy: popularityId });
  };

  const handleContentRatingToggle = (rating) => {
    onFilterChange({ ...filters, contentRating: rating });
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="mb-4 md:hidden">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName={isOpen ? "X" : "Filter"}
          iconPosition="left"
          fullWidth
        >
          {isOpen ? 'Close Filters' : 'Show Filters'}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`glassmorphic-card rounded-xl p-6 comedy-timing ${
        isOpen ? 'block' : 'hidden md:block'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold font-poppins text-foreground">
            Filters
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex p-1 mb-6 space-x-1 rounded-lg bg-muted/20">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md comedy-timing text-sm font-medium ${
                activeTab === tab?.id
                  ? 'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Filter Content */}
        <div className="space-y-6">
          {/* Mood Filters */}
          {activeTab === 'mood' && (
            <div>
              <h4 className="mb-3 font-medium text-foreground">Select Mood</h4>
              <div className="grid grid-cols-2 gap-2">
                {moodOptions?.map((mood) => (
                  <button
                    key={mood?.id}
                    onClick={() => handleMoodToggle(mood?.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border comedy-timing ${
                      filters?.moods?.includes(mood?.id)
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={mood?.icon} size={18} className={mood?.color} />
                    <span className="text-sm font-medium">{mood?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Length Filters */}
          {activeTab === 'length' && (
            <div>
              <h4 className="mb-3 font-medium text-foreground">Joke Length</h4>
              <div className="space-y-2">
                {lengthOptions?.map((length) => (
                  <button
                    key={length.id}
                    onClick={() => handleLengthChange(length.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border comedy-timing text-left ${
                      filters?.length === length.id
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={length.icon} size={18} />
                    <div>
                      <div className="font-medium">{length.label}</div>
                      <div className="text-xs opacity-70">{length.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popularity Filters */}
          {activeTab === 'popularity' && (
            <div>
              <h4 className="mb-3 font-medium text-foreground">Sort By</h4>
              <div className="space-y-2">
                {popularityOptions?.map((option) => (
                  <button
                    key={option?.id}
                    onClick={() => handlePopularityChange(option?.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border comedy-timing text-left ${
                      filters?.sortBy === option?.id
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={option?.icon} size={18} />
                    <span className="font-medium">{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content Rating */}
          {activeTab === 'content' && (
            <div>
              <h4 className="mb-3 font-medium text-foreground">Content Rating</h4>
              <div className="space-y-3">
                <button
                  onClick={() => handleContentRatingToggle('sfw')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border comedy-timing ${
                    filters?.contentRating === 'sfw' ?'border-success bg-success/10 text-success' :'border-border hover:border-success/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Shield" size={20} />
                    <div className="text-left">
                      <div className="font-medium">Safe for Work</div>
                      <div className="text-xs opacity-70">Family-friendly content only</div>
                    </div>
                  </div>
                  {filters?.contentRating === 'sfw' && (
                    <Icon name="Check" size={20} />
                  )}
                </button>

                <button
                  onClick={() => handleContentRatingToggle('nsfw')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border comedy-timing ${
                    filters?.contentRating === 'nsfw' ?'border-destructive bg-destructive/10 text-destructive' :'border-border hover:border-destructive/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="AlertTriangle" size={20} />
                    <div className="text-left">
                      <div className="font-medium">Adult Content (18+)</div>
                      <div className="text-xs opacity-70">May contain mature themes</div>
                    </div>
                  </div>
                  {filters?.contentRating === 'nsfw' && (
                    <Icon name="Check" size={20} />
                  )}
                </button>

                <button
                  onClick={() => handleContentRatingToggle('all')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border comedy-timing ${
                    filters?.contentRating === 'all' ?'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Globe" size={20} />
                    <div className="text-left">
                      <div className="font-medium">All Content</div>
                      <div className="text-xs opacity-70">Show everything</div>
                    </div>
                  </div>
                  {filters?.contentRating === 'all' && (
                    <Icon name="Check" size={20} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterPanel;