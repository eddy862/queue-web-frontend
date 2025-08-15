import { Box, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

type Props = {
    openingHours: Record<string, { open: string; close: string }>
}

export default function OpeningHours({ openingHours }: Props) {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Typography variant="body2" color='var(--text-gray)' fontWeight={300}>
            {
                (() => {
                    const todayIndex = new Date().getDay();
                    const daysOfWeek = Object.keys(openingHours) as Array<keyof typeof openingHours>;

                    return (
                        <Box component="table">
                            <tbody>
                                {daysOfWeek.map((day, idx) => {
                                    const hours = openingHours[day] as any;
                                    if (!hours) return null;
                                    const isToday = idx === todayIndex;
                                    return (
                                        <tr key={day}>
                                            <td style={{
                                                padding: isSm ? '2px 8px 2px 0' : '2px 16px 2px 0',
                                                color: isToday ? 'black' : 'inherit',
                                                fontWeight: isToday ? 600 : 300,
                                                whiteSpace: 'nowrap',
                                                verticalAlign: 'top',
                                                fontSize: isSm ? 12 : 14,
                                            }}>
                                                {day.charAt(0).toUpperCase() + day.slice(1)}
                                            </td>
                                            <td style={{
                                                padding: '2px 0',
                                                fontWeight: isToday ? 600 : 300,
                                                verticalAlign: 'top',
                                                color: isToday ? 'black' : 'inherit',
                                                fontSize: isSm ? 12 : 14,
                                            }}>
                                                {hours.open} - {hours.close}
                                                {isToday && (
                                                    <span style={{ color: '#388e3c', marginLeft: 8 }}>(Today)</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Box>
                    );
                })()
            }
        </Typography>
    )
}