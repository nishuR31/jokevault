import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, RefreshCw, CheckCircle, Clock, Smile } from 'lucide-react';
import Button from '../../../components/ui/Button';


const EmailVerification = ({ email, onVerificationComplete, onResendEmail }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verificationJoke, setVerificationJoke] = useState('');

  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything! ",
    "I told my wife she was drawing her eyebrows too high. She looked surprised! ",
    "Why don't skeletons fight each other? They don't have the guts! ",
    "What do you call a fake noodle? An impasta! ",
    "Why did the scarecrow win an award? He was outstanding in his field! "
  ];

  useEffect(() => {
    // Set a random joke on mount
    setVerificationJoke(jokes?.[Math.floor(Math.random() * jokes?.length)]);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleCodeChange = (index, value) => {
    if (value?.length <= 1 && /^\d*$/?.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !verificationCode?.[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const paste = e?.clipboardData?.getData('text');
    if (/^\d{6}$/?.test(paste)) {
      setVerificationCode(paste?.split(''));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const code = verificationCode?.join('');
    if (code?.length === 6) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onVerificationComplete();
      }, 1500);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setTimeLeft(60);
    setCanResend(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      onResendEmail();
      // Set new joke
      setVerificationJoke(jokes?.[Math.floor(Math.random() * jokes?.length)]);
    }, 1000);
  };

  const isCodeComplete = verificationCode?.every(digit => digit !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-3 text-center">
        <motion.div
          className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Mail className="w-8 h-8 text-primary" />
        </motion.div>
        
        <div>
          <p className="text-muted-foreground">
            We've sent a verification code to:
          </p>
          <p className="font-medium text-foreground">{email}</p>
        </div>
      </div>
      {/* Verification Joke */}
      <motion.div
        className="p-4 text-center rounded-lg bg-muted/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-center mb-2 space-x-2">
          <Smile className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">
            While you wait, here's a joke:
          </span>
        </div>
        <p className="text-sm text-foreground">{verificationJoke}</p>
      </motion.div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-center text-foreground">
            Enter the 6-digit code
          </label>
          
          <div className="flex justify-center space-x-2" onPaste={handlePaste}>
            {verificationCode?.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(index, e?.target?.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-lg font-semibold text-center transition-all border rounded-lg border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                autoComplete="one-time-code"
              />
            ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!isCodeComplete}
          iconName="CheckCircle"
          className="comedy-timing hover-lift"
        >
          Verify Email
        </Button>
      </form>
      <div className="space-y-3 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            {canResend ? (
              "Ready to resend"
            ) : (
              `Resend available in ${timeLeft}s`
            )}
          </span>
        </div>

        <Button
          variant="ghost"
          onClick={handleResend}
          disabled={!canResend}
          loading={isResending}
          iconName="RefreshCw"
          className="text-primary hover:text-primary/80"
        >
          {isResending ? 'Sending...' : 'Resend code'}
        </Button>

        <p className="text-xs text-muted-foreground">
          Didn't receive the email? Check your spam folder or{' '}
          <button
            type="button"
            className="transition-colors text-primary hover:text-primary/80"
            onClick={() => console.log('Contact support')}
          >
            contact support
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default EmailVerification;