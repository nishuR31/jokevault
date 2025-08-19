import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SerendipityMode = ({ isActive, onClose, onJokeFound }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [spinCount, setSpinCount] = useState(0);

  const randomJokes = [
    {
      id: 1,
      content: "Why don't scientists trust atoms? Because they make up everything!",
      category: "Science",
      rating: 4.8,
      tags: ["science", "wordplay"]
    },
    {
      id: 2,
      content: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      category: "Observational",
      rating: 4.6,
      tags: ["marriage", "observational"]
    },
    {
      id: 3,
      content: "Why did the scarecrow win an award? He was outstanding in his field!",
      category: "Puns",
      rating: 4.7,
      tags: ["puns", "farming"]
    },
    {
      id: 4,
      content: "I'm reading a book about anti-gravity. It's impossible to put down!",
      category: "Science",
      rating: 4.5,
      tags: ["books", "science", "wordplay"]
    },
    {
      id: 5,
      content: "Why don't eggs tell jokes? They'd crack each other up!",
      category: "Food",
      rating: 4.4,
      tags: ["food", "wordplay"]
    }
  ];

  const handleSpin = () => {
    setIsSpinning(true);
    setSpinCount(prev => prev + 1);
    
    setTimeout(() => {
      const randomJoke = randomJokes?.[Math.floor(Math.random() * randomJokes?.length)];
      setCurrentJoke(randomJoke);
      setIsSpinning(false);
      onJokeFound(randomJoke);
    }, 2000);
  };

  useEffect(() => {
    if (isActive && !currentJoke) {
      handleSpin();
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glassmorphic-card rounded-2xl p-8 border border-border max-w-2xl w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-poppins font-bold text-foreground flex items-center">
            <Icon name="Shuffle" size={24} className="mr-3 text-primary" />
            Serendipity Mode
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Slot Machine Animation */}
        <div className="text-center mb-8">
          <div className="relative mx-auto w-64 h-64 glassmorphic rounded-2xl border-2 border-primary/30 flex items-center justify-center mb-6">
            {isSpinning ? (
              <div className="space-y-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="text-primary font-inter font-semibold animate-pulse">
                  Finding your perfect joke...
                </div>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : currentJoke ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" size={24} className="text-white" />
                </div>
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-inter">
                    {currentJoke?.category}
                  </span>
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="Star" size={16} className="text-warning fill-current" />
                    <span className="text-sm text-muted-foreground">{currentJoke?.rating}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Icon name="Shuffle" size={48} className="text-primary mx-auto" />
                <p className="text-muted-foreground font-inter">
                  Ready to discover something amazing?
                </p>
              </div>
            )}
          </div>

          {/* Joke Display */}
          {currentJoke && !isSpinning && (
            <div className="glassmorphic rounded-xl p-6 border border-border mb-6 stagger-fade-in">
              <p className="text-lg text-foreground font-inter leading-relaxed mb-4">
                {currentJoke?.content}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {currentJoke?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-inter"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={handleSpin}
              disabled={isSpinning}
              className="rounded-xl"
            >
              <Icon name="RefreshCw" size={16} className="mr-2" />
              {isSpinning ? 'Spinning...' : 'Spin Again'}
            </Button>
            
            {currentJoke && !isSpinning && (
              <>
                <Button variant="default" className="rounded-xl">
                  <Icon name="Heart" size={16} className="mr-2" />
                  Love It!
                </Button>
                
                <Button variant="ghost" className="rounded-xl">
                  <Icon name="Share2" size={16} className="mr-2" />
                  Share
                </Button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} />
                <span>Spins: {spinCount}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>Session: {Math.floor(spinCount * 2.5)}s</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} />
                <span>Discovery Mode</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="glassmorphic rounded-lg p-4 border border-border/50">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">Pro Tip:</strong> Each spin uses our AI to find jokes you haven't seen before. 
              The more you spin, the more personalized your discoveries become!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerendipityMode;