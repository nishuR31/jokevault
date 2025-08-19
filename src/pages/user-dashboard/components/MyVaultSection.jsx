import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MyVaultSection = ({ collections }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, collection) => {
    setDraggedItem(collection);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetCollection) => {
    e?.preventDefault();
    if (draggedItem && draggedItem?.id !== targetCollection?.id) {
      // Handle reordering logic here
      console.log('Moving collection:', draggedItem?.name, 'to position of:', targetCollection?.name);
    }
    setDraggedItem(null);
  };

  return (
    <div className="glassmorphic-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Icon name="FolderOpen" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-poppins font-bold text-foreground">My Vault</h2>
            <p className="text-sm text-muted-foreground">Organize your favorite jokes</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          New Collection
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections?.map((collection) => (
          <div
            key={collection?.id}
            draggable
            onDragStart={(e) => handleDragStart(e, collection)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, collection)}
            className="group relative bg-muted/10 rounded-xl p-4 border border-border hover:border-primary/50 comedy-timing cursor-move hover-lift"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${collection?.color}`}>
                  <Icon name={collection?.icon} size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground group-hover:text-primary comedy-timing">
                    {collection?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {collection?.count} jokes
                  </p>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 comedy-timing">
                <button className="p-1 hover:bg-muted/50 rounded">
                  <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              {collection?.recentJokes?.slice(0, 2)?.map((joke, index) => (
                <div key={index} className="text-xs text-muted-foreground line-clamp-2 bg-muted/20 rounded p-2">
                  {joke}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Updated {collection?.lastUpdated}
              </span>
              <Link 
                to={`/user-dashboard/collection/${collection?.id}`}
                className="text-xs text-primary hover:text-primary/80 comedy-timing"
              >
                View all →
              </Link>
            </div>

            {draggedItem?.id === collection?.id && (
              <div className="absolute inset-0 bg-primary/20 rounded-xl border-2 border-primary border-dashed"></div>
            )}
          </div>
        ))}

        <div className="border-2 border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center min-h-[160px] hover:border-primary/50 comedy-timing">
          <Icon name="Plus" size={24} className="text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-muted-foreground mb-1">Create Collection</p>
          <p className="text-xs text-muted-foreground">Organize jokes by theme</p>
        </div>
      </div>
    </div>
  );
};

export default MyVaultSection;