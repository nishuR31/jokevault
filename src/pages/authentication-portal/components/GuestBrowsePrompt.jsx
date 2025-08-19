import React from 'react';
import { motion } from 'framer-motion';
import { Eye, UserPlus, LogIn, Star, Clock, Heart, Zap } from 'lucide-react';
import Button from '../../../components/ui/Button';

const GuestBrowsePrompt = ({ onContinueAsGuest, onSignUp, onLogin }) => {
  const guestFeatures = [
    {
      icon: Eye,
      title: "Browse Popular Jokes",
      description: "Explore our vast collection of crowd-favorite humor",
      available: true,
    },
    {
      icon: Star,
      title: "View Trending Content",
      description: "See what\'s making everyone laugh right now",
      available: true,
    },
    {
      icon: Clock,
      title: "Limited Daily Access",
      description: "Up to 20 jokes per day without an account",
      available: true,
      limitation: true,
    },
  ];

  const memberFeatures = [
    {
      icon: Heart,
      title: "Unlimited Access",
      description: "Enjoy all jokes, stories, and comedy content",
      premium: true,
    },
    {
      icon: UserPlus,
      title: "Personalized Recommendations",
      description: "Get jokes tailored to your humor preferences",
      premium: true,
    },
    {
      icon: Zap,
      title: "Save & Share Favorites",
      description: "Build your personal collection and share with friends",
      premium: true,
    },
  ];

  const ConversionPrompt = ({ delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4 space-y-3"
    >
      <div className="flex items-center space-x-2">
        <Star className="w-5 h-5 text-primary" />
        <span className="font-medium text-foreground">
          Ready for the full comedy experience?
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        Join thousands of comedy lovers who never run out of laughs! 
        Create your free account in less than 2 minutes.
      </p>
      <div className="flex space-x-2">
        <Button
          onClick={onSignUp}
          variant="default"
          size="sm"
          iconName="UserPlus"
          className="comedy-timing hover-lift"
        >
          Join Free
        </Button>
        <Button
          onClick={onLogin}
          variant="outline"
          size="sm"
          iconName="LogIn"
          className="comedy-timing hover-lift"
        >
          Sign In
        </Button>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <motion.div
          className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Eye className="w-8 h-8 text-primary" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-foreground">
          Take a Peek! 👀
        </h3>
        <p className="text-muted-foreground">
          Get a taste of JokeVault's comedy collection
        </p>
      </div>
      {/* Guest Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">As a guest, you can:</h4>
        {guestFeatures?.map((feature, index) => (
          <motion.div
            key={feature?.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start space-x-3 p-3 rounded-lg border ${
              feature?.limitation 
                ? 'border-yellow-500/30 bg-yellow-500/5' :'border-muted bg-muted/30'
            }`}
          >
            <feature.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              feature?.limitation ? 'text-yellow-500' : 'text-green-500'
            }`} />
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">
                {feature?.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <ConversionPrompt delay={0.3} />
      {/* Member Features Preview */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">With a free account:</h4>
        {memberFeatures?.map((feature, index) => (
          <motion.div
            key={feature?.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg border border-primary/20 bg-primary/5"
          >
            <feature.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">
                {feature?.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                Free
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onContinueAsGuest}
          variant="outline"
          size="lg"
          fullWidth
          iconName="Eye"
          className="comedy-timing hover-lift border-primary/50 hover:border-primary text-primary"
        >
          Continue as Guest
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onSignUp}
            variant="default"
            size="lg"
            iconName="UserPlus"
            className="comedy-timing hover-lift"
          >
            Join Free
          </Button>
          <Button
            onClick={onLogin}
            variant="secondary"
            size="lg"
            iconName="LogIn"
            className="comedy-timing hover-lift"
          >
            Sign In
          </Button>
        </div>
      </div>
      {/* Final conversion note */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          No spam, no commitments. Just pure comedy gold! 🏆
        </p>
      </div>
    </motion.div>
  );
};

export default GuestBrowsePrompt;