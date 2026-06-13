import { styled } from '@mui/material/styles';
import { DataGridPremium, type DataGridPremiumProps } from '@mui/x-data-grid-premium';

const StyledGrid = styled(DataGridPremium)(({ theme }) => ({
  '& .row-even': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export interface StripedDataGridProps extends DataGridPremiumProps {
  stripeEveryOther?: boolean;
}

export function StripedDataGrid({ stripeEveryOther = true, ...props }: StripedDataGridProps) {
  return (
    <StyledGrid
      {...props}
      getRowClassName={
        stripeEveryOther
          ? (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'row-even' : '')
          : props.getRowClassName
      }
    />
  );
}
