import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import SocialAuth from './components/SocialAuth';
import HumorPreferences from './components/HumorPreferences';
import EmailVerification from './components/EmailVerification';
import PasswordReset from './components/PasswordReset';
import TwoFactorAuth from './components/TwoFactorAuth';
import PrivacyControls from './components/PrivacyControls';
import GuestBrowsePrompt from './components/GuestBrowsePrompt';

const AuthenticationPortal = () => {
  const { login, register, user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'reset', 'verify', '2fa', 'privacy', 'guest'
  const [registrationStep, setRegistrationStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.2 } },
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAuthModeChange = (mode, step = 1) => {
    setAuthMode(mode);
    setRegistrationStep(step);
    setAuthError('');
    setAuthSuccess('');
  };

  // Real Fastify API Login
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setAuthError('');
    setAuthSuccess('');
    try {
      const res = await login(credentials);
      if (res.success) {
        setAuthSuccess(`Welcome back, ${res.user?.userName || 'friend'}! Redirecting...`);
        setTimeout(() => {
          navigate('/user-dashboard');
        }, 800);
      } else {
        setAuthError(res.message || 'Invalid username/email or password.');
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please verify API connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Stepwise registration or direct submission
  const handleRegistrationComplete = async (data) => {
    const updatedUser = { ...userData, ...data };
    setUserData(updatedUser);

    if (registrationStep === 1) {
      // User finished step 1 (credentials)
      setIsLoading(true);
      setAuthError('');
      try {
        const payload = {
          userName: updatedUser.username || updatedUser.userName,
          email: updatedUser.email,
          password: updatedUser.password,
          role: updatedUser.isAdminRegister ? 'admin' : 'user',
          adminSecretKey: updatedUser.adminSecretKey,
        };
        const res = await register(payload);
        if (res.success) {
          setAuthSuccess('Account registered successfully! Personalizing humor profile...');
          setRegistrationStep(2);
        } else {
          setAuthError(res.message || 'Registration failed. Username or email might be taken.');
        }
      } catch (err) {
        setAuthError(err.message || 'Could not complete registration.');
      } finally {
        setIsLoading(false);
      }
    } else if (registrationStep === 2) {
      // Step 2 finished (humor prefs) -> Auto sign-in
      setIsLoading(true);
      try {
        const loginRes = await login({
          emailUser: updatedUser.email || updatedUser.username,
          password: updatedUser.password,
        });
        if (loginRes.success) {
          setAuthSuccess('Profile ready! Welcome to JokeVault!');
          setTimeout(() => navigate('/user-dashboard'), 700);
        } else {
          setAuthMode('login');
        }
      } catch {
        setAuthMode('login');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccess(`Connected with ${provider}. Redirecting...`);
      setTimeout(() => navigate('/homepage'), 600);
    }, 1000);
  };

  const renderModalContent = () => {
    switch (authMode) {
      case 'login':
        return (
          <LoginForm
            onSubmit={handleLogin}
            onSwitchToSignup={() => handleAuthModeChange('signup')}
            onForgotPassword={() => handleAuthModeChange('reset')}
            onGuestBrowse={() => handleAuthModeChange('guest')}
            isLoading={isLoading}
            showBiometric={isMobile}
            onBiometricLogin={() => console.log('Biometric login')}
          />
        );
      
      case 'signup':
        if (registrationStep === 1) {
          return (
            <SignupForm
              onSubmit={handleRegistrationComplete}
              onSwitchToLogin={() => handleAuthModeChange('login')}
              isLoading={isLoading}
            />
          );
        } else if (registrationStep === 2) {
          return (
            <HumorPreferences
              onSubmit={handleRegistrationComplete}
              onBack={() => setRegistrationStep(1)}
              userData={userData}
            />
          );
        }
        break;
      
      case 'verify':
        return (
          <EmailVerification
            email={userData?.email}
            onVerificationComplete={() => handleAuthModeChange('privacy')}
            onResendEmail={() => console.log('Resending email')}
          />
        );
      
      case 'reset':
        return (
          <PasswordReset
            onResetComplete={() => handleAuthModeChange('login')}
            onBackToLogin={() => handleAuthModeChange('login')}
          />
        );
      
      case '2fa':
        return (
          <TwoFactorAuth
            onSetupComplete={() => handleAuthModeChange('privacy')}
            onSkip={() => handleAuthModeChange('privacy')}
          />
        );
      
      case 'privacy':
        return (
          <PrivacyControls
            onComplete={() => setIsModalOpen(false)}
            userData={userData}
          />
        );
      
      case 'guest':
        return (
          <GuestBrowsePrompt
            onContinueAsGuest={() => setIsModalOpen(false)}
            onSignUp={() => handleAuthModeChange('signup')}
            onLogin={() => handleAuthModeChange('login')}
          />
        );
      
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (authMode) {
      case 'login':
        return 'Welcome Back!';
      case 'signup':
        if (registrationStep === 1) return 'Join the Fun!';
        if (registrationStep === 2) return 'Tell us your humor style';
        break;
      case 'verify':
        return 'Check Your Email';
      case 'reset':
        return 'Reset Password';
      case '2fa':
        return 'Secure Your Account';
      case 'privacy':
        return 'Privacy Settings';
      case 'guest':
        return 'Quick Browse';
      default:
        return 'Authentication';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-900/20 to-background flex items-center justify-center p-4">
      {/* Background elements for visual enhancement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={(e) => e?.target === e?.currentTarget && handleCloseModal()}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`glassmorphic rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden ${
                isMobile ? 'max-h-[90vh] h-auto' : 'h-auto'
              }`}
              onClick={(e) => e?.stopPropagation()}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-foreground/60 hover:text-foreground"
                onClick={handleCloseModal}
              >
                <X size={20} />
              </Button>

              {/* Modal header */}
              <div className="p-6 pb-2">
                <motion.h2
                  key={authMode + registrationStep}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-center text-foreground mb-2"
                >
                  {getModalTitle()}
                </motion.h2>
                
                {authMode === 'signup' && (
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3]?.map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          step <= registrationStep ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Authenticated user indicator */}
                {isAuthenticated && (
                  <div className="mb-4 p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-center text-xs">
                    <span className="text-muted-foreground">Currently logged in as </span>
                    <span className="font-semibold text-primary font-mono">{user?.userName}</span>
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                      {isAdmin ? 'ADMIN' : 'USER'}
                    </span>
                    <div className="mt-1.5">
                      <Link to="/user-dashboard" className="text-primary hover:underline font-medium">
                        Open Dashboard →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {authError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0 text-red-400" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Success Banner */}
                {authSuccess && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                    <span>{authSuccess}</span>
                  </div>
                )}
              </div>

              {/* Modal content */}
              <div className={`px-6 pb-6 ${isMobile ? 'max-h-[70vh] overflow-y-auto' : ''}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={authMode + registrationStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderModalContent()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Social auth section - shown for login and signup */}
              {(authMode === 'login' || (authMode === 'signup' && registrationStep === 1)) && (
                <div className="px-6 pb-6">
                  <SocialAuth 
                    onSocialAuth={handleSocialAuth}
                    isLoading={isLoading}
                    isMobile={isMobile}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Demo controls for testing different auth modes */}
      <div className="fixed bottom-4 left-4 z-40 space-y-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="glassmorphic-card"
        >
          Open Auth Portal
        </Button>
      </div>
    </div>
  );
};

export default AuthenticationPortal;