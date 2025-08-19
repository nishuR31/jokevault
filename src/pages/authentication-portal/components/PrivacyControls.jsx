import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Mail, Share, Users, CheckCircle, Lock } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';


const PrivacyControls = ({ onComplete, userData }) => {
  const [privacySettings, setPrivacySettings] = useState({
    dataUsage: {
      analytics: true,
      personalization: true,
      thirdPartySharing: false,
      marketingEmails: false,
    },
    emailPreferences: {
      dailyJokes: true,
      weeklyNewsletter: false,
      communityUpdates: true,
      securityAlerts: true,
      marketingOffers: false,
    },
    socialSharing: {
      publicProfile: false,
      shareActivity: false,
      allowTagging: true,
      showInDirectory: false,
    },
    contentPreferences: {
      showMatureContent: false,
      showNSFWContent: false,
      personalizedAds: false,
      dataCollection: true,
      locationSharing: false,
    }
  });

  const handleToggle = (category, setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [setting]: !prev?.[category]?.[setting]
      }
    }));
  };

  const handleCompleteSetup = () => {
    // In real app, save privacy settings to backend
    console.log('Privacy settings:', privacySettings);
    onComplete();
  };

  const ToggleSwitch = ({ checked, onChange, label, description, icon: Icon, required = false }) => (
    <motion.div
      className="flex items-start p-4 space-x-3 transition-all border rounded-lg border-muted hover:border-primary/50"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex-shrink-0 mt-1">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <label className="text-sm font-medium cursor-pointer text-foreground">
              {label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </label>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <button
            type="button"
            onClick={onChange}
            disabled={required && checked}
            className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              checked ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                checked ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <motion.div
          className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground">
          Your Privacy Matters
        </h3>
        <p className="text-sm text-muted-foreground">
          Customize how we use your data and communicate with you
        </p>
      </div>
      <div className="space-y-6 overflow-y-auto max-h-96">
        {/* Data Usage Section */}
        <div className="space-y-3">
          <h4 className="flex items-center space-x-2 font-semibold text-foreground">
            <Eye className="w-4 h-4 text-primary" />
            <span>Data Usage</span>
          </h4>
          
          <ToggleSwitch
            checked={privacySettings?.dataUsage?.analytics}
            onChange={() => handleToggle('dataUsage', 'analytics')}
            label="Usage Analytics"
            description="Help us improve JokeVault by sharing anonymous usage data"
            icon={Eye}
          />
          
          <ToggleSwitch
            checked={privacySettings?.dataUsage?.personalization}
            onChange={() => handleToggle('dataUsage', 'personalization')}
            label="Personalized Experience"
            description="Use your activity to recommend jokes and content you'll love"
            icon={Users}
            required
          />
          
          <ToggleSwitch
            checked={privacySettings?.dataUsage?.thirdPartySharing}
            onChange={() => handleToggle('dataUsage', 'thirdPartySharing')}
            label="Third-party Data Sharing"
            description="Share anonymous data with comedy partners for better content"
            icon={Share}
          />
        </div>

        {/* Email Preferences Section */}
        <div className="space-y-3">
          <h4 className="flex items-center space-x-2 font-semibold text-foreground">
            <Mail className="w-4 h-4 text-primary" />
            <span>Email Preferences</span>
          </h4>
          
          <ToggleSwitch
            checked={privacySettings?.emailPreferences?.dailyJokes}
            onChange={() => handleToggle('emailPreferences', 'dailyJokes')}
            label="Daily Joke Email"
            description="Get a handpicked joke delivered to your inbox every morning"
            icon={Mail}
          />
          
          <ToggleSwitch
            checked={privacySettings?.emailPreferences?.communityUpdates}
            onChange={() => handleToggle('emailPreferences', 'communityUpdates')}
            label="Community Updates"
            description="Stay updated on new features and community highlights"
            icon={Users}
          />
          
          <ToggleSwitch
            checked={privacySettings?.emailPreferences?.securityAlerts}
            onChange={() => handleToggle('emailPreferences', 'securityAlerts')}
            label="Security Alerts"
            description="Important notifications about your account security"
            icon={Lock}
            required
          />
        </div>

        {/* Social Sharing Section */}
        <div className="space-y-3">
          <h4 className="flex items-center space-x-2 font-semibold text-foreground">
            <Share className="w-4 h-4 text-primary" />
            <span>Social & Sharing</span>
          </h4>
          
          <ToggleSwitch
            checked={privacySettings?.socialSharing?.publicProfile}
            onChange={() => handleToggle('socialSharing', 'publicProfile')}
            label="Public Profile"
            description="Make your profile visible to other JokeVault users"
            icon={Eye}
          />
          
          <ToggleSwitch
            checked={privacySettings?.socialSharing?.shareActivity}
            onChange={() => handleToggle('socialSharing', 'shareActivity')}
            label="Share Activity"
            description="Let friends see your favorite jokes and interactions"
            icon={Share}
          />
          
          <ToggleSwitch
            checked={privacySettings?.socialSharing?.allowTagging}
            onChange={() => handleToggle('socialSharing', 'allowTagging')}
            label="Allow Tagging"
            description="Let other users tag you in comments and jokes"
            icon={Users}
          />
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="p-4 space-y-2 border rounded-lg bg-primary/5 border-primary/20">
        <div className="flex items-start space-x-2">
          <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Your Data is Safe</p>
            <p className="text-muted-foreground">
              We use industry-standard encryption and never sell your personal information. 
              You can change these settings anytime in your account preferences.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Button
          onClick={handleCompleteSetup}
          variant="default"
          size="lg"
          fullWidth
          iconName="CheckCircle"
          className="comedy-timing hover-lift"
        >
          Complete Setup
        </Button>
        
        <div className="text-center">
          <button
            onClick={onComplete}
            className="text-sm transition-colors text-muted-foreground hover:text-foreground"
          >
            Skip and use default settings
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyControls;