import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SurpriseWheel = ({ categories, onCategorySelect }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rotation, setRotation] = useState(0);

  const wheelCategories = categories?.slice(0, 8); // Limit to 8 categories for the wheel

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Generate random rotation (multiple full rotations + random position)
    const randomRotation = 1440 + Math.random() * 1440; // 4-8 full rotations
    const newRotation = rotation + randomRotation;
    setRotation(newRotation);

    // Calculate which category was selected
    const segmentAngle = 360 / wheelCategories?.length;
    const normalizedRotation = newRotation % 360;
    const selectedIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % wheelCategories?.length;
    
    setTimeout(() => {
      const selected = wheelCategories?.[selectedIndex];
      setSelectedCategory(selected);
      setIsSpinning(false);
      
      // Auto-select after a brief delay
      setTimeout(() => {
        onCategorySelect(selected);
        setSelectedCategory(null);
      }, 1500);
    }, 3000);
  };

  const getSegmentColor = (index) => {
    const colors = [
      'from-red-500 to-pink-500',
      'from-orange-500 to-yellow-500',
      'from-green-500 to-emerald-500',
      'from-blue-500 to-cyan-500',
      'from-indigo-500 to-purple-500',
      'from-purple-500 to-pink-500',
      'from-pink-500 to-red-500',
      'from-cyan-500 to-blue-500'
    ];
    return colors?.[index % colors?.length];
  };

  return (
    <div className="glassmorphic-card rounded-xl p-8 text-center">
      <div className="mb-6">
        <h3 className="font-poppins font-bold text-xl text-foreground mb-2">
          Feeling Lucky?
        </h3>
        <p className="text-muted-foreground">
          Spin the wheel and let fate choose your comedy adventure!
        </p>
      </div>
      {/* Wheel Container */}
      <div className="relative w-64 h-64 mx-auto mb-8">
        {/* Wheel */}
        <div 
          className={`w-full h-full rounded-full relative overflow-hidden border-4 border-primary shadow-2xl comedy-timing ${
            isSpinning ? 'animate-spin' : ''
          }`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
          }}
        >
          {wheelCategories?.map((category, index) => {
            const segmentAngle = 360 / wheelCategories?.length;
            const startAngle = index * segmentAngle;
            
            return (
              <div
                key={category?.id}
                className={`absolute w-full h-full bg-gradient-to-br ${getSegmentColor(index)}`}
                style={{
                  clipPath: `polygon(50% 50%, ${
                    50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)
                  }% ${
                    50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)
                  }%, ${
                    50 + 50 * Math.cos((startAngle + segmentAngle - 90) * Math.PI / 180)
                  }% ${
                    50 + 50 * Math.sin((startAngle + segmentAngle - 90) * Math.PI / 180)
                  }%)`
                }}
              >
                <div 
                  className="absolute text-white font-medium text-sm"
                  style={{
                    top: '30%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${startAngle + segmentAngle / 2}deg)`,
                    transformOrigin: 'center'
                  }}
                >
                  {category?.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-background border-4 border-primary rounded-full flex items-center justify-center shadow-lg">
          <Icon name="Zap" size={24} className="text-primary" />
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
        </div>
      </div>
      {/* Spin Button */}
      <Button
        variant="default"
        size="lg"
        onClick={spinWheel}
        disabled={isSpinning}
        iconName={isSpinning ? "Loader2" : "RotateCw"}
        iconPosition="left"
        className={`pulse-glow ${isSpinning ? 'opacity-50' : ''}`}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </Button>
      {/* Selected Category Display */}
      {selectedCategory && !isSpinning && (
        <div className="mt-6 p-4 glassmorphic rounded-lg border border-primary animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Icon name="Trophy" size={20} className="text-primary" />
            <span className="font-poppins font-semibold text-lg text-foreground">
              Winner!
            </span>
          </div>
          <p className="text-primary font-medium">
            {selectedCategory?.name}
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Redirecting you to {selectedCategory?.jokeCount} hilarious jokes...
          </p>
        </div>
      )}
      {/* Wheel Legend */}
      <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
        {wheelCategories?.map((category, index) => (
          <div key={category?.id} className="flex items-center space-x-2">
            <div 
              className={`w-3 h-3 rounded-full bg-gradient-to-br ${getSegmentColor(index)}`}
            ></div>
            <span className="text-muted-foreground truncate">
              {category?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurpriseWheel;