import { Box, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { LocationOnOutlined, Star, StarHalf } from '@mui/icons-material';
import Rating from './Rating';

type Props = {
    vendorName: string;
    rating: number;
    open: boolean;
    closeTime: string;
    location: string;
}

export default function CarouselOverlay({ vendorName, rating, open, closeTime, location }: Props) {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap={isSm ? 0 : isMd ? 1 : 2}
                sx={{
                    position: 'absolute',
                    bottom: isSm ? '16px' : '30px',
                    left: isSm ? '16px' : isMd ? '40px' : '200px',
                    color: 'white',
                    width: isSm ? 'calc(100% - 32px)' : 'auto',
                    zIndex: 2,
                }}
            >
                <Typography variant={isSm ? "h5" : isMd ? "h4" : "h2"} fontWeight={700}>{vendorName}</Typography>

                <Rating rating={rating} />

                <Box display="flex" alignItems="center" gap={4}>
                    <Typography variant="body1" fontWeight={300} color={open ? "#34C759" : "red"}>
                        {open ? "Open now" : "Closed"}
                    </Typography>

                    {open && (
                        <Typography variant="body1" fontWeight={300} color="white">
                            Closes at {closeTime}
                        </Typography>
                    )}
                </Box>
            </Box>

            <Box
                display="flex"
                gap={1}
                sx={{
                    position: 'absolute',
                    bottom: isSm ? '16px' : '30px',
                    right: isSm ? '16px' : isMd ? '40px' : '200px',
                    color: 'white',
                    zIndex: 2,
                    alignItems: 'center',
                    fontSize: isSm ? 14 : 16,
                    maxWidth: isSm ? '60%' : 'none',
                }}
            >
                <LocationOnOutlined fontSize={isSm ? "small" : "medium"} />
                <Typography variant="body1" fontWeight={300} sx={{
                    fontSize: isSm ? 12 : 16,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {location}
                </Typography>
            </Box>
        </>
    )
}