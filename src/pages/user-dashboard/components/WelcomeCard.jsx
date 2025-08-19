import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeCard = ({ user, stats }) => {
  return (
    <div className="glassmorphic-card rounded-2xl p-6 mb-6 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.name?.charAt(0)}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
              <Icon name="Check" size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-poppins font-bold text-foreground">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground">
              Ready for your daily dose of laughter?
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <div className="px-3 py-1 bg-primary/20 rounded-full">
            <span className="text-sm font-medium text-primary">
              {user?.streak} day streak
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/20 rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Heart" size={24} className="text-red-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats?.jokesLiked}</div>
          <div className="text-sm text-muted-foreground">Jokes Liked</div>
        </div>
        
        <div className="text-center p-4 bg-muted/20 rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Bookmark" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats?.jokesSaved}</div>
          <div className="text-sm text-muted-foreground">Jokes Saved</div>
        </div>
        
        <div className="text-center p-4 bg-muted/20 rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Share2" size={24} className="text-secondary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats?.jokesShared}</div>
          <div className="text-sm text-muted-foreground">Jokes Shared</div>
        </div>
        
        <div className="text-center p-4 bg-muted/20 rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Trophy" size={24} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats?.achievements}</div>
          <div className="text-sm text-muted-foreground">Achievements</div>
        </div>
      </div>
      <div className="md:hidden mt-4 text-center">
        <div className="px-3 py-1 bg-primary/20 rounded-full inline-block">
          <span className="text-sm font-medium text-primary">
            {user?.streak} day streak 🔥
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;