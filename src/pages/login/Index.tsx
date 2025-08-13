import {
  Box,
  Typography,
} from '@mui/material';
import SocialMediaLinks from './SocialMediaLinks';
import { X, Facebook, Instagram } from '@mui/icons-material';
import Login from './Login';

export default function LoginPage() {
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
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
      {/* Left Side - Background with Welcome Text */}
      <Box
        sx={{
          flex: 1,
          background: 'var(--bg-primary)',
          display: {xs: 'none', md: 'flex'},
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
      <Login />
    </Box>
  );
}