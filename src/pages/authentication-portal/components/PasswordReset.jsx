import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle, Shield } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PasswordReset = ({ onResetComplete, onBackToLogin }) => {
  const [step, setStep] = useState(1); // 1: email, 2: security questions, 3: new password
  const [formData, setFormData] = useState({
    email: '',
    securityAnswers: {
      question1: '',
      question2: '',
    },
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const securityQuestions = [
    {
      id: 'question1',
      question: "What\'s the name of your favorite comedian?",
      placeholder: "They make you laugh the most..."
    },
    {
      id: 'question2',
      question: "What was your first joke you remember telling?",
      placeholder: "That classic childhood knee-slapper..."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    if (name.startsWith('security-')) {
      const questionId = name.replace('security-', '');
      setFormData(prev => ({
        ...prev,
        securityAnswers: {
          ...prev?.securityAnswers,
          [questionId]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear errors
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateSecurityAnswers = () => {
    const newErrors = {};
    securityQuestions?.forEach(q => {
      if (!formData?.securityAnswers?.[q?.id]) {
        newErrors[`security-${q.id}`] = 'This answer is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!formData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.newPassword !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e?.preventDefault();
    if (validateEmail()) {
      setIsLoading(true);
      // Simulate API call to check if email exists and send reset link
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 1500);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e?.preventDefault();
    if (validateSecurityAnswers()) {
      setIsLoading(true);
      // Simulate API call to verify security answers
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 1500);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e?.preventDefault();
    if (validatePassword()) {
      setIsLoading(true);
      // Simulate API call to reset password
      setTimeout(() => {
        setIsLoading(false);
        onResetComplete();
      }, 1500);
    }
  };

  const renderProgressIndicator = () => (
    <div className="flex justify-center space-x-2 mb-6">
      {[1, 2, 3]?.map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              stepNum <= step
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {stepNum < step ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              stepNum
            )}
          </div>
          {stepNum < 3 && (
            <div
              className={`w-8 h-0.5 transition-all ${
                stepNum < step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  if (step === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        {renderProgressIndicator()}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">
            Enter your email address and we'll help you reset your password
          </p>
        </div>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="Enter your registered email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="w-full"
          />

          <div className="space-y-3">
            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName="Mail"
              className="comedy-timing hover-lift"
            >
              Continue
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={onBackToLogin}
              iconName="ArrowLeft"
              className="text-muted-foreground"
            >
              Back to Sign In
            </Button>
          </div>
        </form>
      </motion.div>
    );
  }

  if (step === 2) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        {renderProgressIndicator()}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">
            Answer these security questions to verify your identity
          </p>
        </div>
        <form onSubmit={handleSecuritySubmit} className="space-y-4">
          {securityQuestions?.map((q, index) => (
            <Input
              key={q?.id}
              type="text"
              name={`security-${q?.id}`}
              label={`${index + 1}. ${q?.question}`}
              placeholder={q?.placeholder}
              value={formData?.securityAnswers?.[q?.id]}
              onChange={handleInputChange}
              error={errors?.[`security-${q?.id}`]}
              required
              className="w-full"
            />
          ))}

          <div className="space-y-3">
            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName="Shield"
              className="comedy-timing hover-lift"
            >
              Verify Identity
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={() => setStep(1)}
              iconName="ArrowLeft"
              className="text-muted-foreground"
            >
              Back
            </Button>
          </div>
        </form>
      </motion.div>
    );
  }

  if (step === 3) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        {renderProgressIndicator()}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">
            Create your new password
          </p>
        </div>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="newPassword"
              label="New Password"
              placeholder="Create a strong password"
              value={formData?.newPassword}
              onChange={handleInputChange}
              error={errors?.newPassword}
              required
              className="w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your new password"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              required
              className="w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="CheckCircle"
            className="comedy-timing hover-lift"
          >
            Reset Password
          </Button>
        </form>
      </motion.div>
    );
  }
};

export default PasswordReset;