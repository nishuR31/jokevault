import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  currentJoke, 
  previousJoke, 
  nextJoke, 
  onPrevious, 
  onNext, 
  onRandom 
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="glassmorphic-card rounded-2xl p-3 flex items-center space-x-2">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          iconName="ArrowLeft"
          iconPosition="left"
          className="hidden sm:flex"
        >
          Back
        </Button>

        {/* Previous Joke */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevious}
          disabled={!previousJoke}
          iconName="ChevronLeft"
          className="w-10 h-10 p-0"
          title={previousJoke ? `Previous: ${previousJoke?.title}` : 'No previous joke'}
        />

        {/* Current Position Indicator */}
        <div className="px-4 py-2 glassmorphic rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Smile" size={16} className="text-primary" />
            <span className="font-inter text-sm text-foreground font-medium">
              Joke #{currentJoke?.id}
            </span>
          </div>
        </div>

        {/* Random Joke */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRandom}
          iconName="Shuffle"
          className="w-10 h-10 p-0 pulse-glow"
          title="Random joke"
        />

        {/* Next Joke */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onNext}
          disabled={!nextJoke}
          iconName="ChevronRight"
          className="w-10 h-10 p-0"
          title={nextJoke ? `Next: ${nextJoke?.title}` : 'No next joke'}
        />

        {/* Mobile Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          iconName="X"
          className="w-10 h-10 p-0 sm:hidden"
        />
      </div>
      {/* Keyboard Shortcuts Hint */}
      <div className="hidden lg:block absolute -top-12 left-1/2 transform -translate-x-1/2">
        <div className="glassmorphic rounded-lg px-3 py-1">
          <span className="text-xs text-muted-foreground font-inter">
            Use ← → keys or swipe to navigate
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavigationControls;