import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContributionsSection = ({ contributions }) => {
  const [statusFilter, setStatusFilter] = useState('all');

  const statusFilters = [
    { value: 'all', label: 'All', count: contributions?.length },
    { value: 'pending', label: 'Pending', count: contributions?.filter(c => c?.status === 'pending')?.length },
    { value: 'approved', label: 'Approved', count: contributions?.filter(c => c?.status === 'approved')?.length },
    { value: 'rejected', label: 'Rejected', count: contributions?.filter(c => c?.status === 'rejected')?.length }
  ];

  const filteredContributions = statusFilter === 'all' 
    ? contributions 
    : contributions?.filter(c => c?.status === statusFilter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success';
      case 'rejected': return 'text-destructive';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getPerformanceColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 3.5) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="glassmorphic-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center">
            <Icon name="PenTool" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-xl font-poppins font-bold text-foreground">My Contributions</h2>
            <p className="text-sm text-muted-foreground">Track your submitted jokes</p>
          </div>
        </div>
        <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
          Submit New Joke
        </Button>
      </div>
      {/* Status Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {statusFilters?.map((filter) => (
          <button
            key={filter?.value}
            onClick={() => setStatusFilter(filter?.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap comedy-timing ${
              statusFilter === filter?.value
                ? 'bg-primary text-white' :'bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <span>{filter?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              statusFilter === filter?.value 
                ? 'bg-white/20 text-white' :'bg-muted/30 text-muted-foreground'
            }`}>
              {filter?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Contributions List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredContributions?.length > 0 ? (
          filteredContributions?.map((contribution) => (
            <div key={contribution?.id} className="group bg-muted/10 rounded-xl p-4 border border-border hover:border-primary/30 comedy-timing">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1 ${getStatusColor(contribution?.status)}`}>
                    <Icon name={getStatusIcon(contribution?.status)} size={16} />
                    <span className="text-sm font-medium capitalize">{contribution?.status}</span>
                  </div>
                  <div className="flex space-x-1">
                    {contribution?.tags?.slice(0, 2)?.map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(contribution.submittedAt)?.toLocaleDateString()}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-foreground leading-relaxed line-clamp-3">
                  {contribution?.content}
                </p>
              </div>

              {contribution?.status === 'approved' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-success/10 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Icon name="Eye" size={16} className="text-muted-foreground" />
                    </div>
                    <div className="text-sm font-medium text-foreground">{contribution?.views}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Icon name="Heart" size={16} className="text-red-500" />
                    </div>
                    <div className="text-sm font-medium text-foreground">{contribution?.likes}</div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Icon name="Share2" size={16} className="text-secondary" />
                    </div>
                    <div className="text-sm font-medium text-foreground">{contribution?.shares}</div>
                    <div className="text-xs text-muted-foreground">Shares</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Icon name="Star" size={16} className="text-warning" />
                    </div>
                    <div className={`text-sm font-medium ${getPerformanceColor(contribution?.rating)}`}>
                      {contribution?.rating?.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              )}

              {contribution?.status === 'rejected' && contribution?.feedback && (
                <div className="p-3 bg-destructive/10 rounded-lg mb-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-destructive mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-destructive mb-1">Feedback</p>
                      <p className="text-sm text-muted-foreground">{contribution?.feedback}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {contribution?.status === 'approved' && (
                    <Link 
                      to={`/joke-detail-page/${contribution?.id}`}
                      className="text-sm text-primary hover:text-primary/80 comedy-timing"
                    >
                      View Live →
                    </Link>
                  )}
                  {contribution?.status === 'rejected' && (
                    <button className="text-sm text-warning hover:text-warning/80 comedy-timing">
                      Resubmit
                    </button>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-muted/50 rounded comedy-timing">
                    <Icon name="Edit" size={16} className="text-muted-foreground" />
                  </button>
                  <button className="p-1 hover:bg-muted/50 rounded comedy-timing">
                    <Icon name="Trash2" size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="PenTool" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              {statusFilter === 'all' ? 'No contributions yet' : `No ${statusFilter} contributions`}
            </p>
            <Button variant="outline" size="sm">
              Submit Your First Joke
            </Button>
          </div>
        )}
      </div>
      {filteredContributions?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {filteredContributions?.length} contributions
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
                Export Data
              </Button>
              <Button variant="outline" size="sm" iconName="BarChart3" iconPosition="left">
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionsSection;