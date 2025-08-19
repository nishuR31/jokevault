import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Scan, Shield } from 'lucide-react';
import Button from '../../../components/ui/Button';

const BiometricLogin = ({ onBiometricAuth }) => {
  const [biometricType, setBiometricType] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      // Check if Web Authentication API is supported
      if (!window.PublicKeyCredential) {
        setIsSupported(false);
        return;
      }

      // Check for available authenticator types
      const isUserVerifyingPlatformAuthenticatorAvailable = 
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      
      if (isUserVerifyingPlatformAuthenticatorAvailable) {
        setIsSupported(true);
        // Detect likely biometric type based on user agent
        const userAgent = navigator.userAgent?.toLowerCase();
        if (userAgent?.includes('iphone') || userAgent?.includes('ipad')) {
          setBiometricType('Face ID / Touch ID');
        } else if (userAgent?.includes('android')) {
          setBiometricType('Fingerprint / Face Unlock');
        } else {
          setBiometricType('Windows Hello / Touch ID');
        }
      }
    } catch (error) {
      console.log('Biometric check error:', error);
      setIsSupported(false);
    }
  };

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    
    try {
      // In a real app, you'd implement WebAuthn properly
      // This is a mock implementation for demonstration
      
      // Simulate biometric prompt delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful authentication
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        onBiometricAuth();
      } else {
        throw new Error('Biometric authentication failed');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      // In real app, show error message
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  const getBiometricIcon = () => {
    if (biometricType?.includes('Face')) {
      return Scan;
    } else if (biometricType?.includes('Touch') || biometricType?.includes('Fingerprint')) {
      return Fingerprint;
    }
    return Shield;
  };

  const BiometricIcon = getBiometricIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div className="text-center space-y-3">
        <motion.div
          className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
          animate={isAuthenticating ? { scale: [1, 1.2, 1] } : {}}
          transition={isAuthenticating ? { duration: 1, repeat: Infinity } : {}}
        >
          <BiometricIcon className="w-6 h-6 text-primary" />
        </motion.div>
        
        <Button
          onClick={handleBiometricAuth}
          variant="ghost"
          size="sm"
          loading={isAuthenticating}
          disabled={isAuthenticating}
          className="text-primary hover:text-primary/80 comedy-timing"
        >
          <span className="flex items-center space-x-2">
            <BiometricIcon className="w-4 h-4" />
            <span>
              {isAuthenticating 
                ? 'Authenticating...' 
                : `Sign in with ${biometricType}`
              }
            </span>
          </span>
        </Button>
        
        {isAuthenticating && (
          <motion.p 
            className="text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Look at your camera or place your finger on the sensor
          </motion.p>
        )}
      </div>
      {/* Divider */}
      <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or use password
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BiometricLogin;