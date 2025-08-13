import { useAuth } from '@/contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Avatar, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {
    children: React.ReactNode;
}

export default function VendorLayout({ children }: Props) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

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
                alignItems: 'center',
                padding: '1rem 3rem',
                background: '#fff',
                borderBottom: '1px solid #e0e0e0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                position: 'relative',
                zIndex: 10,
            }}>
                {/* Left: App Name */}
                <Typography
                    variant="h4"
                    fontWeight={700}
                    style={{
                        background: 'var(--bg-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    Queue4All
                </Typography>
                {/* Right: User Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Avatar
                        src={user.photoURL || ''}
                        alt={user.displayName || 'User Avatar'}
                    />

                    <div style={{ textAlign: 'left' }}>
                        <div>{user.displayName || 'No Name'}</div>
                        <div style={{ fontSize: '0.9rem', color: '#555' }}>{user.email}</div>
                    </div>

                    <Button
                        variant="text"
                        onClick={handleLogout}
                    >
                        <LogoutIcon />
                    </Button>
                </div>
            </nav>
            {/* Main Content */}
            <div>
                {children}
            </div>
        </div>
    )
}