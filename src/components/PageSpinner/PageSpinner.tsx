// import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

// export interface PageSpinnerProps {
//   open: boolean;
//   message?: string;
//   size?: number;
//   color?: 'primary' | 'secondary' | 'inherit';
// }

// export function PageSpinner({ open, message, size = 56, color = 'inherit' }: PageSpinnerProps) {
//   return (
//     <Backdrop open={open} sx={{ color: '#fff', zIndex: (t) => t.zIndex.drawer + 1 }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
//         <CircularProgress size={size} color={color} />
//         {message && (
//           <Typography variant="body1" color="inherit">
//             {message}
//           </Typography>
//         )}
//       </Box>
//     </Backdrop>
//   );
// }


import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export interface PageSpinnerProps {
  overlay?: boolean;
  message?: string;
}

const PageSpinner = ({
  overlay = false,
  message = 'Loading...',
}: PageSpinnerProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: overlay ? '100vh' : '60vh',
      ...(overlay
        ? {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 9999,
          }
        : {}),
    }}
  >
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="secondary" aria-label="loading" size="5rem" />
      {message && (
        <Typography component="h1" variant="h4" sx={{ mt: 3 }}>
          {message}
        </Typography>
      )}
    </Box>
  </Box>
);

export default PageSpinner;