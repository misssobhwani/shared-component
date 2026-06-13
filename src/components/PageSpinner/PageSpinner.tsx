import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

export interface PageSpinnerProps {
  open: boolean;
  message?: string;
  size?: number;
  color?: 'primary' | 'secondary' | 'inherit';
}

export function PageSpinner({ open, message, size = 56, color = 'inherit' }: PageSpinnerProps) {
  return (
    <Backdrop open={open} sx={{ color: '#fff', zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={size} color={color} />
        {message && (
          <Typography variant="body1" color="inherit">
            {message}
          </Typography>
        )}
      </Box>
    </Backdrop>
  );
}
