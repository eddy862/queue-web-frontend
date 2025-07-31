import React from 'react';
import { Button, Box } from '@mui/material';

interface SocialLoginButtonProps {
  platform: string;
  IconComponent: React.ComponentType<{ width?: number; height?: number }>;
  disabled?: boolean;
  onClick?: () => void;
}

export default function SocialLoginButton({ 
  platform, 
  IconComponent, 
  disabled = false,
  onClick 
}: SocialLoginButtonProps) {
  return (
    <Button
      fullWidth
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      sx={{
        mb: 1,
        padding: '12px 16px',
        backgroundColor: '#fff',
        color: '#3c4043',
        border: '1px solid #dadce0',
        textTransform: 'none',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        transition: 'background-color 0.2s, border-color 0.2s',
        '&:hover': {
          backgroundColor: '#f8f9fa !important',
          borderColor: '#dadce0 !important',
          boxShadow: '0 2px 8px rgba(60,64,67,0.08)'
        }
      }}
    >
      <Box sx={{ 
        flex: 1, 
        textAlign: 'center', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 2, 
        fontWeight: 400 
      }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconComponent width={50} height={50} />
        </Box>
        Login with {platform}
      </Box>
    </Button>
  );
}