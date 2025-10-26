import React from 'react';
import UnderlineNav from './UnderlineNav';

/**
 * UnderlineNavShowcase - Comprehensive UnderlineNav component demonstrations
 *
 * Features:
 * - Basic navigation
 * - With counters
 * - Various configurations
 */
export const UnderlineNavShowcase: React.FC = () => {
  return (
    <div className='space-y-6'>
      {/* Basic UnderlineNav */}
      <div className='bg-surface-page rounded border border-border-default p-6'>
        <h3 className='text-lg font-semibold text-text-secondary mb-4'>
          Basic UnderlineNav
        </h3>
        <div className='bg-surface-secondary rounded p-4'>
          <UnderlineNav aria-label='Basic navigation'>
            <UnderlineNav.Item aria-current='page'>Overview</UnderlineNav.Item>
            <UnderlineNav.Item>Settings</UnderlineNav.Item>
            <UnderlineNav.Item>Analytics</UnderlineNav.Item>
          </UnderlineNav>
        </div>
      </div>

      {/* UnderlineNav with Counters */}
      <div className='bg-surface-page rounded border border-border-default p-6'>
        <h3 className='text-lg font-semibold text-text-secondary mb-4'>
          UnderlineNav with Counters
        </h3>
        <div className='bg-surface-secondary rounded p-4'>
          <UnderlineNav aria-label='Navigation with counters'>
            <UnderlineNav.Item aria-current='page' counter='12'>
              Overview
            </UnderlineNav.Item>
            <UnderlineNav.Item counter='3'>Settings</UnderlineNav.Item>
            <UnderlineNav.Item counter='7'>Analytics</UnderlineNav.Item>
            <UnderlineNav.Item counter='4'>Files</UnderlineNav.Item>
          </UnderlineNav>
        </div>
      </div>
    </div>
  );
};

export default UnderlineNavShowcase;
