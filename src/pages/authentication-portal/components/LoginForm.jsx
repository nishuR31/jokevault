import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import BiometricLogin from './BiometricLogin';

const LoginForm = ({ 
  onSubmit, 
  onSwitchToSignup, 
  onForgotPassword, 
  onGuestBrowse, 
  isLoading, 
  showBiometric,
  onBiometricLogin 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {showBiometric && (
        <BiometricLogin onBiometricAuth={onBiometricLogin} />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
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

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </label>
          
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          className="mt-6 comedy-timing hover-lift"
        >
          Sign In
        </Button>
      </form>
      <div className="text-center space-y-3">
        <button
          onClick={onGuestBrowse}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors comedy-timing"
        >
          Just browsing? <span className="text-primary">Continue as guest</span>
        </button>
        
        <p className="text-sm text-muted-foreground">
          New to JokeVault?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Create account
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;