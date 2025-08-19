import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SocialSection = ({ socialData }) => {
  const [activeTab, setActiveTab] = useState('following');

  const tabs = [
    { id: 'following', label: 'Following', count: socialData?.following?.length },
    { id: 'followers', label: 'Followers', count: socialData?.followers?.length },
    { id: 'activity', label: 'Activity', count: socialData?.activities?.length }
  ];

  const handleFollow = (userId) => {
    console.log('Following user:', userId);
  };

  const handleUnfollow = (userId) => {
    console.log('Unfollowing user:', userId);
  };

  const formatActivityTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date?.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'like': return 'Heart';
      case 'share': return 'Share2';
      case 'comment': return 'MessageCircle';
      case 'follow': return 'UserPlus';
      case 'collection': return 'FolderPlus';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'like': return 'text-red-500';
      case 'share': return 'text-secondary';
      case 'comment': return 'text-primary';
      case 'follow': return 'text-success';
      case 'collection': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="glassmorphic-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
            <Icon name="Users" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-poppins font-bold text-foreground">Social Hub</h2>
            <p className="text-sm text-muted-foreground">Connect with the comedy community</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="UserPlus" iconPosition="left">
          Find Friends
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap comedy-timing ${
              activeTab === tab?.id
                ? 'bg-primary text-white' :'bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <span>{tab?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab?.id 
                ? 'bg-white/20 text-white' :'bg-muted/30 text-muted-foreground'
            }`}>
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'following' && (
          <div className="space-y-3">
            {socialData?.following?.map((user) => (
              <div key={user?.id} className="flex items-center justify-between p-3 bg-muted/10 rounded-xl hover:bg-muted/20 comedy-timing">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {user?.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{user?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {user?.jokesCount} jokes • {user?.followersCount} followers
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/user/${user?.id}`}>
                    <Button variant="ghost" size="sm" iconName="Eye" />
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUnfollow(user?.id)}
                  >
                    Following
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'followers' && (
          <div className="space-y-3">
            {socialData?.followers?.map((user) => (
              <div key={user?.id} className="flex items-center justify-between p-3 bg-muted/10 rounded-xl hover:bg-muted/20 comedy-timing">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {user?.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{user?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {user?.jokesCount} jokes • Followed {formatActivityTime(user?.followedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/user/${user?.id}`}>
                    <Button variant="ghost" size="sm" iconName="Eye" />
                  </Link>
                  {!user?.isFollowingBack ? (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleFollow(user?.id)}
                    >
                      Follow Back
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUnfollow(user?.id)}
                    >
                      Following
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-3">
            {socialData?.activities?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-xl hover:bg-muted/20 comedy-timing">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity?.type === 'like' ? 'bg-red-500/20' :
                    activity?.type === 'share' ? 'bg-secondary/20' :
                    activity?.type === 'comment' ? 'bg-primary/20' :
                    activity?.type === 'follow'? 'bg-success/20' : 'bg-warning/20'
                  }`}>
                    <Icon 
                      name={getActivityIcon(activity?.type)} 
                      size={14} 
                      className={getActivityColor(activity?.type)} 
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Image
                      src={activity?.user?.avatar}
                      alt={activity?.user?.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {activity?.user?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatActivityTime(activity?.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity?.description}
                  </p>
                  
                  {activity?.jokePreview && (
                    <div className="p-2 bg-muted/20 rounded text-xs text-muted-foreground line-clamp-2">
                      "{activity?.jokePreview}"
                    </div>
                  )}
                </div>
                
                <div className="flex-shrink-0">
                  {activity?.jokeId && (
                    <Link to={`/joke-detail-page/${activity?.jokeId}`}>
                      <Button variant="ghost" size="sm" iconName="ArrowRight" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Empty States */}
      {((activeTab === 'following' && socialData?.following?.length === 0) ||
        (activeTab === 'followers' && socialData?.followers?.length === 0) ||
        (activeTab === 'activity' && socialData?.activities?.length === 0)) && (
        <div className="text-center py-8">
          <Icon 
            name={activeTab === 'following' ? 'UserPlus' : activeTab === 'followers' ? 'Users' : 'Activity'} 
            size={48} 
            className="text-muted-foreground mx-auto mb-4" 
          />
          <p className="text-muted-foreground mb-2">
            {activeTab === 'following' && 'Not following anyone yet'}
            {activeTab === 'followers' && 'No followers yet'}
            {activeTab === 'activity' && 'No recent activity'}
          </p>
          <Button variant="outline" size="sm">
            {activeTab === 'following' && 'Find People to Follow'}
            {activeTab === 'followers' && 'Share Your Profile'}
            {activeTab === 'activity' && 'Start Engaging'}
          </Button>
        </div>
      )}
      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>{socialData?.following?.length} Following</span>
          <span>{socialData?.followers?.length} Followers</span>
          <span>{socialData?.activities?.length} Activities</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
            Privacy
          </Button>
          <Link to="/community">
            <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
              Explore Community
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialSection;