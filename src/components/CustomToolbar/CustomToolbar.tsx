import { Box } from '@mui/material';

import {
  GridToolbarColumnsButton,

  GridToolbarContainer,

  GridToolbarExport,

  GridToolbarFilterButton,

  GridToolbarQuickFilter,
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

    <GridToolbarContainer>

      {title && (

        <Box sx={{ fontWeight: 600, fontSize: 14, mr: 1 }}>{title}</Box>

      )}

      {showColumns && <GridToolbarColumnsButton />}

      {showFilter && <GridToolbarFilterButton />}

      {showExport && <GridToolbarExport />}

      <Box sx={{ flex: 1 }} />

      {showSearch && <GridToolbarQuickFilter />}

    </GridToolbarContainer>

  );

}