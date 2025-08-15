import { formatEstimatedWaitTime } from '@/utils';
import { AccessTimeOutlined, PeopleOutline } from '@mui/icons-material';
import { Box, Button, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';

type Props = {
    queueLength: number;
}

export default function QueueEntry({ queueLength }: Props) {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper
            elevation={3}
            sx={{
                p: isSm ? 2 : 3,
                borderRadius: '8px',
                maxWidth: isSm ? '100%' : '500px',
                minWidth: isSm ? 'unset' : '300px',
                width: '100%',
            }}
        >
            <Box display="flex" gap={isSm ? 2 : 3} justifyContent="space-around" flexDirection={isSm ? "column" : "row"}>
                <Box display="flex" flexDirection="column" alignItems="flex-start" mb={isSm ? 2 : 0}>
                    <Typography color='var(--text-gray)' variant="body2" fontSize={12} fontWeight={400} gutterBottom>
                        Queue Status
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <PeopleOutline fontSize={isSm ? "small" : "medium"} />
                        <Typography variant="body1" sx={{ ml: 1, fontSize: isSm ? 14 : 16 }}>
                            x {queueLength}
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="flex-start">
                    <Typography color='var(--text-gray)' variant="body2" fontSize={12} fontWeight={400} gutterBottom>
                        Estimated Wait Time
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <AccessTimeOutlined fontSize={isSm ? "small" : "medium"} />
                        <Typography variant="body1" sx={{ ml: 1, fontSize: isSm ? 14 : 16 }}>
                            {formatEstimatedWaitTime(queueLength, 5)}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Button
                fullWidth
                variant="contained"
                sx={{
                    background: "var(--button-primary)",
                    borderRadius: '8px',
                    fontWeight: 400,
                    mt: 3,
                    fontSize: isSm ? 14 : 16,
                    py: isSm ? 1 : 1.5,
                }}
            >
                Join Queue
            </Button>
        </Paper>
    )
}