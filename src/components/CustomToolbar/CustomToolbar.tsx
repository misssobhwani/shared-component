import { Box } from '@mui/material';
import {
  ColumnsPanelTrigger,
  ExportCsv,
  ExportPrint,
  FilterPanelTrigger,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  Toolbar,
} from '@mui/x-data-grid-premium';

export interface CustomToolbarProps {
  showSearch?: boolean;
  showExport?: boolean;
  showColumns?: boolean;
  showFilter?: boolean;
  title?: string;
}

export function CustomToolbar({
  showSearch = true,
  showExport = true,
  showColumns = true,
  showFilter = true,
  title,
}: CustomToolbarProps) {
  return (
    <Toolbar>
      {title && <Box sx={{ fontWeight: 600, fontSize: 14, mr: 1 }}>{title}</Box>}
      {showSearch && (
        <QuickFilter>
          <QuickFilterControl />
          <QuickFilterClear />
        </QuickFilter>
      )}
      <Box sx={{ flex: 1 }} />
      {showColumns && <ColumnsPanelTrigger />}
      {showFilter && <FilterPanelTrigger />}
      {showExport && (
        <>
          <ExportCsv />
          <ExportPrint />
        </>
      )}
    </Toolbar>
  );
}
