import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SignupForm = ({ onSubmit, onSwitchToLogin, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAdminRegister: false,
      adminSecretKey: '',
      agreeToTerms: false,
    },
    mode: 'onTouched',
  });

  const passwordValue = watch('password', '');
  const isAdminRegister = watch('isAdminRegister', false);

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, text: '' };
    
    let strength = 0;
    const checks = [
      password?.length >= 8,
      /[A-Z]/?.test(password),
      /[a-z]/?.test(password),
      /\d/?.test(password),
      /[^A-Za-z\d]/?.test(password),
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
      color: strengthColors?.[strength],
    };
  };

  const currentPasswordStrength = passwordStrength(passwordValue);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <Input
          type="text"
          label="Username"
          placeholder="Choose a funny username"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          })}
          error={errors?.username?.message}
          required
          className="w-full"
        />

        <Input
          type="email"
          label="Email"
          placeholder="your.email@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email',
            },
          })}
          error={errors?.email?.message}
          required
          className="w-full"
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Create a strong password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              validate: {
                hasNumber: (v) => /\d/.test(v) || 'Must contain at least one number [0-9]',
                hasLowercase: (v) => /[a-z]/.test(v) || 'Must contain at least one lowercase letter',
              },
            })}
            error={errors?.password?.message}
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
          
          {passwordValue && (
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
            label="Confirm Password"
            placeholder="Confirm your password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) => val === passwordValue || 'Passwords do not match',
            })}
            error={errors?.confirmPassword?.message}
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

        <div className="pt-2 border-t border-white/10">
          <label className="flex items-center space-x-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground">
            <input
              type="checkbox"
              {...register('isAdminRegister')}
              className="w-3.5 h-3.5 rounded border border-input bg-background text-primary"
            />
            <span>Register as Administrator / Developer (Optional)</span>
          </label>
          
          {isAdminRegister && (
            <div className="mt-2">
              <Input
                type="password"
                label="Admin Secret Key"
                placeholder="Enter admin secret (e.g. developer)"
                {...register('adminSecretKey')}
                className="w-full text-xs"
              />
              <p className="text-[11px] text-primary/80 mt-1">
                Tip: Enter &quot;developer&quot; in development mode to receive full admin role.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-start space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('agreeToTerms', {
                required: 'You must agree to the terms and conditions',
              })}
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
            <p className="text-sm text-destructive">{errors?.agreeToTerms?.message}</p>
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