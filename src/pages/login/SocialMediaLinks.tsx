import React from 'react';
import { Box, Link, IconButton } from '@mui/material';

interface SocialLink {
    url: string;
    icon: React.ReactElement;
    alt: string;
}

interface Props {
    links: SocialLink[];
}

export default function SocialMediaLinks({ links }: Props) {
    return (
        <>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener"
                        color="inherit"
                        underline="none"
                    >
                        <IconButton
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: 'white',
                                color: '#666',
                                boxShadow: 1,
                                transition: 'all 0.2s',
                                '&:hover': {
                                    boxShadow: 3,
                                    backgroundColor: 'white',
                                    transform: 'translateY(-2px)'
                                },
                                '& .MuiSvgIcon-root': {
                                    fontSize: '18px'  
                                }
                            }}
                        >
                            {link.icon}
                        </IconButton>
                    </Link>
                ))}
            </Box>
        </>
    );
}