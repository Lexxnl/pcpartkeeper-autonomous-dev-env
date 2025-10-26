import React from 'react';
import Avatar from './Avatar';
import { UserIcon } from './icons';

export interface AvatarShowcaseProps {
  onButtonClick: (buttonName: string) => void;
}

/**
 * AvatarShowcase - Comprehensive Avatar component demonstrations
 *
 * Features:
 * - Basic avatar examples
 * - Size variants
 * - Shape variants
 * - Color variants
 * - Clickable avatars
 * - Different content types
 */
export const AvatarShowcase: React.FC<AvatarShowcaseProps> = ({
  onButtonClick,
}) => {
  return (
    <div className='space-y-8'>
      {/* Basic Avatar Examples */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Basic Avatar Examples
        </h3>
        <div className='flex flex-wrap gap-4 items-center'>
          <div className='text-center'>
            <Avatar name='Default' size={40} />
            <p className='text-xs text-text-muted mt-2'>Default</p>
          </div>
          <div className='text-center'>
            <Avatar initials='JD' name='John Doe' size={40} />
            <p className='text-xs text-text-muted mt-2'>With Initials</p>
          </div>
          <div className='text-center'>
            <Avatar
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
              alt='John Doe'
              name='John Doe'
              size={40}
            />
            <p className='text-xs text-text-muted mt-2'>With Image</p>
          </div>
        </div>
      </div>

      {/* Size Variants (in pixels) */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Size Variants (Pixels)
        </h3>
        <div className='flex flex-wrap gap-4 items-center'>
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
      </div>

      {/* Shape Variants */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Shape Variants
        </h3>
        <div className='flex flex-wrap gap-4 items-center'>
          <div className='text-center'>
            <Avatar shape='circle' initials='C' name='Circle' size={48} />
            <p className='text-xs text-text-muted mt-2'>Circle (Default)</p>
          </div>
          <div className='text-center'>
            <Avatar shape='square' initials='S' name='Square' size={48} />
            <p className='text-xs text-text-muted mt-2'>Square</p>
          </div>
        </div>
      </div>

      {/* Color Variants */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Color Variants
        </h3>
        <div className='flex flex-wrap gap-4 items-center'>
          <div className='text-center'>
            <Avatar variant='default' initials='D' name='Default' size={48} />
            <p className='text-xs text-text-muted mt-2'>Default</p>
          </div>
          <div className='text-center'>
            <Avatar variant='primary' initials='P' name='Primary' size={48} />
            <p className='text-xs text-text-muted mt-2'>Primary</p>
          </div>
          <div className='text-center'>
            <Avatar
              variant='secondary'
              initials='S'
              name='Secondary'
              size={48}
            />
            <p className='text-xs text-text-muted mt-2'>Secondary</p>
          </div>
          <div className='text-center'>
            <Avatar variant='accent' initials='A' name='Accent' size={48} />
            <p className='text-xs text-text-muted mt-2'>Accent</p>
          </div>
        </div>
      </div>

      {/* Clickable Avatars */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Clickable Avatars
        </h3>
        <div className='flex flex-wrap gap-4 items-center'>
          <div className='text-center'>
            <Avatar
              onClick={() => onButtonClick('Avatar-Click')}
              initials='C'
              name='Clickable'
              size={48}
            />
            <p className='text-xs text-text-muted mt-2'>Clickable</p>
          </div>
          <div className='text-center'>
            <Avatar
              onClick={() => onButtonClick('Avatar-User')}
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
              alt='User Profile'
              name='User Profile'
              size={48}
            />
            <p className='text-xs text-text-muted mt-2'>User Profile</p>
          </div>
        </div>
      </div>

      {/* Different Content Types */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Different Content Types
        </h3>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              Image Avatars
            </h4>
            <div className='flex flex-wrap gap-4 items-center'>
              <Avatar
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                alt='John Doe'
                name='John Doe'
                size={64}
              />
              <Avatar
                src='https://pbs.twimg.com/profile_images/1252983495636500483/cKCdIDJU_400x400.jpg'
                alt='Jane Smith'
                name='Jane Smith'
                size={64}
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
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              Initials Avatars
            </h4>
            <div className='flex flex-wrap gap-4 items-center'>
              <Avatar initials='JD' name='John Doe' size={64} />
              <Avatar
                initials='JS'
                name='Jane Smith'
                size={64}
                shape='square'
              />
              <Avatar
                initials='AB'
                name='Alex Brown'
                size={64}
                variant='primary'
              />
              <Avatar
                initials='EM'
                name='Emma Wilson'
                size={64}
                variant='accent'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Size Comparison */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Size Comparison
        </h3>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              With Images
            </h4>
            <div className='flex flex-wrap gap-4 items-center'>
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
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              With Initials
            </h4>
            <div className='flex flex-wrap gap-4 items-center'>
              <Avatar initials='24' name='24px' size={24} />
              <Avatar initials='32' name='32px' size={32} />
              <Avatar initials='48' name='48px' size={48} />
              <Avatar initials='64' name='64px' size={64} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarShowcase;
