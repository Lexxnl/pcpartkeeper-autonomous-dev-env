import React from 'react';
import Button from './Button';
import Stack from './Stack';
import {
  PlusIcon,
  EditIcon,
  SearchIcon,
  DeleteIcon,
  SaveIcon,
  DownloadIcon,
  SettingsIcon,
} from './icons';

export interface ButtonShowcaseProps {
  onButtonClick: (buttonName: string) => void;
  buttonClicks: Record<string, number>;
}

/**
 * ButtonShowcase - Comprehensive button component demonstrations
 *
 * Features:
 * - All button variants and sizes
 * - Icon combinations
 * - Loading states
 * - Click tracking
 * - Organized sections
 */
export const ButtonShowcase: React.FC<ButtonShowcaseProps> = ({
  onButtonClick,
  buttonClicks,
}) => {
  return (
    <div className='space-y-6'>
      {/* Primary Buttons (Green) */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Primary Buttons (Green)
        </h3>
        <div className='space-y-3'>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Small:</span>
            <Button onClick={() => onButtonClick('Primary-Small')} size='small'>
              Small Primary
            </Button>
            <Button
              onClick={() => onButtonClick('Primary-Small-Disabled')}
              size='small'
              disabled
            >
              Disabled
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Medium:</span>
            <Button
              onClick={() => onButtonClick('Primary-Medium')}
              size='medium'
            >
              Medium Primary
            </Button>
            <Button
              onClick={() => onButtonClick('Primary-Medium-Disabled')}
              size='medium'
              disabled
            >
              Disabled
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Large:</span>
            <Button onClick={() => onButtonClick('Primary-Large')} size='large'>
              Large Primary
            </Button>
            <Button
              onClick={() => onButtonClick('Primary-Large-Disabled')}
              size='large'
              disabled
            >
              Disabled
            </Button>
          </div>
        </div>
      </div>

      {/* Default Buttons (Dark with Border) */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Default Buttons (Dark with Border)
        </h3>
        <div className='space-y-3'>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Small:</span>
            <Button
              variant='default'
              onClick={() => onButtonClick('Default-Small')}
              size='small'
            >
              Small Default
            </Button>
            <Button
              variant='default'
              onClick={() => onButtonClick('Default-Small-Disabled')}
              size='small'
              disabled
            >
              Disabled
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Medium:</span>
            <Button
              variant='default'
              onClick={() => onButtonClick('Default-Medium')}
              size='medium'
            >
              Medium Default
            </Button>
            <Button
              variant='default'
              onClick={() => onButtonClick('Default-Medium-Disabled')}
              size='medium'
              disabled
            >
              Disabled
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Large:</span>
            <Button
              variant='default'
              onClick={() => onButtonClick('Default-Large')}
              size='large'
            >
              Large Default
            </Button>
            <Button
              variant='default'
              onClick={() => onButtonClick('Default-Large-Disabled')}
              size='large'
              disabled
            >
              Disabled
            </Button>
          </div>
        </div>
      </div>

      {/* Invisible Buttons (Transparent) */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Invisible Buttons (Transparent)
        </h3>
        <div className='space-y-3'>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Small:</span>
            <Button
              variant='invisible'
              onClick={() => onButtonClick('Invisible-Small')}
              size='small'
            >
              Small Invisible
            </Button>
            <Button
              variant='invisible'
              onClick={() => onButtonClick('Invisible-Small-Disabled')}
              size='small'
              disabled
            >
              Disabled
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Medium:</span>
            <Button
              variant='invisible'
              onClick={() => onButtonClick('Invisible-Medium')}
              size='medium'
            >
              Medium Invisible
            </Button>
            <Button
              variant='invisible'
              onClick={() => onButtonClick('Invisible-Medium-Disabled')}
              size='medium'
              disabled
            >
              Disabled
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Large:</span>
            <Button
              variant='invisible'
              onClick={() => onButtonClick('Invisible-Large')}
              size='large'
            >
              Large Invisible
            </Button>
            <Button
              variant='invisible'
              onClick={() => onButtonClick('Invisible-Large-Disabled')}
              size='large'
              disabled
            >
              Disabled
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Buttons (Red) */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Danger Buttons (Red)
        </h3>
        <div className='space-y-3'>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Small:</span>
            <Button
              variant='danger'
              onClick={() => onButtonClick('Danger-Small')}
              size='small'
            >
              Small Danger
            </Button>
            <Button
              variant='danger'
              onClick={() => onButtonClick('Danger-Small-Disabled')}
              size='small'
              disabled
            >
              Disabled
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Medium:</span>
            <Button
              variant='danger'
              onClick={() => onButtonClick('Danger-Medium')}
              size='medium'
            >
              Medium Danger
            </Button>
            <Button
              variant='danger'
              onClick={() => onButtonClick('Danger-Medium-Disabled')}
              size='medium'
              disabled
            >
              Disabled
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Large:</span>
            <Button
              variant='danger'
              onClick={() => onButtonClick('Danger-Large')}
              size='large'
            >
              Large Danger
            </Button>
            <Button
              variant='danger'
              onClick={() => onButtonClick('Danger-Large-Disabled')}
              size='large'
              disabled
            >
              Disabled
            </Button>
          </div>
        </div>
      </div>

      {/* Block Buttons (Full Width) */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Block Buttons (Full Width)
        </h3>
        <div className='space-y-3'>
          <Button block onClick={() => onButtonClick('Block-Primary')}>
            Full Width Primary
          </Button>
          <Button
            variant='default'
            block
            onClick={() => onButtonClick('Block-Default')}
          >
            Full Width Default
          </Button>
          <Button
            variant='invisible'
            block
            onClick={() => onButtonClick('Block-Invisible')}
          >
            Full Width Invisible
          </Button>
          <Button
            variant='danger'
            block
            onClick={() => onButtonClick('Block-Danger')}
          >
            Full Width Danger
          </Button>
        </div>
      </div>

      {/* Buttons with Icons */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Buttons with Icons
        </h3>
        <div className='flex flex-wrap gap-3'>
          <Button
            leadingVisual={<PlusIcon className='h-4 w-4' />}
            onClick={() => onButtonClick('Icon-Plus')}
          >
            Add Item
          </Button>
          <Button
            variant='default'
            leadingVisual={<EditIcon className='h-4 w-4' />}
            onClick={() => onButtonClick('Icon-Edit')}
          >
            Edit
          </Button>
          <Button
            variant='invisible'
            leadingVisual={<SearchIcon className='h-4 w-4' />}
            onClick={() => onButtonClick('Icon-Search')}
          >
            Search
          </Button>
          <Button
            variant='danger'
            leadingVisual={<DeleteIcon className='h-4 w-4' />}
            onClick={() => onButtonClick('Icon-Delete')}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Buttons with Trailing Icons */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Buttons with Trailing Icons
        </h3>
        <div className='flex flex-wrap gap-3'>
          <Button hasArrow onClick={() => onButtonClick('Arrow-Primary')}>
            Continue
          </Button>
          <Button
            variant='default'
            trailingVisual={<DownloadIcon className='h-4 w-4' />}
            onClick={() => onButtonClick('Arrow-Download')}
          >
            Download
          </Button>
          <Button
            variant='invisible'
            trailingVisual={<SettingsIcon className='h-4 w-4' />}
            onClick={() => onButtonClick('Arrow-Settings')}
          >
            Settings
          </Button>
          <Button
            variant='danger'
            trailingVisual={<DeleteIcon className='h-4 w-4' />}
            onClick={() => onButtonClick('Arrow-Delete')}
          >
            Remove
          </Button>
        </div>
      </div>

      {/* Buttons with Both Icons */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Buttons with Both Icons
        </h3>
        <div className='flex flex-wrap gap-3'>
          <Button
            variant='default'
            leadingVisual={<PlusIcon className='h-4 w-4' />}
            trailingVisual={<SettingsIcon className='h-4 w-4' />}
            onClick={() => onButtonClick('Both-Icons')}
          >
            Create & Configure
          </Button>
        </div>
      </div>

      {/* Loading Buttons */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Loading Buttons
        </h3>
        <div className='space-y-3'>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Primary:</span>
            <Button loading onClick={() => onButtonClick('Loading-Primary')}>
              Save
            </Button>
            <Button
              loading
              size='small'
              onClick={() => onButtonClick('Loading-Primary-Small')}
            >
              Save
            </Button>
            <Button
              loading
              size='large'
              onClick={() => onButtonClick('Loading-Primary-Large')}
            >
              Save
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Default:</span>
            <Button
              variant='default'
              loading
              onClick={() => onButtonClick('Loading-Default')}
            >
              Cancel
            </Button>
            <Button
              variant='default'
              loading
              size='small'
              onClick={() => onButtonClick('Loading-Default-Small')}
            >
              Cancel
            </Button>
            <Button
              variant='default'
              loading
              size='large'
              onClick={() => onButtonClick('Loading-Default-Large')}
            >
              Cancel
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Invisible:</span>
            <Button
              variant='invisible'
              loading
              onClick={() => onButtonClick('Loading-Invisible')}
            >
              More
            </Button>
            <Button
              variant='invisible'
              loading
              size='small'
              onClick={() => onButtonClick('Loading-Invisible-Small')}
            >
              More
            </Button>
            <Button
              variant='invisible'
              loading
              size='large'
              onClick={() => onButtonClick('Loading-Invisible-Large')}
            >
              More
            </Button>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <span className='text-sm text-text-muted w-16'>Danger:</span>
            <Button
              variant='danger'
              loading
              onClick={() => onButtonClick('Loading-Danger')}
            >
              Delete
            </Button>
            <Button
              variant='danger'
              loading
              size='small'
              onClick={() => onButtonClick('Loading-Danger-Small')}
            >
              Delete
            </Button>
            <Button
              variant='danger'
              loading
              size='large'
              onClick={() => onButtonClick('Loading-Danger-Large')}
            >
              Delete
            </Button>
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
              Primary Variant
            </h4>
            <div className='flex flex-wrap gap-3 items-center'>
              <Button
                size='small'
                onClick={() => onButtonClick('Size-Primary-Small')}
              >
                Small
              </Button>
              <Button
                size='medium'
                onClick={() => onButtonClick('Size-Primary-Medium')}
              >
                Medium
              </Button>
              <Button
                size='large'
                onClick={() => onButtonClick('Size-Primary-Large')}
              >
                Large
              </Button>
            </div>
          </div>
          <div>
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              Default Variant
            </h4>
            <div className='flex flex-wrap gap-3 items-center'>
              <Button
                variant='default'
                size='small'
                onClick={() => onButtonClick('Size-Default-Small')}
              >
                Small
              </Button>
              <Button
                variant='default'
                size='medium'
                onClick={() => onButtonClick('Size-Default-Medium')}
              >
                Medium
              </Button>
              <Button
                variant='default'
                size='large'
                onClick={() => onButtonClick('Size-Default-Large')}
              >
                Large
              </Button>
            </div>
          </div>
          <div>
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              Invisible Variant
            </h4>
            <div className='flex flex-wrap gap-3 items-center'>
              <Button
                variant='invisible'
                size='small'
                onClick={() => onButtonClick('Size-Invisible-Small')}
              >
                Small
              </Button>
              <Button
                variant='invisible'
                size='medium'
                onClick={() => onButtonClick('Size-Invisible-Medium')}
              >
                Medium
              </Button>
              <Button
                variant='invisible'
                size='large'
                onClick={() => onButtonClick('Size-Invisible-Large')}
              >
                Large
              </Button>
            </div>
          </div>
          <div>
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              Danger Variant
            </h4>
            <div className='flex flex-wrap gap-3 items-center'>
              <Button
                variant='danger'
                size='small'
                onClick={() => onButtonClick('Size-Danger-Small')}
              >
                Small
              </Button>
              <Button
                variant='danger'
                size='medium'
                onClick={() => onButtonClick('Size-Danger-Medium')}
              >
                Medium
              </Button>
              <Button
                variant='danger'
                size='large'
                onClick={() => onButtonClick('Size-Danger-Large')}
              >
                Large
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* New Button Variants with Stack */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          All Variants in Stack
        </h3>
        <Stack direction='horizontal' align='center' gap={4}>
          <Button
            variant='primary'
            onClick={() => onButtonClick('New-Primary')}
          >
            Primary
          </Button>
          <Button
            variant='default'
            onClick={() => onButtonClick('New-Default')}
          >
            Default
          </Button>
          <Button
            variant='invisible'
            onClick={() => onButtonClick('New-Invisible')}
          >
            Invisible
          </Button>
          <Button variant='danger' onClick={() => onButtonClick('New-Danger')}>
            Danger
          </Button>
        </Stack>
      </div>

      {/* Individual variant demonstrations */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Individual Variant Demonstrations
        </h3>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              Primary (Green)
            </h4>
            <Stack direction='horizontal' align='center' gap={2}>
              <Button
                variant='primary'
                size='small'
                onClick={() => onButtonClick('Primary-Small')}
              >
                Small
              </Button>
              <Button
                variant='primary'
                size='medium'
                onClick={() => onButtonClick('Primary-Medium')}
              >
                Medium
              </Button>
              <Button
                variant='primary'
                size='large'
                onClick={() => onButtonClick('Primary-Large')}
              >
                Large
              </Button>
            </Stack>
          </div>

          <div>
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              Default (Dark surface with border)
            </h4>
            <Stack direction='horizontal' align='center' gap={2}>
              <Button
                variant='default'
                size='small'
                onClick={() => onButtonClick('Default-Small')}
              >
                Small
              </Button>
              <Button
                variant='default'
                size='medium'
                onClick={() => onButtonClick('Default-Medium')}
              >
                Medium
              </Button>
              <Button
                variant='default'
                size='large'
                onClick={() => onButtonClick('Default-Large')}
              >
                Large
              </Button>
            </Stack>
          </div>

          <div>
            <h4 className='text-sm font-medium text-text-muted mb-2'>
              Invisible
            </h4>
            <Stack direction='horizontal' align='center' gap={2}>
              <Button
                variant='invisible'
                size='small'
                onClick={() => onButtonClick('Invisible-Small')}
              >
                Small
              </Button>
              <Button
                variant='invisible'
                size='medium'
                onClick={() => onButtonClick('Invisible-Medium')}
              >
                Medium
              </Button>
              <Button
                variant='invisible'
                size='large'
                onClick={() => onButtonClick('Invisible-Large')}
              >
                Large
              </Button>
            </Stack>
          </div>

          <div>
            <h4 className='text-sm font-medium text-text-muted mb-2'>Danger</h4>
            <Stack direction='horizontal' align='center' gap={2}>
              <Button
                variant='danger'
                size='small'
                onClick={() => onButtonClick('Danger-Small')}
              >
                Small
              </Button>
              <Button
                variant='danger'
                size='medium'
                onClick={() => onButtonClick('Danger-Medium')}
              >
                Medium
              </Button>
              <Button
                variant='danger'
                size='large'
                onClick={() => onButtonClick('Danger-Large')}
              >
                Large
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonShowcase;
