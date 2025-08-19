import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesSection = ({ preferences, onPreferencesUpdate }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSliderChange = (key, value) => {
    const updated = { ...localPreferences, [key]: value };
    setLocalPreferences(updated);
    onPreferencesUpdate(updated);
  };

  const handleToggleChange = (key, checked) => {
    const updated = { ...localPreferences, [key]: checked };
    setLocalPreferences(updated);
    onPreferencesUpdate(updated);
  };

  const SliderControl = ({ label, value, onChange, leftLabel, rightLabel, icon }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon name={icon} size={16} className="text-primary" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, rgb(139, 92, 246) 0%, rgb(139, 92, 246) ${value}%, rgb(255, 255, 255, 0.1) ${value}%, rgb(255, 255, 255, 0.1) 100%)`
            }}
          />
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg"
            style={{ left: `calc(${value}% - 8px)` }}
          />
        </div>
        <div className="text-center">
          <span className="text-xs text-primary font-medium">{value}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="glassmorphic-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-poppins font-bold text-foreground">Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize your comedy experience</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      <div className="space-y-6">
        {/* Humor Style Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SliderControl
            label="Content Style"
            value={localPreferences?.cleanEdgy}
            onChange={(value) => handleSliderChange('cleanEdgy', value)}
            leftLabel="Clean"
            rightLabel="Edgy"
            icon="Shield"
          />
          
          <SliderControl
            label="Joke Length"
            value={localPreferences?.shortLong}
            onChange={(value) => handleSliderChange('shortLong', value)}
            leftLabel="Short"
            rightLabel="Long"
            icon="AlignLeft"
          />
          
          <SliderControl
            label="Popularity"
            value={localPreferences?.popularNiche}
            onChange={(value) => handleSliderChange('popularNiche', value)}
            leftLabel="Popular"
            rightLabel="Niche"
            icon="TrendingUp"
          />
          
          <SliderControl
            label="Complexity"
            value={localPreferences?.simpleComplex}
            onChange={(value) => handleSliderChange('simpleComplex', value)}
            leftLabel="Simple"
            rightLabel="Complex"
            icon="Brain"
          />
        </div>

        {isExpanded && (
          <>
            {/* Notification Settings */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Bell" size={18} className="text-primary" />
                <span>Notifications</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Checkbox
                  label="Daily joke delivery"
                  description="Get a fresh joke every morning"
                  checked={localPreferences?.dailyJokes}
                  onChange={(e) => handleToggleChange('dailyJokes', e?.target?.checked)}
                />
                
                <Checkbox
                  label="New collection alerts"
                  description="Notify when new collections are added"
                  checked={localPreferences?.collectionAlerts}
                  onChange={(e) => handleToggleChange('collectionAlerts', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Trending jokes"
                  description="Weekly trending joke summaries"
                  checked={localPreferences?.trendingAlerts}
                  onChange={(e) => handleToggleChange('trendingAlerts', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Community updates"
                  description="Updates from followed users"
                  checked={localPreferences?.communityUpdates}
                  onChange={(e) => handleToggleChange('communityUpdates', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Content Filtering */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Filter" size={18} className="text-primary" />
                <span>Content Filtering</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Checkbox
                  label="Hide NSFW content"
                  description="Filter out adult content"
                  checked={localPreferences?.hideNSFW}
                  onChange={(e) => handleToggleChange('hideNSFW', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Hide political jokes"
                  description="Filter out political content"
                  checked={localPreferences?.hidePolitical}
                  onChange={(e) => handleToggleChange('hidePolitical', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Hide dark humor"
                  description="Filter out dark comedy"
                  checked={localPreferences?.hideDarkHumor}
                  onChange={(e) => handleToggleChange('hideDarkHumor', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show only verified jokes"
                  description="Display only moderated content"
                  checked={localPreferences?.verifiedOnly}
                  onChange={(e) => handleToggleChange('verifiedOnly', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Accessibility & Display */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Accessibility" size={18} className="text-primary" />
                <span>Accessibility & Display</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Checkbox
                  label="Large text mode"
                  description="Increase font size for better readability"
                  checked={localPreferences?.largeText}
                  onChange={(e) => handleToggleChange('largeText', e?.target?.checked)}
                />
                
                <Checkbox
                  label="High contrast mode"
                  description="Enhanced contrast for better visibility"
                  checked={localPreferences?.highContrast}
                  onChange={(e) => handleToggleChange('highContrast', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Reduce animations"
                  description="Minimize motion for sensitive users"
                  checked={localPreferences?.reduceAnimations}
                  onChange={(e) => handleToggleChange('reduceAnimations', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Auto-play audio"
                  description="Automatically play joke audio when available"
                  checked={localPreferences?.autoPlayAudio}
                  onChange={(e) => handleToggleChange('autoPlayAudio', e?.target?.checked)}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
        <Button variant="ghost" size="sm" iconName="RotateCcw" iconPosition="left">
          Reset to Defaults
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export Settings
          </Button>
          <Button variant="default" size="sm" iconName="Save" iconPosition="left">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;