import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  CircularProgress,
  Divider,
  InputAdornment
} from '@mui/material';
import SocialMediaLinks from './SocialMediaLinks';
import { X, Facebook, Instagram, MailOutlineRounded, LockOutlineRounded, ArrowForward } from '@mui/icons-material';
import FacebookLoginIcon from '@/svgs/fb_login.svg?react';
import GoogleLoginIcon from '@/svgs/google_login.svg?react';
import SocialLoginButton from './SocialLoginButton';

export default function LoginPage() {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [isLoginMode, setisLoginMode] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!isLoginMode && password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      if (isLoginMode) {
        await login(email, password);
        setSuccess('Logged in successfully!');
      } else {
        await signup(email, password);
        setSuccess('Account created successfully!');
      }
    } catch (err: any) {
      console.error(err.code);

      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email format');
          break;
        case 'auth/invalid-credential':
          setError('Invalid email or password');
          break;
        case 'auth/email-already-in-use':
          setError('Email already in use');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters');
          break;
        default:
          setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setisLoginMode(!isLoginMode);
    setError(null);
    setSuccess(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const socialLinks = [
    {
      url: "https://x.com/",
      icon: <X />,
      alt: "X (formerly Twitter)"
    },
    {
      url: "https://facebook.com/",
      icon: <Facebook />,
      alt: "Facebook"
    },
    {
      url: "https://instagram.com/",
      icon: <Instagram />,
      alt: "Instagram"
    }
  ];

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Side - Background with Welcome Text */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(0deg, #FFA20C 0%, #F24320 50%, #E53935 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: 'white',
          padding: 6
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top: App Name */}
          <Box>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Queue4All
            </Typography>
          </Box>

          {/* Middle: Welcoming Text */}
          <Box>
            <Typography variant="h2" component="h2" fontWeight={600} sx={{ opacity: 0.9 }}>
              Welcome back!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, opacity: 0.8 }}>
              No. 1 Queue Management Platform in Malaysia
            </Typography>
          </Box>
        </Box>

        {/* Bottom: Social Media Links */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5, justifyContent: 'flex-end' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Follow us on
          </Typography>
          <SocialMediaLinks links={socialLinks} />
        </Box>
      </Box>

      {/* Right Side - Login/Signup Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          backgroundColor: '#fff'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
          <Typography component="h1" variant="h4" align="left" gutterBottom fontWeight={600}>
            {isLoginMode ? 'Sign in' : 'Sign Up'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">
                    <MailOutlineRounded sx={{ color: '#666' }} />
                  </InputAdornment>
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">
                    <LockOutlineRounded sx={{ color: '#666' }} />
                  </InputAdornment>
                }
              }}
            />
            {!isLoginMode && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">
                      <LockOutlineRounded sx={{ color: '#666' }} />
                    </InputAdornment>
                  }
                }}
              />
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  width: '80%',
                  minHeight: '48px',
                  padding: '12px 32px',
                  letterSpacing: '1.5px',
                  borderRadius: '12px',
                  position: 'relative',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #FA2A12 0%, #F67B0E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: 'white' }} />
                ) : (
                  <>
                    <span style={{ flex: 1, textAlign: 'center' }}>
                      {isLoginMode ? 'Sign in' : 'Sign up'}
                    </span>
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 24,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ArrowForward fontSize='small' sx={{ color: 'white' }} />
                    </Box>
                  </>
                )}
              </Button>
            </Box>

            {/* Error and Success Messages */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}

            {/* Or Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', my: 2, mt: 4 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="body2" sx={{ px: 2, color: 'text.secondary', textTransform: 'uppercase', fontWeight: 500 }}>
                or
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* Social Login Buttons */}
            <SocialLoginButton
              platform="Google"
              IconComponent={GoogleLoginIcon}
              disabled={loading}
              onClick={() => {
                // Add your Google login logic here
                console.log('Google login clicked');
              }}
            />

            <SocialLoginButton
              platform="Facebook"
              IconComponent={FacebookLoginIcon}
              disabled={loading}
              onClick={() => {
                // Add your Facebook login logic here
                console.log('Facebook login clicked');
              }}
            />

            {/* Switch between Login and Signup */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2">
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={handleModeSwitch}
                  disabled={loading}
                  sx={{
                    textDecoration: 'underline',
                    opacity: loading ? 0.5 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    color: '#E8250E'
                  }}
                >
                  {isLoginMode ? 'Sign Up' : 'Sign In'}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}