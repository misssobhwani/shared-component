import DensityLargeIcon from '@mui/icons-material/DensityLarge';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import ExportIcon from '@mui/icons-material/FileDownloadOutlined';
import FilterListIcon from '@mui/icons-material/FilterListOutlined';
import ViewColumnIcon from '@mui/icons-material/ViewColumnOutlined';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import {
    ColumnsPanelTrigger,
    ExportCsv,
    ExportExcel,
    FilterPanelTrigger,
    gridDensitySelector,
    Toolbar,
    ToolbarButton,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid-premium';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Styled components
// ─────────────────────────────────────────────────────────────────────────────

const StyledToolbarButton = styled(ToolbarButton)({
  borderRadius: 4,
  color: '#0077BB',
  fontSize: '0.875rem',
  paddingBlock: '4px',
  paddingInline: '5px',
  '&:hover': {
    backgroundColor: 'rgba(0, 119, 187, 0.04)',
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Individual button components
// ─────────────────────────────────────────────────────────────────────────────

interface ButtonProps {
  label?: string;
  dataQaid?: string;
}

export const GridToolbarColumnsButton: React.FC<ButtonProps> = ({
  label = 'Columns',
  dataQaid = 'grid-toolbar-columns',
}) => (
  <ColumnsPanelTrigger
    render={({ ref, ...props }) => (
      <Tooltip title={label} enterDelay={0}>
        <StyledToolbarButton
          ref={ref as any}
          {...props}
          data-qaid={dataQaid}
        >
          <Box sx={{ mr: 0.5, display: 'inline-flex' }}>
            <ViewColumnIcon fontSize="small" />
          </Box>
          {label}
        </StyledToolbarButton>
      </Tooltip>
    )}
  />
);

export const GridToolbarFilterButton: React.FC<ButtonProps> = ({
  label = 'Filters',
  dataQaid = 'grid-toolbar-filters',
}) => (
  <FilterPanelTrigger
    render={({ ref, ...props }) => (
      <Tooltip title={label} enterDelay={0}>
        <StyledToolbarButton
          ref={ref as any}
          {...props}
          data-qaid={dataQaid}
        >
          <Box sx={{ mr: 0.5, display: 'inline-flex' }}>
            <FilterListIcon fontSize="small" />
          </Box>
          {label}
        </StyledToolbarButton>
      </Tooltip>
    )}
  />
);

export const GridToolbarDensitySelector: React.FC<ButtonProps> = ({
  label = 'Density',
  dataQaid = 'grid-toolbar-density',
}) => {
  const apiRef = useGridApiContext();
  const currentDensity = useGridSelector(apiRef, gridDensitySelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDensityChange = (newDensity: 'compact' | 'standard' | 'comfortable') => {
    apiRef.current.setDensity(newDensity);
    handleClose();
  };

  return (
    <>
      <Tooltip title={label} enterDelay={0}>
        <StyledToolbarButton
          onClick={handleClick}
          data-qaid={dataQaid}
          aria-controls={anchorEl ? 'density-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
        >
          <Box sx={{ mr: 0.5, display: 'inline-flex' }}>
            <ViewHeadlineIcon fontSize="small" />
          </Box>
          {label}
        </StyledToolbarButton>
      </Tooltip>
      <Menu
        id="density-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          data-qaid="density-compact"
          onClick={() => handleDensityChange('compact')}
          selected={currentDensity === 'compact'}
        >
          <DensitySmallIcon sx={{ mr: 1, fontSize: '1.25rem' }} />
          Compact
        </MenuItem>
        <MenuItem
          data-qaid="density-standard"
          onClick={() => handleDensityChange('standard')}
          selected={currentDensity === 'standard'}
        >
          <DensityMediumIcon sx={{ mr: 1, fontSize: '1.25rem' }} />
          Standard
        </MenuItem>
        <MenuItem
          data-qaid="density-comfortable"
          onClick={() => handleDensityChange('comfortable')}
          selected={currentDensity === 'comfortable'}
        >
          <DensityLargeIcon sx={{ mr: 1, fontSize: '1.25rem' }} />
          Comfortable
        </MenuItem>
      </Menu>
    </>
  );
};

interface ExportOptions {
  csvOptions?: any;
  excelOptions?: any;
}

export const GridToolbarExport: React.FC<ButtonProps & ExportOptions> = ({
  label = 'Export',
  dataQaid = 'grid-toolbar-export',
  csvOptions,
  excelOptions,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={label} enterDelay={0}>
        <StyledToolbarButton
          onClick={handleClick}
          data-qaid={dataQaid}
          aria-controls={anchorEl ? 'export-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
        >
          <Box sx={{ mr: 0.5, display: 'inline-flex' }}>
            <ExportIcon fontSize="small" />
          </Box>
          {label}
        </StyledToolbarButton>
      </Tooltip>
      <Menu id="export-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem data-qaid="export-csv">
          <ExportCsv options={csvOptions}>CSV</ExportCsv>
        </MenuItem>
        <MenuItem data-qaid="export-excel">
          <ExportExcel options={excelOptions}>Excel</ExportExcel>
        </MenuItem>
      </Menu>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main SimpleGridToolbar — compose buttons with toggle props
// ─────────────────────────────────────────────────────────────────────────────

export interface SimpleGridToolbarProps extends ExportOptions {
  /** Show columns button */
  showColumns?: boolean;
  /** Show filters button */
  showFilters?: boolean;
  /** Show density selector */
  showDensity?: boolean;
  /** Show export button */
  showExport?: boolean;
  /** Called when the user clicks Export. Omit to hide the Export button. */
  onExport?: () => void;
  /** Label for the export button. @default 'Export' */
  exportLabel?: string;
  /** CSV export options */
  csvOptions?: any;
  /** Excel export options */
  excelOptions?: any;
}

export function SimpleGridToolbar({
  showColumns = true,
  showFilters = true,
  showDensity = true,
  showExport = true,
  onExport,
  exportLabel = 'Export',
  csvOptions,
  excelOptions,
}: SimpleGridToolbarProps) {
  return (
    <Toolbar style={{ padding: '0.5rem 1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
      {showColumns && <GridToolbarColumnsButton label="Columns" />}
      {showFilters && <GridToolbarFilterButton label="Filters" />}
      {showDensity && <GridToolbarDensitySelector label="Density" />}
      {showExport && (
        <GridToolbarExport
          label={exportLabel}
          csvOptions={csvOptions}
          excelOptions={excelOptions}
        />
      )}
      <Box sx={{ flex: 1 }} />
    </Toolbar>
  );
}
