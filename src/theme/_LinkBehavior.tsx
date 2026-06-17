import { useTheme } from '@mui/material/styles';
import { forwardRef } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';

const LinkBehavior = forwardRef<
  any,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to']; component: React.ElementType }
>((props, ref) => {
  const { href, style, ...other } = props;
  const resolved = useResolvedPath(href);
  const match = useMatch({ path: resolved.pathname, end: true });
  const theme = useTheme();

  // Map href (MUI) -> to (react-router)
  return (
    <RouterLink
      ref={ref}
      to={href}
      style={{ ...style, color: href && match ? theme.palette.primary.main : '' }}
      {...other}
    />
  );
});

export default LinkBehavior;
