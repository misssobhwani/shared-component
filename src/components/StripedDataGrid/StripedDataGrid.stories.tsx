import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { StripedDataGrid } from './StripedDataGrid';
import {SimpleGridToolbar} from './SimpleGridToolbar';
import type { GridColDef } from '@mui/x-data-grid-premium';

// ─────────────────────────────────────────────────────────────────────────────
// Theme decorator
// Swap dematicTheme for your real shared theme import once it's published —
// then Storybook and your app render pixel-identical.
// ─────────────────────────────────────────────────────────────────────────────

const dematicTheme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    grey: { 100: '#f5f5f5' },
    action: { hover: 'rgba(0,0,0,0.04)' },
  },
  typography: {
    fontSize: 13,
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: { fontSize: '0.8125rem', border: '1px solid #e0e0e0' },
        columnHeader: { backgroundColor: '#fafafa', fontWeight: 600 },
      },
    },
  },
});

const withTheme = (Story: React.ComponentType) => (
  <ThemeProvider theme={dematicTheme}>
    <CssBaseline />
    <Box sx={{ p: 2, bgcolor: '#fff' }}>
      <Story />
    </Box>
  </ThemeProvider>
);

// ─────────────────────────────────────────────────────────────────────────────
// Sample data — 5 columns, matches the Description/WBS/Activity/CostCenter/Rate
// screenshot exactly
// ─────────────────────────────────────────────────────────────────────────────

interface Row {
  id: number;
  description: string;
  wbs: string;
  activityType: string;
  costCenter: string;
  rate: number;
  currency: string;
}

const rows: Row[] = [
  { id: 1, description: 'MS - Mechanical Hardware',  wbs: '1000663-0-0-A1-2801', activityType: 'Engineering', costCenter: '2801', rate: 1,    currency: 'USD' },
  { id: 2, description: 'CS - Controls Software',    wbs: '1000663-0-0-A1-3100', activityType: 'Software',    costCenter: '3100', rate: 0.85, currency: 'USD' },
  { id: 3, description: 'PM - Project Management',   wbs: '1000663-0-0-A1-8090', activityType: 'PM',          costCenter: '8090', rate: 1,    currency: 'USD' },
  { id: 4, description: 'EE - Electrical Engineer',  wbs: '1000663-0-0-A1-2802', activityType: 'Engineering', costCenter: '2802', rate: 0.95, currency: 'USD' },
  { id: 5, description: 'IN - Installation Labor',   wbs: '1000663-0-0-A1-5500', activityType: 'Field',       costCenter: '5500', rate: 1.1,  currency: 'USD' },
];

const columns: GridColDef<Row>[] = [
  { field: 'description', headerName: 'Description', flex: 2, minWidth: 220 },
  { field: 'wbs', headerName: 'WBS', flex: 1.5, minWidth: 200 },
  { field: 'activityType', headerName: 'Activity Type', flex: 1, minWidth: 130 },
  { field: 'costCenter', headerName: 'Cost Center', flex: 1, minWidth: 110 },
  { field: 'rate', headerName: 'Rate', type: 'number', width: 90, align: 'right', headerAlign: 'right' },
  { field: 'currency', headerName: 'Currency', width: 100 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Grouping demo data — reuses the same shape, grouped by activityType
// ─────────────────────────────────────────────────────────────────────────────

const groupedRows: Row[] = [
  ...rows,
  { id: 6, description: 'MS - Hydraulic Hardware', wbs: '1000663-0-0-A1-2803', activityType: 'Engineering', costCenter: '2803', rate: 1, currency: 'USD' },
  { id: 7, description: 'CS - PLC Programming',    wbs: '1000663-0-0-A1-3101', activityType: 'Software',    costCenter: '3101', rate: 0.9, currency: 'USD' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta<typeof StripedDataGrid<Row>> = {
  title: 'Components/StripedDataGrid',
  component: StripedDataGrid,
  decorators: [withTheme],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## StripedDataGrid

A thin wrapper around MUI \`DataGridPremium\`. Drop it in anywhere
\`DataGridPremium\` is used today — every prop still works.

\`\`\`tsx
import { StripedDataGrid } from '@dematic/shared-components';

<StripedDataGrid rows={rows} columns={columns} />
\`\`\`

### What's built in
- Compact density + alternating row stripes
- \`hideFooter\`, \`disableRowSelectionOnClick\`
- CSS hooks: \`.cell-editable\` (yellow), \`.cell-error\` (red), \`.cell-override\` (bold)
- Aggregation totals row in theme primary color

This page walks through the three things most repos ask for: a plain grid,
adding a toolbar, and grouping rows with totals.
        `,
      },
    },
  },
  args: {
    rows,
    columns,
  },
  argTypes: {
    stripeEveryOther: { control: 'boolean', description: 'Alternate row shading' },
    showToolbar: { control: 'boolean', description: 'MUI built-in toolbar (quick way, no custom component needed)' },
    defaultDensity: {
      control: 'select',
      options: ['compact', 'standard', 'comfortable'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StripedDataGrid<Row>>;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Plain grid — no toolbar, no grouping
// ─────────────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  name: '1. Basic grid',
  parameters: {
    docs: {
      description: {
        story: `
The simplest possible usage — just rows and columns.

\`\`\`tsx
<StripedDataGrid rows={rows} columns={columns} />
\`\`\`
        `,
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. With toolbar — two ways shown
// ─────────────────────────────────────────────────────────────────────────────

export const WithBuiltInToolbar: Story = {
  name: '2a. Toolbar — built-in (showToolbar)',
  args: {
    showToolbar: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Fastest option — just flip on \`showToolbar\`. Gives you Columns, Filters,
Density, and Export automatically, no extra component needed.

\`\`\`tsx
<StripedDataGrid rows={rows} columns={columns} showToolbar />
\`\`\`
        `,
      },
    },
  },
};

export const WithCustomToolbar: Story = {
  name: '2b. Toolbar — custom (matches your screenshot)',
  args: {
    slots: {
      toolbar: () => <SimpleGridToolbar onExport={() => alert('Export clicked')} />,
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
Same Columns / Filters / Export layout as \`AdjustmentsGridToolbar\` in MACS,
extracted as a small reusable \`SimpleGridToolbar\` component.

\`\`\`tsx
import { StripedDataGrid, SimpleGridToolbar } from '@dematic/shared-components';

<StripedDataGrid
  rows={rows}
  columns={columns}
  slots={{
    toolbar: () => <SimpleGridToolbar onExport={handleExport} />,
  }}
/>
\`\`\`

For repo-specific extras (export menu with multiple formats, fullscreen toggle),
build your own toolbar the same way \`AdjustmentsGridToolbar\` does — compose
\`GridToolbarColumnsButton\` / \`GridToolbarFilterButton\` directly rather than
trying to extend \`SimpleGridToolbar\`.
        `,
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Grouping — rows grouped by Activity Type with a totals row
// ─────────────────────────────────────────────────────────────────────────────

export const Grouped: Story = {
  name: '3. Grouping with totals',
  args: {
    rows: groupedRows,
    initialState: {
      rowGrouping: { model: ['activityType'] },
      aggregation: { model: { rate: 'avg' } },
    },
    groupingColDef: {
      headerName: 'Activity Type',
      width: 180,
    },
    defaultGroupingExpansionDepth: -1,
  },
  parameters: {
    docs: {
      description: {
        story: `
Group any column via \`initialState.rowGrouping\`, add a totals row via
\`initialState.aggregation\`. Both are plain \`DataGridPremium\` props —
\`StripedDataGrid\` just forwards them.

\`\`\`tsx
<StripedDataGrid
  rows={rows}
  columns={columns}
  initialState={{
    rowGrouping: { model: ['activityType'] },
    aggregation: { model: { rate: 'avg' } },
  }}
  groupingColDef={{ headerName: 'Activity Type', width: 180 }}
  defaultGroupingExpansionDepth={-1}   // -1 = expanded, 0 = collapsed
/>
\`\`\`
        `,
      },
    },
  },
};

export const GroupedWithToolbar: Story = {
  name: '4. Grouping + toolbar together',
  args: {
    rows: groupedRows,
    initialState: {
      rowGrouping: { model: ['activityType'] },
      aggregation: { model: { rate: 'avg' } },
    },
    groupingColDef: {
      headerName: 'Activity Type',
      width: 180,
    },
    defaultGroupingExpansionDepth: -1,
    slots: {
      toolbar: () => <SimpleGridToolbar onExport={() => alert('Export clicked')} />,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Combining grouping and a custom toolbar — this is closest to a real screen.',
      },
    },
  },
};
