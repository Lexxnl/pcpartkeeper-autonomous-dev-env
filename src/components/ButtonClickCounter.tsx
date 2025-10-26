import React from 'react';

export interface ButtonClickCounterProps {
  buttonClicks: Record<string, number>;
}

/**
 * ButtonClickCounter - Displays button click statistics
 *
 * Features:
 * - Grid layout for click counts
 * - Empty state handling
 * - Responsive design
 */
export const ButtonClickCounter: React.FC<ButtonClickCounterProps> = ({
  buttonClicks,
}) => {
  const clickEntries = Object.entries(buttonClicks);

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-semibold text-text-primary'>
        Button Click Counter
      </h2>

      {clickEntries.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {clickEntries.map(([buttonName, count]) => (
            <div
              key={buttonName}
              className='bg-surface-tertiary p-3 rounded border border-border-subtle'
            >
              <div className='text-sm font-medium text-text-secondary'>
                {buttonName}
              </div>
              <div className='text-lg font-bold text-accent-primary'>
                {count}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-8'>
          <p className='text-text-muted'>No buttons clicked yet</p>
        </div>
      )}
    </div>
  );
};

export default ButtonClickCounter;
