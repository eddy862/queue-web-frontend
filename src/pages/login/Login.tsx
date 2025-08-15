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

import { MailOutlineRounded, LockOutlineRounded, ArrowForward } from '@mui/icons-material';
import FacebookLoginIcon from '@/svgs/fb_login.svg?react';
import GoogleLoginIcon from '@/svgs/google_login.svg?react';
import SocialLoginButton from './SocialLoginButton';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
    const { login, signup, loginWithGoogle, loginWithFacebook } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isLoginMode, setisLoginMode] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('redirect') || '/';

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
                navigate(redirectPath);
            } else {
                await signup(email, password);
                setSuccess('Account created successfully!');
            }
        } catch (err: any) {
            console.error(err.code);
            setError(err.message);
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

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        setLoading(true);

        try {
            await loginWithGoogle();
            navigate(redirectPath);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
        setLoading(true);
        setError(null);
        setLoading(true);

        try {
            await loginWithFacebook();
            navigate(redirectPath);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                flex: { xs: 'none', md: 1 },
                width: { xs: '100%', md: 'auto' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { xs: 2, sm: 3, md: 4 },
                backgroundColor: '#fff',
                minHeight: { xs: '100vh', md: 'auto' },
            }}
        >
            {/* Mobile Header - Show only on small screens */}
            <Box sx={{
                display: { xs: 'block', md: 'none' },
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                mb: 6
            }}>
                <Typography variant="h4" component="h1" fontWeight={700} sx={{
                    background: 'linear-gradient(0deg, #FFA20C 0%, #F24320 50%, #E53935 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                }}>
                    Queue4All
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    No. 1 Queue Management Platform in Malaysia
                </Typography>
            </Box>

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
                                background: 'var(--button-primary)',
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
                        onClick={handleGoogleLogin}
                    />

                    <SocialLoginButton
                        platform="Facebook"
                        IconComponent={FacebookLoginIcon}
                        disabled={loading}
                        onClick={handleFacebookLogin}
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
                                    color: 'var(--text-primary)'
                                }}
                            >
                                {isLoginMode ? 'Sign Up' : 'Sign In'}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}