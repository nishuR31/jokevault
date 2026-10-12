import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
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
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <Input
          type="text"
          label="Email or Username"
          placeholder="Enter your email or username"
          {...register('email', {
            required: 'Email or username is required',
            minLength: {
              value: 3,
              message: 'Must be at least 3 characters',
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
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
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
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('rememberMe')}
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