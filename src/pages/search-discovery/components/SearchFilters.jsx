import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchFilters = ({ filters, onFiltersChange, onSerendipityMode }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'dad-jokes', label: 'Dad Jokes' },
    { value: 'programming', label: 'Programming' },
    { value: 'office', label: 'Office Humor' },
    { value: 'puns', label: 'Puns' },
    { value: 'one-liners', label: 'One-liners' },
    { value: 'observational', label: 'Observational' }
  ];

  const moodOptions = [
    { value: 'any', label: 'Any Mood' },
    { value: 'happy', label: '😊 Happy' },
    { value: 'silly', label: '🤪 Silly' },
    { value: 'clever', label: '🧠 Clever' },
    { value: 'sarcastic', label: '😏 Sarcastic' },
    { value: 'wholesome', label: '🥰 Wholesome' }
  ];

  const freshnessOptions = [
    { value: 'any', label: 'Any Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const lengthOptions = [
    { value: 'any', label: 'Any Length' },
    { value: 'short', label: 'Short (< 50 words)' },
    { value: 'medium', label: 'Medium (50-100 words)' },
    { value: 'long', label: 'Long (> 100 words)' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="w-full">
      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <span className="text-sm font-inter text-muted-foreground">Quick Filters:</span>
        </div>
        
        <Button
          variant={filters?.sfw ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('sfw', !filters?.sfw)}
          className="rounded-full"
        >
          SFW Only
        </Button>
        
        <Button
          variant={filters?.trending ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('trending', !filters?.trending)}
          className="rounded-full"
        >
          <Icon name="TrendingUp" size={16} className="mr-2" />
          Trending
        </Button>
        
        <Button
          variant={filters?.recent ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('recent', !filters?.recent)}
          className="rounded-full"
        >
          <Icon name="Clock" size={16} className="mr-2" />
          Recent
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onSerendipityMode}
          className="rounded-full pulse-glow"
        >
          <Icon name="Shuffle" size={16} className="mr-2" />
          Serendipity Mode
        </Button>
      </div>
      {/* Advanced Filters Toggle */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} className="mr-2" />
          Advanced Filters
        </Button>
        
        {Object.values(filters)?.some(v => v !== 'all' && v !== 'any' && v !== false) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange({
              category: 'all',
              mood: 'any',
              freshness: 'any',
              length: 'any',
              sfw: false,
              trending: false,
              recent: false
            })}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} className="mr-2" />
            Clear All
          </Button>
        )}
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="glassmorphic-card rounded-xl p-6 border border-border stagger-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Category"
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => handleFilterChange('category', value)}
            />
            
            <Select
              label="Mood"
              options={moodOptions}
              value={filters?.mood}
              onChange={(value) => handleFilterChange('mood', value)}
            />
            
            <Select
              label="Freshness"
              options={freshnessOptions}
              value={filters?.freshness}
              onChange={(value) => handleFilterChange('freshness', value)}
            />
            
            <Select
              label="Length"
              options={lengthOptions}
              value={filters?.length}
              onChange={(value) => handleFilterChange('length', value)}
            />
          </div>

          {/* Search Tips */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Lightbulb" size={16} className="mr-2 text-primary" />
              Search Tips
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-mono bg-muted/30 px-2 py-1 rounded">AND</span> - Both terms: "work AND coffee"
              </div>
              <div>
                <span className="font-mono bg-muted/30 px-2 py-1 rounded">OR</span> - Either term: "cat OR dog"
              </div>
              <div>
                <span className="font-mono bg-muted/30 px-2 py-1 rounded">"quotes"</span> - Exact phrase: "knock knock"
              </div>
              <div>
                <span className="font-mono bg-muted/30 px-2 py-1 rounded">-exclude</span> - Without term: "jokes -dad"
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;