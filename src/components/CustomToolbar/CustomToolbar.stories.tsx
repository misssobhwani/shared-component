
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { GridColDef } from '@mui/x-data-grid-premium';
import { StripedDataGrid } from '../StripedDataGrid/StripedDataGrid';
import { CustomToolbar, type CustomToolbarProps } from './CustomToolbar';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'product', headerName: 'Product', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1 },
  { field: 'units', headerName: 'Units', type: 'number', width: 100 },
  { field: 'revenue', headerName: 'Revenue ($)', type: 'number', width: 130 },
];

const rows = [
  { id: 1, product: 'Widget A', category: 'Widgets', units: 120, revenue: 2400 },
  { id: 2, product: 'Gadget Pro', category: 'Gadgets', units: 85, revenue: 5950 },
  { id: 3, product: 'Doohickey X', category: 'Widgets', units: 200, revenue: 1600 },
  { id: 4, product: 'Thingamajig', category: 'Gadgets', units: 45, revenue: 4050 },
  { id: 5, product: 'Contraption Z', category: 'Parts', units: 310, revenue: 930 },
];

function GridWithToolbar(args: CustomToolbarProps) {
  return (
    <StripedDataGrid
      rows={rows}
      columns={columns}
      autoHeight
      showToolbar
      slots={{ toolbar: CustomToolbar }}
      slotProps={{ toolbar: args as any }}
    />
  );
}

const meta: Meta<typeof CustomToolbar> = {
  title: 'Components/CustomToolbar',
  component: CustomToolbar,
  args: {
    showSearch: true,
    showExport: true,
    showColumns: true,
    showFilter: true,
    title: 'Products',
  },
  argTypes: {
    showSearch: { control: 'boolean', description: 'Show quick filter search box' },
    showExport: { control: 'boolean', description: 'Show CSV / Print export buttons' },
    showColumns: { control: 'boolean', description: 'Show columns panel toggle' },
    showFilter: { control: 'boolean', description: 'Show filter panel toggle' },
    title: { control: 'text', description: 'Optional table title in the toolbar' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomToolbar>;

export const Default: Story = {
  render: (args) => <GridWithToolbar {...args} />,
};

export const TitleOnly: Story = {
  args: { showSearch: false, showExport: false, showColumns: false, showFilter: false },
  render: (args) => <GridWithToolbar {...args} />,
};

export const SearchOnly: Story = {
  args: { showExport: false, showColumns: false, showFilter: false, title: '' },
  render: (args) => <GridWithToolbar {...args} />,
};

