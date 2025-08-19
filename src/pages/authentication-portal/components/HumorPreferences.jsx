import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../../../components/ui/Button';

const HumorPreferences = ({ onSubmit, onBack, userData }) => {
  const [preferences, setPreferences] = useState({
    contentTypes: {
      puns: 3,
      oneLiners: 4,
      stories: 2,
      observational: 3,
      wordplay: 5,
    },
    frequency: 'daily',
    maturityLevel: 'clean',
    communityParticipation: 3,
    contentFormat: ['text', 'audio'],
    notificationPrefs: {
      newJokes: true,
      trending: false,
      community: true,
    }
  });

  const contentTypes = [
    { key: 'puns', label: 'Puns & Wordplay', icon: '🎭', description: 'Clever plays on words' },
    { key: 'oneLiners', label: 'One-liners', icon: '⚡', description: 'Quick wit and snappy jokes' },
    { key: 'stories', label: 'Story Jokes', icon: '📚', description: 'Longer narrative humor' },
    { key: 'observational', label: 'Observational', icon: '👀', description: 'Everyday life humor' },
    { key: 'wordplay', label: 'Wordplay', icon: '🔤', description: 'Language-based humor' },
  ];

  const frequencyOptions = [
    { value: 'hourly', label: 'Hourly Giggles', icon: '⏰', description: 'For the comedy addicts' },
    { value: 'daily', label: 'Daily Dose', icon: '☀️', description: 'Perfect morning pickup' },
    { value: 'weekly', label: 'Weekly Wrap-up', icon: '📅', description: 'Quality over quantity' },
    { value: 'custom', label: 'Custom Schedule', icon: '⚙️', description: 'You decide when' },
  ];

  const maturityLevels = [
    { value: 'clean', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦', description: 'Safe for all ages' },
    { value: 'mild', label: 'Slightly Spicy', icon: '🌶️', description: 'A little edge, nothing wild' },
    { value: 'mature', label: 'Adult Humor', icon: '🔞', description: 'For grown-ups only' },
  ];

  const handleSliderChange = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      contentTypes: {
        ...prev?.contentTypes,
        [type]: value
      }
    }));
  };

  const handleFrequencyChange = (frequency) => {
    setPreferences(prev => ({
      ...prev,
      frequency
    }));
  };

  const handleMaturityChange = (level) => {
    setPreferences(prev => ({
      ...prev,
      maturityLevel: level
    }));
  };

  const handleCommunitySliderChange = (value) => {
    setPreferences(prev => ({
      ...prev,
      communityParticipation: value
    }));
  };

  const handleFormatToggle = (format) => {
    setPreferences(prev => ({
      ...prev,
      contentFormat: prev?.contentFormat?.includes(format)
        ? prev?.contentFormat?.filter(f => f !== format)
        : [...prev?.contentFormat, format]
    }));
  };

  const handleNotificationToggle = (type) => {
    setPreferences(prev => ({
      ...prev,
      notificationPrefs: {
        ...prev?.notificationPrefs,
        [type]: !prev?.notificationPrefs?.[type]
      }
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit({ ...userData, humorPreferences: preferences });
  };

  const getCommunityLevelText = (level) => {
    const levels = [
      '', 'Lurker 👀', 'Casual Commenter 💬', 'Active Participant 🎪', 
      'Comedy Contributor 🎭', 'Community Champion 🏆'
    ];
    return levels?.[level] || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Type Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            What makes you laugh? 😄
          </h3>
          {contentTypes?.map((type) => (
            <motion.div
              key={type?.key}
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{type?.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{type?.label}</p>
                    <p className="text-xs text-muted-foreground">{type?.description}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">
                  {preferences?.contentTypes?.[type?.key]}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={preferences?.contentTypes?.[type?.key]}
                onChange={(e) => handleSliderChange(type?.key, parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </motion.div>
          ))}
        </div>

        {/* Frequency Preference */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            How often do you need your comedy fix? 🎯
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {frequencyOptions?.map((option) => (
              <motion.label
                key={option?.value}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  preferences?.frequency === option?.value
                    ? 'border-primary bg-primary/10' :'border-muted hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="radio"
                  name="frequency"
                  value={option?.value}
                  checked={preferences?.frequency === option?.value}
                  onChange={(e) => handleFrequencyChange(e?.target?.value)}
                  className="sr-only"
                />
                <span className="text-lg">{option?.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{option?.label}</p>
                  <p className="text-xs text-muted-foreground">{option?.description}</p>
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Maturity Level */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            What's your comfort level? 🎭
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {maturityLevels?.map((level) => (
              <motion.label
                key={level?.value}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  preferences?.maturityLevel === level?.value
                    ? 'border-primary bg-primary/10' :'border-muted hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="radio"
                  name="maturity"
                  value={level?.value}
                  checked={preferences?.maturityLevel === level?.value}
                  onChange={(e) => handleMaturityChange(e?.target?.value)}
                  className="sr-only"
                />
                <span className="text-lg">{level?.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{level?.label}</p>
                  <p className="text-xs text-muted-foreground">{level?.description}</p>
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Community Participation */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Community Involvement Level 🏟️
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">How social are you?</span>
              <span className="font-medium text-primary">
                {getCommunityLevelText(preferences?.communityParticipation)}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={preferences?.communityParticipation}
              onChange={(e) => handleCommunitySliderChange(parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Observer</span>
              <span>Contributor</span>
            </div>
          </div>
        </div>

        {/* Content Format */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            How do you like your jokes served? 📱
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'text', label: 'Text', icon: '📝' },
              { key: 'audio', label: 'Audio', icon: '🎧' },
              { key: 'video', label: 'Video', icon: '🎥' },
              { key: 'gif', label: 'GIFs', icon: '🎪' },
            ]?.map((format) => (
              <motion.button
                key={format?.key}
                type="button"
                onClick={() => handleFormatToggle(format?.key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                  preferences?.contentFormat?.includes(format?.key)
                    ? 'border-primary bg-primary/10 text-primary' :'border-muted text-muted-foreground hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{format?.icon}</span>
                <span className="text-sm">{format?.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="default"
            iconName="ArrowRight"
            iconPosition="right"
            className="flex-1 comedy-timing hover-lift"
          >
            Continue
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default HumorPreferences;