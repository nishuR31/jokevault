import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingSection = ({ onTrendingSearch }) => {
  const trendingSearches = [
    { term: "work from home jokes", count: "2.3k", trend: "up", change: "+15%" },
    { term: "coffee humor", count: "1.8k", trend: "up", change: "+8%" },
    { term: "monday motivation", count: "1.5k", trend: "down", change: "-3%" },
    { term: "programming memes", count: "1.2k", trend: "up", change: "+22%" },
    { term: "dad jokes clean", count: "980", trend: "stable", change: "0%" },
    { term: "office meetings", count: "756", trend: "up", change: "+12%" }
  ];

  const viralJokes = [
    {
      id: 1,
      preview: "Why don't scientists trust atoms? Because they make up everything!",
      searches: "5.2k",
      timeframe: "Last 24h"
    },
    {
      id: 2,
      preview: "I told my wife she was drawing her eyebrows too high...",
      searches: "3.8k",
      timeframe: "Last 12h"
    },
    {
      id: 3,
      preview: "Why did the scarecrow win an award?",
      searches: "2.9k",
      timeframe: "Last 6h"
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Trending Searches */}
      <div className="glassmorphic-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-poppins font-semibold text-foreground flex items-center">
            <Icon name="TrendingUp" size={20} className="mr-2 text-primary" />
            Trending Now
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live updates</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingSearches?.map((search, index) => (
            <button
              key={index}
              onClick={() => onTrendingSearch(search?.term)}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/30 comedy-timing text-left group"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-inter text-foreground group-hover:text-primary comedy-timing">
                    {search?.term}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>{search?.count} searches</span>
                  <div className={`flex items-center space-x-1 ${getTrendColor(search?.trend)}`}>
                    <Icon name={getTrendIcon(search?.trend)} size={12} />
                    <span>{search?.change}</span>
                  </div>
                </div>
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary comedy-timing" />
            </button>
          ))}
        </div>
      </div>
      {/* Viral Jokes */}
      <div className="glassmorphic-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-poppins font-semibold text-foreground flex items-center">
            <Icon name="Zap" size={20} className="mr-2 text-warning" />
            Viral Jokes
          </h3>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </Button>
        </div>

        <div className="space-y-4">
          {viralJokes?.map((joke, index) => (
            <div key={joke?.id} className="p-4 rounded-lg border border-border/50 hover:border-primary/30 comedy-timing">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Search" size={14} />
                    <span>{joke?.searches} searches</span>
                    <span>•</span>
                    <span>{joke?.timeframe}</span>
                  </div>
                </div>
                <Icon name="Fire" size={16} className="text-warning" />
              </div>
              
              <p className="text-foreground font-inter text-sm leading-relaxed">
                {joke?.preview}
              </p>
              
              <div className="flex items-center justify-between mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTrendingSearch(joke?.preview?.split(' ')?.slice(0, 3)?.join(' '))}
                  className="text-primary hover:text-primary/80"
                >
                  Search similar
                </Button>
                <Button variant="outline" size="sm">
                  View joke
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Search History Quick Access */}
      <div className="glassmorphic-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-poppins font-semibold text-foreground flex items-center mb-4">
          <Icon name="History" size={20} className="mr-2 text-secondary" />
          Recent Searches
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {["dad jokes", "work humor", "programming", "coffee jokes", "clean comedy"]?.map((term, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onTrendingSearch(term)}
              className="rounded-full"
            >
              <Icon name="Clock" size={14} className="mr-2" />
              {term}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;