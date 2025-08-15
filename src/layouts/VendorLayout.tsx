import { useAuth } from '@/contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Avatar, Button, Typography, useMediaQuery, useTheme, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {
    children: React.ReactNode;
}

export default function VendorLayout({ children }: Props) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogout = () => {
        logout();
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    }

    // // Redirect to login if not logged in
    // useEffect(() => {
    //     if (!user) {
    //         navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    //     }
    // }, [user, location, navigate]);

    if (!user) return null; // Prevent rendering until redirect

    return (
        <div>
            {/* Navbar */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: isSm ? '0.75rem 1rem' : '1rem 3rem',
                background: '#fff',
                borderBottom: '1px solid #e0e0e0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                position: 'relative',
                zIndex: 10,
                gap: 0,
            }}>
                {/* Left: App Name */}
                <Typography
                    variant={isSm ? "h5" : "h4"}
                    fontWeight={700}
                    style={{
                        background: 'var(--bg-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                        marginBottom: isSm ? '0.5rem' : 0,
                    }}
                >
                    Queue4All
                </Typography>
                {/* Right: User Info */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isSm ? '0.5rem' : '1rem',
                    flexDirection: isSm ? 'row' : 'row',
                    justifyContent: 'flex-end',
                    width: isSm ? '100%' : 'auto',
                }}>
                    <Avatar
                        src={user.photoURL || ''}
                        alt={user.displayName || 'User Avatar'}
                        sx={{ width: isSm ? 32 : 40, height: isSm ? 32 : 40 }}
                    />

                    {!isSm && (
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '1rem', fontWeight: 500 }}>{user.displayName || 'No Name'}</div>
                            <div style={{ fontSize: '0.9rem', color: '#555' }}>{user.email}</div>
                        </div>
                    )}

                    {isSm && (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1 }}>{user.displayName || 'No Name'}</div>
                        </div>
                    )}

                    <IconButton
                        aria-label="Logout"
                        onClick={handleLogout}
                        size={isSm ? "small" : "medium"}
                        sx={{ ml: isSm ? 0 : 1 }}
                    >
                        <LogoutIcon fontSize={isSm ? "small" : "medium"} />
                    </IconButton>
                </div>
            </nav>
            {/* Main Content */}
            <div>
                {children}
            </div>
        </div>
    )
}