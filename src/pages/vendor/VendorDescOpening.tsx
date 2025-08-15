import { Divider, Paper, Typography, Box } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import OpeningHours from './OpeningHours';

type Props = {
    vendorName: string;
    description: string;
    openingHours: Record<string, { open: string; close: string }>;
    openDesc: boolean;
    setOpenDesc: (open: boolean) => void;
}

export default function VendorDescOpening({
    vendorName,
    description,
    openingHours,
    openDesc,
    setOpenDesc
}: Props) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
          elevation={3}
          sx={{
            p: isSm ? 2 : '20px 40px',
            borderRadius: '8px',
            maxWidth: isSm ? '100%' : '500px',
            width: '100%',
            mb: isSm ? 2 : 0,
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            About {vendorName}
          </Typography>
          <Typography variant="body2" color="var(--text-gray)" fontWeight={300}>
            {description.length > 100 ? (
              <>
                {openDesc ? (
                  <>
                    {description}{' '}
                    <span
                      style={{ color: '#1976d2', cursor: 'pointer' }}
                      onClick={() => setOpenDesc(false)}
                    >
                      Show less
                    </span>
                  </>
                ) : (
                  <>
                    {description.slice(0, 100)}...{' '}
                    <span
                      style={{ color: '#1976d2', cursor: 'pointer' }}
                      onClick={() => setOpenDesc(true)}
                    >
                      Read more
                    </span>
                  </>
                )}
              </>
            ) : (
              description
            )}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight={600}>
            Opening Hours
          </Typography>
          <OpeningHours openingHours={openingHours} />
        </Paper>
  )
}