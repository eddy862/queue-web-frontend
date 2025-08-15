import { Star, StarHalf } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

type Props = {
    rating: number;
}

export default function Rating({ rating }: Props) {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box display="flex" alignItems="center" gap={1}>
            {Array.from({ length: 5 }, (_, index) => {
                if (index < Math.floor(rating)) {
                    return <Star key={index} style={{ color: 'gold', fontSize: isSm ? 18 : 24 }} />;
                }
                if (index === Math.floor(rating) && !Number.isInteger(rating)) {
                    return <StarHalf key={index} style={{ color: 'gold', fontSize: isSm ? 18 : 24 }} />;
                }
                return <Star key={index} style={{ color: 'lightgray', fontSize: isSm ? 18 : 24 }} />;
            })}

            <Typography variant="body1" ml={0.5} fontWeight={300}>
                {rating.toFixed(1)} / 5
            </Typography>
        </Box>
    )
}