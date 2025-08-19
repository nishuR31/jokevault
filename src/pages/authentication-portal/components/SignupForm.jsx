import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SignupForm = ({ onSubmit, onSwitchToLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
    if (!formData?.username) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, text: '' };
    
    let strength = 0;
    const checks = [
      password?.length >= 8,
      /[A-Z]/?.test(password),
      /[a-z]/?.test(password),
      /\d/?.test(password),
      /[^A-Za-z\d]/?.test(password)
    ];
    
    strength = checks?.filter(Boolean)?.length;
    
    const strengthTexts = [
      '', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'
    ];
    
    const strengthColors = [
      '', 'text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-emerald-500'
    ];
    
    return {
      strength,
      text: strengthTexts?.[strength],
      color: strengthColors?.[strength]
    };
  };

  const currentPasswordStrength = passwordStrength(formData?.password);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="username"
          label="Username"
          placeholder="Choose a funny username"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
          className="w-full"
        />

        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="your.email@example.com"
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
            placeholder="Create a strong password"
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
          
          {formData?.password && (
            <div className="mt-2">
              <div className="flex space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < currentPasswordStrength?.strength 
                        ? currentPasswordStrength?.color?.replace('text-', 'bg-')
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs mt-1 ${currentPasswordStrength?.color}`}>
                {currentPasswordStrength?.text}
              </p>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
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

        <div className="space-y-2">
          <label className="flex items-start space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData?.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 mt-0.5 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              I agree to the{' '}
              <button type="button" className="text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-primary hover:text-primary/80 transition-colors">
                Privacy Policy
              </button>
            </span>
          </label>
          {errors?.agreeToTerms && (
            <p className="text-sm text-destructive">{errors?.agreeToTerms}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          className="mt-6 comedy-timing hover-lift"
        >
          Create Account
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupForm;