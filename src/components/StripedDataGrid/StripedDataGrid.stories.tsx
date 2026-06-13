import type { Meta, StoryObj } from '@storybook/react-vite';
import type { GridColDef } from '@mui/x-data-grid-premium';
import { StripedDataGrid } from './StripedDataGrid';
import { CustomToolbar } from '../CustomToolbar/CustomToolbar';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'role', headerName: 'Role', flex: 1 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'score', headerName: 'Score', type: 'number', width: 100 },
];

const rows = [
  { id: 1, name: 'Alice Johnson', role: 'Engineer', status: 'Active', score: 92 },
  { id: 2, name: 'Bob Smith', role: 'Designer', status: 'Active', score: 87 },
  { id: 3, name: 'Carol White', role: 'Manager', status: 'Away', score: 78 },
  { id: 4, name: 'David Lee', role: 'Engineer', status: 'Active', score: 95 },
  { id: 5, name: 'Eva Martinez', role: 'QA', status: 'Inactive', score: 65 },
  { id: 6, name: 'Frank Brown', role: 'DevOps', status: 'Active', score: 88 },
  { id: 7, name: 'Grace Kim', role: 'Engineer', status: 'Active', score: 91 },
  { id: 8, name: 'Henry Davis', role: 'Designer', status: 'Away', score: 74 },
];

const meta: Meta<typeof StripedDataGrid> = {
  title: 'Components/StripedDataGrid',
  component: StripedDataGrid,
  args: {
    rows,
    columns,
    stripeEveryOther: true,
    autoHeight: true,
    pageSizeOptions: [5, 10],
    initialState: { pagination: { paginationModel: { pageSize: 5 } } },
  },
  argTypes: {
    stripeEveryOther: {
      control: 'boolean',
      description: 'Alternate row background color',
    },
    checkboxSelection: { control: 'boolean' },
    disableRowSelectionOnClick: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof StripedDataGrid>;

export const Default: Story = {};

export const WithToolbar: Story = {
  args: {
    slots: { toolbar: CustomToolbar },
    slotProps: { toolbar: { title: 'Team Members' } },
  },
};

export const CheckboxSelection: Story = {
  args: { checkboxSelection: true },
};

export const NoStripes: Story = {
  args: { stripeEveryOther: false },
};
