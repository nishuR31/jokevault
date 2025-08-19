import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReadingHistorySection = ({ history }) => {
  const [timeFilter, setTimeFilter] = useState('today');

  const timeFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  const filteredHistory = history.filter(item => {
    const itemDate = new Date(item.viewedAt);
    const now = new Date();
    
    switch (timeFilter) {
      case 'today':
        return itemDate?.toDateString() === now?.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return itemDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return itemDate >= monthAgo;
      default:
        return true;
    }
  });

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="glassmorphic-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-poppins font-bold text-foreground">Reading History</h2>
            <p className="text-sm text-muted-foreground">Your recent joke adventures</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="Trash2" iconPosition="left">
          Clear History
        </Button>
      </div>
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {timeFilters?.map((filter) => (
          <button
            key={filter?.value}
            onClick={() => setTimeFilter(filter?.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap comedy-timing ${
              timeFilter === filter?.value
                ? 'bg-primary text-white' :'bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            {filter?.label}
          </button>
        ))}
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredHistory?.length > 0 ? (
          filteredHistory?.map((item) => (
            <div key={item?.id} className="group flex items-center space-x-4 p-3 bg-muted/10 rounded-xl hover:bg-muted/20 comedy-timing">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                  <Icon name="Smile" size={20} className="text-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {item?.title || 'Untitled Joke'}
                  </h3>
                  <div className="flex space-x-1">
                    {item?.tags?.slice(0, 2)?.map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {item?.preview}
                </p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(item?.viewedAt)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{item?.views}</span>
                  </div>
                  {item?.rating && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs text-muted-foreground">{item?.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 comedy-timing">
                <Link to={`/joke-detail-page/${item?.id}`}>
                  <Button variant="ghost" size="sm" iconName="ArrowRight" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No jokes viewed {timeFilter === 'all' ? 'yet' : timeFilter}</p>
            <Link to="/homepage">
              <Button variant="outline" size="sm">
                Start Exploring
              </Button>
            </Link>
          </div>
        )}
      </div>
      {filteredHistory?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Showing {filteredHistory?.length} of {history.length} jokes
          </p>
          <Link to="/user-dashboard/history">
            <Button variant="ghost" size="sm">
              View Full History
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReadingHistorySection;