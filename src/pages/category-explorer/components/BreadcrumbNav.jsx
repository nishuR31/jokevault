import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreadcrumbNav = ({ currentCategory, filters }) => {
  const breadcrumbs = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Explore', path: '/category-explorer', icon: 'Compass' }
  ];

  if (currentCategory) {
    breadcrumbs?.push({
      label: currentCategory,
      path: `/category-explorer?category=${currentCategory}`,
      icon: 'Tag'
    });
  }

  const getActiveFiltersText = () => {
    const activeFilters = [];
    
    if (filters?.moods && filters?.moods?.length > 0) {
      activeFilters?.push(`${filters?.moods?.length} mood${filters?.moods?.length > 1 ? 's' : ''}`);
    }
    
    if (filters?.length) {
      activeFilters?.push(filters?.length);
    }
    
    if (filters?.contentRating && filters?.contentRating !== 'all') {
      activeFilters?.push(filters?.contentRating?.toUpperCase());
    }
    
    if (filters?.sortBy) {
      const sortLabels = {
        'trending': 'Trending',
        'popular': 'Popular',
        'newest': 'Newest',
        'highest-rated': 'Top Rated'
      };
      activeFilters?.push(sortLabels?.[filters?.sortBy] || filters?.sortBy);
    }

    return activeFilters?.length > 0 ? activeFilters?.join(' • ') : null;
  };

  const activeFiltersText = getActiveFiltersText();

  return (
    <div className="glassmorphic-card rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs?.map((crumb, index) => (
            <React.Fragment key={crumb?.path}>
              {index > 0 && (
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              )}
              <Link
                to={crumb?.path}
                className={`flex items-center space-x-1 comedy-timing ${
                  index === breadcrumbs?.length - 1
                    ? 'text-primary font-medium' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={crumb?.icon} size={16} />
                <span>{crumb?.label}</span>
              </Link>
            </React.Fragment>
          ))}
        </nav>

        {/* Active Filters Display */}
        {activeFiltersText && (
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              Filtered by: <span className="text-foreground font-medium">{activeFiltersText}</span>
            </span>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      <div className="flex items-center space-x-6 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Hash" size={14} />
          <span>12 Categories</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Smile" size={14} />
          <span>2,847 Jokes</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="TrendingUp" size={14} />
          <span>Updated Daily</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} />
          <span>1.2M+ Laughs Shared</span>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbNav;