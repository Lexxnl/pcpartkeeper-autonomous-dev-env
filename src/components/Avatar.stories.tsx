import React from 'react';
import Avatar from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'A simple avatar component that supports images and initials with circle or square shapes. Size is specified in pixels.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'number' },
      description: 'Size of the avatar in pixels',
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
      description: 'Shape of the avatar',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent'],
      description: 'Color variant of the avatar',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
  },
};

// Basic stories
export const Default = {
  args: {
    name: 'User',
    size: 40,
  },
};

export const WithImage = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    name: 'John Doe',
    size: 40,
  },
};

export const WithInitials = {
  args: {
    initials: 'JD',
    name: 'John Doe',
    size: 40,
  },
};

// Size variants (pixels)
export const Sizes = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='text-center'>
        <Avatar size={24} initials='XS' name='Extra Small' />
        <p className='text-xs text-text-muted mt-2'>24px</p>
      </div>
      <div className='text-center'>
        <Avatar size={32} initials='S' name='Small' />
        <p className='text-xs text-text-muted mt-2'>32px</p>
      </div>
      <div className='text-center'>
        <Avatar size={40} initials='M' name='Medium' />
        <p className='text-xs text-text-muted mt-2'>40px</p>
      </div>
      <div className='text-center'>
        <Avatar size={48} initials='L' name='Large' />
        <p className='text-xs text-text-muted mt-2'>48px</p>
      </div>
      <div className='text-center'>
        <Avatar size={64} initials='XL' name='Extra Large' />
        <p className='text-xs text-text-muted mt-2'>64px</p>
      </div>
    </div>
  ),
};

// Shape variants
export const Shapes = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='text-center'>
        <Avatar shape='circle' initials='C' name='Circle' size={48} />
        <p className='text-xs text-text-muted mt-2'>Circle (Default)</p>
      </div>
      <div className='text-center'>
        <Avatar shape='square' initials='S' name='Square' size={48} />
        <p className='text-xs text-text-muted mt-2'>Square</p>
      </div>
    </div>
  ),
};

// Color variants
export const Variants = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='text-center'>
        <Avatar variant='default' initials='D' name='Default' size={48} />
        <p className='text-xs text-text-muted mt-2'>Default</p>
      </div>
      <div className='text-center'>
        <Avatar variant='primary' initials='P' name='Primary' size={48} />
        <p className='text-xs text-text-muted mt-2'>Primary</p>
      </div>
      <div className='text-center'>
        <Avatar variant='secondary' initials='S' name='Secondary' size={48} />
        <p className='text-xs text-text-muted mt-2'>Secondary</p>
      </div>
      <div className='text-center'>
        <Avatar variant='accent' initials='A' name='Accent' size={48} />
        <p className='text-xs text-text-muted mt-2'>Accent</p>
      </div>
    </div>
  ),
};

// Clickable avatars
export const Clickable = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='text-center'>
        <Avatar
          onClick={() => alert('Avatar clicked!')}
          initials='C'
          name='Clickable'
          size={48}
        />
        <p className='text-xs text-text-muted mt-2'>Clickable</p>
      </div>
      <div className='text-center'>
        <Avatar
          onClick={() => alert('User clicked!')}
          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          alt='User Profile'
          name='User Profile'
          size={48}
        />
        <p className='text-xs text-text-muted mt-2'>User Profile</p>
      </div>
    </div>
  ),
};

// Different content types
export const ContentTypes = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-sm font-medium text-text-secondary mb-3'>
          Image Avatars
        </h3>
        <div className='flex items-center gap-4'>
          <Avatar
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            alt='John Doe'
            name='John Doe'
            size={64}
          />
          <Avatar
            src='https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
            alt='Jane Smith'
            name='Jane Smith'
            size={64}
            shape='square'
          />
          <Avatar
            src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            alt='Alex Brown'
            name='Alex Brown'
            size={64}
            variant='primary'
          />
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium text-text-secondary mb-3'>
          Initials Avatars
        </h3>
        <div className='flex items-center gap-4'>
          <Avatar initials='JD' name='John Doe' size={64} />
          <Avatar initials='JS' name='Jane Smith' size={64} shape='square' />
          <Avatar initials='AB' name='Alex Brown' size={64} variant='primary' />
          <Avatar initials='EM' name='Emma Wilson' size={64} variant='accent' />
        </div>
      </div>
    </div>
  ),
};

// Size comparison
export const SizeComparison = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-sm font-medium text-text-secondary mb-3'>
          With Images
        </h3>
        <div className='flex items-center gap-4'>
          <Avatar
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            alt='24px'
            name='24px'
            size={24}
          />
          <Avatar
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            alt='32px'
            name='32px'
            size={32}
          />
          <Avatar
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            alt='48px'
            name='48px'
            size={48}
          />
          <Avatar
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            alt='64px'
            name='64px'
            size={64}
          />
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium text-text-secondary mb-3'>
          With Initials
        </h3>
        <div className='flex items-center gap-4'>
          <Avatar initials='24' name='24px' size={24} />
          <Avatar initials='32' name='32px' size={32} />
          <Avatar initials='48' name='48px' size={48} />
          <Avatar initials='64' name='64px' size={64} />
        </div>
      </div>
    </div>
  ),
};

// Interactive playground
export const Playground = {
  args: {
    initials: 'JD',
    name: 'John Doe',
    size: 40,
    shape: 'circle',
    variant: 'default',
  },
};
