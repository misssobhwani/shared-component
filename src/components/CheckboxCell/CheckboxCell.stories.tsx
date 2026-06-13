import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { GridColDef, GridValidRowModel } from '@mui/x-data-grid-premium';
import { CheckboxCell } from './CheckboxCell';
import { StripedDataGrid } from '../StripedDataGrid/StripedDataGrid';

const meta: Meta<typeof CheckboxCell> = {
  title: 'Components/CheckboxCell',
  component: CheckboxCell,
  argTypes: {
    disabled: { control: 'boolean', description: 'Disable the checkbox' },
    tooltip: { control: 'text', description: 'Tooltip shown on hover' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxCell>;

interface Row extends GridValidRowModel {
  id: number;
  task: string;
  done: boolean;
  locked: boolean;
}

function CheckboxGridDemo({ disabled, tooltip }: { disabled?: boolean; tooltip?: string }) {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, task: 'Design mockups', done: true, locked: false },
    { id: 2, task: 'Write unit tests', done: false, locked: false },
    { id: 3, task: 'Deploy to staging', done: false, locked: true },
    { id: 4, task: 'Code review', done: true, locked: false },
    { id: 5, task: 'Update docs', done: false, locked: false },
  ]);

  const toggle = (id: string | number, value: boolean) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: value } : r))
    );
  };

  const columns: GridColDef<Row>[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'task', headerName: 'Task', flex: 1 },
    {
      field: 'done',
      headerName: 'Done',
      width: 90,
      renderCell: (params) => (
        <CheckboxCell
          params={params}
          disabled={disabled || params.row.locked}
          tooltip={params.row.locked ? 'Locked — cannot change' : tooltip}
          onChange={toggle}
        />
      ),
    },
    { field: 'locked', headerName: 'Locked', type: 'boolean', width: 90 },
  ];

  return <StripedDataGrid rows={rows} columns={columns} autoHeight />;
}

export const Default: Story = {
  args: { disabled: false, tooltip: '' },
  render: (args) => <CheckboxGridDemo {...args} />,
};

export const WithTooltip: Story = {
  args: { disabled: false, tooltip: 'Toggle completion status' },
  render: (args) => <CheckboxGridDemo {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, tooltip: 'Read-only' },
  render: (args) => <CheckboxGridDemo {...args} />,
};
