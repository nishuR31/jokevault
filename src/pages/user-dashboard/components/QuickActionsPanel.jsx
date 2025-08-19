import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onThemeToggle, currentTheme }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      id: 'random-joke',
      label: 'Random Joke',
      icon: 'Shuffle',
      color: 'bg-primary/20 text-primary',
      action: () => console.log('Getting random joke'),
      shortcut: 'R'
    },
    {
      id: 'submit-joke',
      label: 'Submit Joke',
      icon: 'Plus',
      color: 'bg-success/20 text-success',
      link: '/submit-joke',
      shortcut: 'S'
    },
    {
      id: 'search',
      label: 'Search',
      icon: 'Search',
      color: 'bg-secondary/20 text-secondary',
      link: '/search-discovery',
      shortcut: '/'
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: 'Heart',
      color: 'bg-red-500/20 text-red-500',
      link: '/user-dashboard/favorites',
      shortcut: 'F'
    },
    {
      id: 'collections',
      label: 'Collections',
      icon: 'FolderOpen',
      color: 'bg-warning/20 text-warning',
      link: '/user-dashboard/collections',
      shortcut: 'C'
    },
    {
      id: 'share-profile',
      label: 'Share Profile',
      icon: 'Share2',
      color: 'bg-accent/20 text-accent',
      action: () => console.log('Sharing profile'),
      shortcut: 'P'
    }
  ];

  const utilityActions = [
    {
      id: 'theme-toggle',
      label: `${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`,
      icon: currentTheme === 'dark' ? 'Sun' : 'Moon',
      action: onThemeToggle
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: 'Download',
      action: () => console.log('Exporting data')
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'HelpCircle',
      link: '/help'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      link: '/settings'
    }
  ];

  const handleAction = (action) => {
    if (action?.action) {
      action?.action();
    }
  };

  const ActionButton = ({ action, size = 'default' }) => {
    const content = (
      <div className={`
        group relative flex items-center justify-center p-3 rounded-xl comedy-timing hover-lift cursor-pointer
        ${size === 'small' ? 'w-10 h-10' : 'w-12 h-12'}
        ${action?.color || 'bg-muted/20 text-muted-foreground hover:text-foreground'}
        hover:scale-105 active:scale-95
      `}>
        <Icon name={action?.icon} size={size === 'small' ? 16 : 20} />
        
        {action?.shortcut && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-background border border-border rounded text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 comedy-timing">
            {action?.shortcut}
          </div>
        )}
        
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 comedy-timing pointer-events-none">
          {action?.label}
        </div>
      </div>
    );

    if (action?.link) {
      return <Link to={action?.link}>{content}</Link>;
    }

    return <div onClick={() => handleAction(action)}>{content}</div>;
  };

  return (
    <>
      {/* Desktop Floating Panel */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="glassmorphic-card rounded-2xl p-4 space-y-3">
          <div className="text-center mb-4">
            <h3 className="text-sm font-medium text-foreground mb-1">Quick Actions</h3>
            <div className="w-8 h-0.5 bg-primary rounded-full mx-auto"></div>
          </div>
          
          {quickActions?.map((action) => (
            <ActionButton key={action?.id} action={action} />
          ))}
          
          <div className="border-t border-border pt-3 mt-4">
            {utilityActions?.map((action) => (
              <ActionButton key={action?.id} action={action} size="small" />
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Expanded Actions */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 glassmorphic-card rounded-2xl p-3 space-y-2 animate-fade-in">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {quickActions?.slice(0, 6)?.map((action) => (
                  <ActionButton key={action?.id} action={action} size="small" />
                ))}
              </div>
              
              <div className="border-t border-border pt-2">
                <div className="grid grid-cols-2 gap-2">
                  {utilityActions?.slice(0, 4)?.map((action) => (
                    <ActionButton key={action?.id} action={action} size="small" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Main FAB */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              w-14 h-14 glassmorphic rounded-full flex items-center justify-center comedy-timing hover-lift
              ${isExpanded ? 'bg-primary text-white' : 'text-primary'}
              shadow-lg hover:shadow-xl active:scale-95
            `}
          >
            <Icon 
              name={isExpanded ? "X" : "Zap"} 
              size={24} 
              className={`comedy-timing ${isExpanded ? 'rotate-90' : 'rotate-0'}`} 
            />
          </button>
        </div>
      </div>
      {/* Mobile Overlay */}
      {isExpanded && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/50 backdrop-blur-sm z-30"
          onClick={() => setIsExpanded(false)}
        />
      )}
      {/* Keyboard Shortcuts Info */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-30">
        <div className="glassmorphic-card rounded-lg p-3 opacity-0 hover:opacity-100 comedy-timing">
          <p className="text-xs text-muted-foreground mb-2">Keyboard Shortcuts:</p>
          <div className="space-y-1">
            {quickActions?.filter(a => a?.shortcut)?.slice(0, 3)?.map((action) => (
              <div key={action?.id} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{action?.label}</span>
                <kbd className="px-1 py-0.5 bg-muted/30 rounded text-xs">{action?.shortcut}</kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickActionsPanel;