import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageSpinner } from './PageSpinner';

const meta: Meta<typeof PageSpinner> = {
  title: 'Components/PageSpinner',
  component: PageSpinner,
  args: {
    open: true,
    message: 'Loading data...',
    size: 56,
    color: 'inherit',
  },
  argTypes: {
    open: { control: 'boolean', description: 'Show/hide the spinner overlay' },
    message: { control: 'text', description: 'Optional loading message' },
    size: { control: { type: 'range', min: 20, max: 120, step: 4 }, description: 'Spinner diameter (px)' },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'inherit'],
      description: 'Spinner color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageSpinner>;

export const Default: Story = {};

export const NoMessage: Story = {
  args: { message: '' },
};

export const SavingChanges: Story = {
  args: { message: 'Saving changes...' },
};

export const Hidden: Story = {
  args: { open: false },
};
