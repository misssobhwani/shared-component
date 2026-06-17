import {
  DataGridPremium,
  type DataGridPremiumProps,
  type GridDensity,
  type GridRowClassNameParams,
  type GridValidRowModel,
} from '@mui/x-data-grid-premium';

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

export interface StripedDataGridProps<R extends GridValidRowModel = GridValidRowModel>
  extends DataGridPremiumProps<R> {
  /**
   * Alternate row background shading (theme.palette.action.hover).
   * @default true
   */
  stripeEveryOther?: boolean;

  /**
   * Show the MUI built-in toolbar (column visibility, export, density picker).
   * For a custom toolbar pass it via slots.toolbar instead.
   * @default false
   */
  showToolbar?: boolean;

  /**
   * Row density — set as initialState default, consumer initialState.density overrides.
   * @default 'compact'
   */
  defaultDensity?: GridDensity;

  /**
   * Additional sx merged safely on top of the Dematic base styles.
   * Use for repo-level dynamic column colors or one-off layout tweaks.
   *
   * Merge order: baseStyles → extraSx → consumer sx (last-wins per MUI array sx).
   *
   * @example
   * extraSx={{ '.color-ff9800': { backgroundColor: '#ff9800' } }}
   */
  extraSx?: DataGridPremiumProps['sx'];
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function StripedDataGrid<R extends GridValidRowModel = GridValidRowModel>({
  // ── Custom props ──────────────────────────────────────────────────────────
  stripeEveryOther = true,
  showToolbar = false,
  defaultDensity = 'compact',
  extraSx,

  // ── MUI props we need to merge ────────────────────────────────────────────
  getRowClassName,
  slots,
  initialState,
  sx,

  // ── Everything else forwarded as-is ───────────────────────────────────────
  ...rest
}: StripedDataGridProps<R>) {

  // ── getRowClassName: stripe first, consumer class appended ────────────────
  const mergedGetRowClassName = (params: GridRowClassNameParams<R>): string => {
    const classes: string[] = [];
    if (stripeEveryOther && params.indexRelativeToCurrentPage % 2 === 0) {
      classes.push('row-even');
    }
    const consumerClass = getRowClassName?.(params);
    if (consumerClass) classes.push(consumerClass);
    return classes.join(' ');
  };

  // ── slots: consumer always wins ───────────────────────────────────────────
  const mergedSlots: DataGridPremiumProps['slots'] = { ...slots };

  // ── initialState: our density is the fallback, consumer wins ──────────────
  const mergedInitialState: DataGridPremiumProps['initialState'] = {
    density: defaultDensity,
    ...initialState,
  };

  // ── sx: theme callback → extraSx → consumer sx ───────────────────────────
  // Using MUI's theme callback in the sx array means no useTheme() needed —
  // MUI resolves it automatically at render time.
  const mergedSx: DataGridPremiumProps['sx'] = [
    (theme) => ({
      // Striping
      '& .row-even': {
        backgroundColor: theme.palette.action.hover,
      },
      // Cell state hooks — consumers apply these via cellClassName on columns
      '& .cell-override': { fontWeight: 'bold' },
      '& .cell-error':    { backgroundColor: 'rgba(255, 100, 100, 0.49)' },
      '& .cell-editable': { backgroundColor: '#fff5dc', cursor: 'pointer' },
      '& .cell-editable.MuiDataGrid-cell--editing': { backgroundColor: '#fff59d' },
      // Aggregation totals row — blue bold, matches your app
      '& .MuiDataGrid-row--aggregation .MuiDataGrid-cell': {
        color: theme.palette.primary.main,
        fontWeight: 600,
      },
      // Column header soft accent
      '& .MuiDataGrid-HeaderSoftAccent': {
        backgroundColor: theme.palette.grey[100],
      },
    }),
    // Repo-level extra styles (dynamic column colors, screen-specific tweaks)
    ...(extraSx ? (Array.isArray(extraSx) ? extraSx : [extraSx]) : []),
    // Consumer sx — always wins
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ];

  return (
    <DataGridPremium<R>
      // ── Dematic defaults (all overridable via ...rest) ─────────────────────
      hideFooter
      disableRowSelectionOnClick
      // ── Merged ────────────────────────────────────────────────────────────
      getRowClassName={mergedGetRowClassName}
      slots={mergedSlots}
      initialState={mergedInitialState}
      sx={mergedSx}
      showToolbar={showToolbar}
      // ── Consumer props — override everything above ─────────────────────────
      {...rest}
    />
  );
}
