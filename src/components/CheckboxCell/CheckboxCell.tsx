import { Checkbox, Tooltip } from '@mui/material';
import type { GridRenderCellParams, GridValidRowModel } from '@mui/x-data-grid-premium';

export interface CheckboxCellProps {
  params: GridRenderCellParams<GridValidRowModel, boolean>;
  disabled?: boolean;
  tooltip?: string;
  onChange?: (id: string | number, value: boolean) => void;
}

export function CheckboxCell({ params, disabled = false, tooltip = '', onChange }: CheckboxCellProps) {
  const checkbox = (
    <Checkbox
      checked={Boolean(params.value)}
      disabled={disabled}
      size="small"
      onChange={(e) => onChange?.(params.id, e.target.checked)}
      onClick={(e) => e.stopPropagation()}
    />
  );

  return tooltip ? <Tooltip title={tooltip}>{checkbox}</Tooltip> : checkbox;
}
