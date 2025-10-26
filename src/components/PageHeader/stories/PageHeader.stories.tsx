import type { Meta, StoryObj } from '@storybook/react';
import {
  PageHeader,
  TitleArea,
  Title,
  Description,
  Actions,
  ContextArea,
  ParentLink,
} from '../index';

// Mock icons for stories
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 4v16m8-8H4'
    />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 00-1.066 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10 19l-7-7m0 0l7-7m-7 7h18'
    />
  </svg>
);

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A flexible header component with support for titles, descriptions, actions, navigation, and contextual information. Uses semantic design tokens for theming and provides a compound component API for maximum flexibility.',
      },
    },
  },
  argTypes: {
    role: {
      control: 'select',
      options: ['banner', 'header'],
      description: 'The ARIA role for the header element',
    },
    hasBorder: {
      control: 'boolean',
      description: 'Whether to show a bottom border',
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'elevated'],
      description: 'Visual variant of the header',
    },
    hidden: {
      control: 'boolean',
      description: 'Whether to hide the header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    'aria-label': 'Main page header',
  },
  render: args => (
    <PageHeader {...args}>
      <div className='px-5 py-5'>
        <TitleArea>
          <Title>Page Title</Title>
        </TitleArea>
        <Description>
          This is a page description that provides context about the current
          page.
        </Description>
      </div>
    </PageHeader>
  ),
};

export const WithActions: Story = {
  render: () => (
    <PageHeader aria-label='Page with actions'>
      <div className='px-5 py-5'>
        <div className='flex items-center justify-between'>
          <TitleArea>
            <Title>Page with Actions</Title>
          </TitleArea>
          <Actions>
            <button className='p-2 text-text-muted hover:text-text-primary transition-colors'>
              <SettingsIcon className='h-4 w-4' />
            </button>
            <button className='px-3 py-1 text-sm bg-action-primary text-text-primary rounded-md hover:bg-action-primary-hover transition-colors'>
              Add Item
            </button>
          </Actions>
        </div>
      </div>
    </PageHeader>
  ),
};

export const WithContext: Story = {
  render: () => (
    <PageHeader aria-label='Page with context'>
      <div className='px-5 py-5'>
        <ContextArea>
          <ParentLink href='/dashboard'>
            <ArrowLeftIcon className='h-4 w-4 mr-1' />
            Back to Dashboard
          </ParentLink>
        </ContextArea>

        <TitleArea>
          <Title>Contextual Page</Title>
        </TitleArea>
        <Description>
          This page includes context information and navigation.
        </Description>
      </div>
    </PageHeader>
  ),
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    hasBorder: false,
  },
  render: args => (
    <PageHeader {...args}>
      <div className='px-5 py-5'>
        <TitleArea>
          <Title>Minimal Header</Title>
        </TitleArea>
        <Description>
          This is a minimal header without borders or background.
        </Description>
      </div>
    </PageHeader>
  ),
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
  render: args => (
    <PageHeader {...args}>
      <div className='px-5 py-5'>
        <TitleArea>
          <Title>Elevated Header</Title>
        </TitleArea>
        <Description>
          This header has an elevated appearance with shadow.
        </Description>
      </div>
    </PageHeader>
  ),
};

// ============================================================================
// COMPLEX STORIES
// ============================================================================

export const Complex: Story = {
  render: () => (
    <PageHeader aria-label='Complex page header'>
      <div className='px-5 py-5'>
        <ContextArea>
          <div className='flex items-center justify-between'>
            <ParentLink href='/dashboard'>
              <ArrowLeftIcon className='h-4 w-4 mr-1' />
              Back to Projects
            </ParentLink>
            <div className='flex items-center gap-2'>
              <button className='p-1 text-text-muted hover:text-text-primary transition-colors'>
                <SettingsIcon className='h-4 w-4' />
              </button>
            </div>
          </div>
        </ContextArea>

        <div className='flex items-center justify-between'>
          <TitleArea>
            <div className='h-8 w-8 bg-accent-primary rounded-full flex items-center justify-center mr-3'>
              <span className='text-white text-sm font-bold'>P</span>
            </div>
            <Title>Complex Page Header</Title>
            <span className='bg-accent-secondary bg-opacity-20 text-accent-secondary text-xs px-2 py-1 rounded-full font-medium ml-3'>
              Beta
            </span>
          </TitleArea>

          <Actions>
            <button className='p-2 text-text-muted hover:text-text-primary transition-colors'>
              <SettingsIcon className='h-4 w-4' />
            </button>
            <button className='px-3 py-1 text-sm bg-surface-tertiary text-text-primary rounded-md hover:bg-surface-hover transition-colors'>
              Save
            </button>
            <button className='px-3 py-1 text-sm bg-action-primary text-text-primary rounded-md hover:bg-action-primary-hover transition-colors'>
              Publish
            </button>
          </Actions>
        </div>

        <Description>
          This is a complex page header demonstrating all available features and
          components.
        </Description>

        <nav className='mt-4 flex space-x-6'>
          <a
            href='#'
            className='text-accent-primary border-b-2 border-accent-primary pb-2 text-sm font-medium'
          >
            Overview
          </a>
          <a
            href='#'
            className='text-text-muted hover:text-text-primary pb-2 text-sm font-medium transition-colors'
          >
            Settings
          </a>
          <a
            href='#'
            className='text-text-muted hover:text-text-primary pb-2 text-sm font-medium transition-colors'
          >
            Analytics
          </a>
          <a
            href='#'
            className='text-text-muted hover:text-text-primary pb-2 text-sm font-medium transition-colors'
          >
            Files
          </a>
        </nav>
      </div>
    </PageHeader>
  ),
};

// ============================================================================
// COMPONENT SHOWCASE STORIES
// ============================================================================

export const TitleVariants: Story = {
  render: () => (
    <div className='space-y-6'>
      <PageHeader>
        <div className='px-5 py-5'>
          <TitleArea variant='subtitle'>
            <Title as='h3' weight='normal'>
              Subtitle Variant
            </Title>
          </TitleArea>
        </div>
      </PageHeader>

      <PageHeader>
        <div className='px-5 py-5'>
          <TitleArea variant='medium'>
            <Title as='h2' weight='semibold'>
              Medium Variant
            </Title>
          </TitleArea>
        </div>
      </PageHeader>

      <PageHeader>
        <div className='px-5 py-5'>
          <TitleArea variant='large'>
            <Title as='h1' weight='bold'>
              Large Variant
            </Title>
          </TitleArea>
        </div>
      </PageHeader>
    </div>
  ),
};

export const ActionVariations: Story = {
  render: () => (
    <div className='space-y-6'>
      <PageHeader>
        <div className='px-5 py-5'>
          <div className='flex items-center justify-between'>
            <TitleArea>
              <Title>Horizontal Actions</Title>
            </TitleArea>
            <Actions direction='horizontal' spacing='normal'>
              <button className='px-3 py-1 text-sm bg-surface-tertiary text-text-primary rounded-md hover:bg-surface-hover transition-colors'>
                Cancel
              </button>
              <button className='px-3 py-1 text-sm bg-action-primary text-text-primary rounded-md hover:bg-action-primary-hover transition-colors'>
                Save
              </button>
            </Actions>
          </div>
        </div>
      </PageHeader>

      <PageHeader>
        <div className='px-5 py-5'>
          <div className='flex items-center justify-between'>
            <TitleArea>
              <Title>Vertical Actions</Title>
            </TitleArea>
            <Actions direction='vertical' spacing='tight'>
              <button className='px-3 py-1 text-sm bg-surface-tertiary text-text-primary rounded-md hover:bg-surface-hover transition-colors'>
                Edit
              </button>
              <button className='px-3 py-1 text-sm bg-surface-tertiary text-text-primary rounded-md hover:bg-surface-hover transition-colors'>
                Duplicate
              </button>
              <button className='px-3 py-1 text-sm bg-action-danger text-text-primary rounded-md hover:bg-action-danger-hover transition-colors'>
                Delete
              </button>
            </Actions>
          </div>
        </div>
      </PageHeader>
    </div>
  ),
};

// ============================================================================
// RESPONSIVE STORIES
// ============================================================================

export const Responsive: Story = {
  render: () => (
    <PageHeader aria-label='Responsive page header'>
      <div className='px-4 sm:px-6 lg:px-8 py-4 sm:py-5'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <TitleArea>
            <Title>Responsive Header</Title>
          </TitleArea>
          <Actions className='w-full sm:w-auto'>
            <button className='w-full sm:w-auto px-3 py-1 text-sm bg-action-primary text-text-primary rounded-md hover:bg-action-primary-hover transition-colors'>
              <PlusIcon className='h-4 w-4 mr-2' />
              Add Item
            </button>
          </Actions>
        </div>
        <Description className='mt-2'>
          This header adapts to different screen sizes with responsive layout.
        </Description>
      </div>
    </PageHeader>
  ),
};

// ============================================================================
// ACCESSIBILITY STORIES
// ============================================================================

export const Accessibility: Story = {
  render: () => (
    <PageHeader
      role='banner'
      aria-label='Accessible page header'
      data-testid='accessible-header'
    >
      <div className='px-5 py-5'>
        <TitleArea>
          <Title as='h1' id='page-title'>
            Accessible Page
          </Title>
        </TitleArea>
        <Description aria-describedby='page-title'>
          This header demonstrates proper accessibility attributes and semantic
          HTML.
        </Description>

        <nav className='mt-4' aria-label='Main navigation'>
          <div className='flex space-x-6'>
            <a
              href='#'
              className='text-accent-primary border-b-2 border-accent-primary pb-2 text-sm font-medium'
              aria-current='page'
            >
              Overview
            </a>
            <a
              href='#'
              className='text-text-muted hover:text-text-primary pb-2 text-sm font-medium transition-colors'
            >
              Settings
            </a>
            <a
              href='#'
              className='text-text-muted hover:text-text-primary pb-2 text-sm font-medium transition-colors'
            >
              Analytics
            </a>
          </div>
        </nav>
      </div>
    </PageHeader>
  ),
};
