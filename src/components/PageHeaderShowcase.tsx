import React from 'react';
import Button from './Button';
import PageHeader from './PageHeader';
import UnderlineNav from './UnderlineNav';
import { PlusIcon, EditIcon, SearchIcon, SettingsIcon } from './icons';

/**
 * PageHeaderShowcase - Comprehensive PageHeader component demonstrations
 *
 * Features:
 * - Basic PageHeader
 * - With actions
 * - With visuals
 * - With navigation
 * - With context
 * - Complex combinations
 */
export const PageHeaderShowcase: React.FC = () => {
  return (
    <div className='space-y-8'>
      {/* Basic PageHeader */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Basic PageHeader
        </h3>
        <div className='bg-surface-page rounded border border-border-default'>
          <PageHeader role='banner' aria-label='Basic example'>
            <div className='px-4 py-4'>
              <PageHeader.TitleArea>
                <PageHeader.Title>Basic Page Title</PageHeader.Title>
              </PageHeader.TitleArea>
              <PageHeader.Description>
                This is a basic page header with title and description
              </PageHeader.Description>
            </div>
          </PageHeader>
        </div>
        <div className='mt-3 bg-surface-tertiary rounded p-4 border border-border-subtle'>
          <pre className='text-sm text-text-muted overflow-x-auto scrollbar-thin'>
            {`<PageHeader role="banner" aria-label="Basic example">
  <div className="px-4 py-4">
    <PageHeader.TitleArea>
      <PageHeader.Title>Basic Page Title</PageHeader.Title>
    </PageHeader.TitleArea>
    <PageHeader.Description>
      This is a basic page header with title and description
    </PageHeader.Description>
  </div>
</PageHeader>`}
          </pre>
        </div>
      </div>

      {/* PageHeader with Actions */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          PageHeader with Actions
        </h3>
        <div className='bg-surface-page rounded border border-border-default'>
          <PageHeader role='banner' aria-label='Actions example'>
            <div className='px-4 py-4'>
              <div className='flex items-center justify-between'>
                <PageHeader.TitleArea>
                  <PageHeader.Title>Page with Actions</PageHeader.Title>
                </PageHeader.TitleArea>
                <PageHeader.Actions>
                  <Button variant='invisible' size='small'>
                    <SettingsIcon className='h-4 w-4' />
                  </Button>
                  <Button variant='primary' size='small'>
                    Add Item
                  </Button>
                </PageHeader.Actions>
              </div>
            </div>
          </PageHeader>
        </div>
        <div className='mt-3 bg-surface-tertiary rounded p-4 border border-border-subtle'>
          <pre className='text-sm text-text-muted overflow-x-auto scrollbar-thin'>
            {`<PageHeader role="banner" aria-label="Actions example">
  <div className="px-4 py-4">
    <div className="flex items-center justify-between">
      <PageHeader.TitleArea>
        <PageHeader.Title>Page with Actions</PageHeader.Title>
      </PageHeader.TitleArea>
      <PageHeader.Actions>
        <Button variant="invisible" size="small">
          <SettingsIcon className="h-4 w-4" />
        </Button>
        <Button variant="primary" size="small">
          Add Item
        </Button>
      </PageHeader.Actions>
    </div>
  </div>
</PageHeader>`}
          </pre>
        </div>
      </div>

      {/* PageHeader with Leading and Trailing Visuals */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          PageHeader with Visuals
        </h3>
        <div className='bg-surface-page rounded border border-border-default'>
          <PageHeader role='banner' aria-label='Visuals example'>
            <div className='px-4 py-4'>
              <PageHeader.TitleArea>
                <PageHeader.LeadingVisual>
                  <div className='w-8 h-8 bg-accent-primary bg-opacity-20 rounded-full flex items-center justify-center mr-3'>
                    <PlusIcon className='h-4 w-4 text-accent-primary' />
                  </div>
                </PageHeader.LeadingVisual>
                <PageHeader.Title>Page with Visuals</PageHeader.Title>
                <PageHeader.TrailingVisual>
                  <span className='bg-action-primary bg-opacity-20 text-action-primary text-xs px-2 py-1 rounded-full font-medium ml-3'>
                    Beta
                  </span>
                </PageHeader.TrailingVisual>
              </PageHeader.TitleArea>
              <PageHeader.Description>
                This page header includes leading and trailing visual elements
              </PageHeader.Description>
            </div>
          </PageHeader>
        </div>
        <div className='mt-3 bg-surface-tertiary rounded p-4 border border-border-subtle'>
          <pre className='text-sm text-text-muted overflow-x-auto scrollbar-thin'>
            {`<PageHeader role="banner" aria-label="Visuals example">
  <div className="px-4 py-4">
    <PageHeader.TitleArea>
      <PageHeader.LeadingVisual>
        <div className="w-8 h-8 bg-accent-primary bg-opacity-20 rounded-full flex items-center justify-center mr-3">
          <PlusIcon className="h-4 w-4 text-accent-primary" />
        </div>
      </PageHeader.LeadingVisual>
      <PageHeader.Title>Page with Visuals</PageHeader.Title>
      <PageHeader.TrailingVisual>
        <span className="bg-action-primary bg-opacity-20 text-action-primary text-xs px-2 py-1 rounded-full font-medium ml-3">
          Beta
        </span>
      </PageHeader.TrailingVisual>
    </PageHeader.TitleArea>
    <PageHeader.Description>
      This page header includes leading and trailing visual elements
    </PageHeader.Description>
  </div>
</PageHeader>`}
          </pre>
        </div>
      </div>

      {/* PageHeader with Navigation */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          PageHeader with Navigation
        </h3>
        <div className='bg-surface-page rounded border border-border-default'>
          <PageHeader role='banner' aria-label='Navigation example'>
            <div className='px-4 py-4'>
              <PageHeader.TitleArea>
                <PageHeader.Title>Page with Navigation</PageHeader.Title>
              </PageHeader.TitleArea>
              <PageHeader.Description>
                This page header includes navigation tabs
              </PageHeader.Description>
              <PageHeader.Navigation aria-label='Page navigation'>
                <UnderlineNav aria-label='Page navigation'>
                  <UnderlineNav.Item aria-current='page'>
                    Overview
                  </UnderlineNav.Item>
                  <UnderlineNav.Item>Settings</UnderlineNav.Item>
                  <UnderlineNav.Item>Analytics</UnderlineNav.Item>
                </UnderlineNav>
              </PageHeader.Navigation>
            </div>
          </PageHeader>
        </div>
        <div className='mt-3 bg-surface-tertiary rounded p-4 border border-border-subtle'>
          <pre className='text-sm text-text-muted overflow-x-auto scrollbar-thin'>
            {`<PageHeader role="banner" aria-label="Navigation example">
  <div className="px-4 py-4">
    <PageHeader.TitleArea>
      <PageHeader.Title>Page with Navigation</PageHeader.Title>
    </PageHeader.TitleArea>
    <PageHeader.Description>
      This page header includes navigation tabs
    </PageHeader.Description>
    <PageHeader.Navigation aria-label="Page navigation">
      <UnderlineNav aria-label="Page navigation">
        <UnderlineNav.Item aria-current="page">
          Overview
        </UnderlineNav.Item>
        <UnderlineNav.Item>
          Settings
        </UnderlineNav.Item>
        <UnderlineNav.Item>
          Analytics
        </UnderlineNav.Item>
      </UnderlineNav>
    </PageHeader.Navigation>
  </div>
</PageHeader>`}
          </pre>
        </div>
      </div>

      {/* PageHeader with Context Area */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          PageHeader with Context
        </h3>
        <div className='bg-surface-page rounded border border-border-default'>
          <PageHeader role='banner' aria-label='Context example'>
            <div className='px-4 py-4'>
              <PageHeader.ContextArea>
                <PageHeader.ParentLink href='#'>
                  ← Back to Dashboard
                </PageHeader.ParentLink>
              </PageHeader.ContextArea>
              <PageHeader.TitleArea>
                <PageHeader.Title>Contextual Page</PageHeader.Title>
              </PageHeader.TitleArea>
              <PageHeader.Description>
                This page header includes context information and breadcrumbs
              </PageHeader.Description>
            </div>
          </PageHeader>
        </div>
        <div className='mt-3 bg-surface-tertiary rounded p-4 border border-border-subtle'>
          <pre className='text-sm text-text-muted overflow-x-auto scrollbar-thin'>
            {`<PageHeader role="banner" aria-label="Context example">
  <div className="px-4 py-4">
    <PageHeader.ContextArea>
      <PageHeader.ParentLink href="#">
        ← Back to Dashboard
      </PageHeader.ParentLink>
    </PageHeader.ContextArea>
    <PageHeader.TitleArea>
      <PageHeader.Title>Contextual Page</PageHeader.Title>
    </PageHeader.TitleArea>
    <PageHeader.Description>
      This page header includes context information and breadcrumbs
    </PageHeader.Description>
  </div>
</PageHeader>`}
          </pre>
        </div>
      </div>

      {/* Complex PageHeader */}
      <div>
        <h3 className='text-lg font-medium text-text-secondary mb-3'>
          Complex PageHeader
        </h3>
        <div className='bg-surface-page rounded border border-border-default'>
          <PageHeader role='banner' aria-label='Complex example'>
            <div className='px-4 py-4'>
              <PageHeader.ContextArea>
                <PageHeader.ContextBar>
                  <PageHeader.ParentLink href='#'>
                    ← Back to Projects
                  </PageHeader.ParentLink>
                  <PageHeader.ContextAreaActions>
                    <Button variant='invisible' size='small'>
                      <SettingsIcon className='h-4 w-4' />
                    </Button>
                  </PageHeader.ContextAreaActions>
                </PageHeader.ContextBar>
              </PageHeader.ContextArea>
              <div className='flex items-center justify-between'>
                <PageHeader.TitleArea>
                  <PageHeader.LeadingVisual>
                    <div className='w-8 h-8 bg-accent-tertiary bg-opacity-20 rounded-full flex items-center justify-center'>
                      <EditIcon className='h-4 w-4 text-accent-tertiary' />
                    </div>
                  </PageHeader.LeadingVisual>
                  <PageHeader.Title>Complex Page Header</PageHeader.Title>
                  <PageHeader.TrailingVisual>
                    <span className='bg-accent-secondary bg-opacity-20 text-accent-secondary text-xs px-2 py-1 rounded-full font-medium'>
                      Draft
                    </span>
                  </PageHeader.TrailingVisual>
                </PageHeader.TitleArea>
                <PageHeader.Actions>
                  <Button variant='invisible' size='small'>
                    <SearchIcon className='h-4 w-4' />
                  </Button>
                  <Button variant='default' size='small'>
                    Save
                  </Button>
                  <Button variant='primary' size='small'>
                    Publish
                  </Button>
                </PageHeader.Actions>
              </div>
              <PageHeader.Description>
                This is a complex page header demonstrating all available
                features
              </PageHeader.Description>
              <PageHeader.Navigation aria-label='Page navigation'>
                <UnderlineNav aria-label='Page navigation'>
                  <UnderlineNav.Item aria-current='page' counter='12'>
                    Overview
                  </UnderlineNav.Item>
                  <UnderlineNav.Item counter='3'>Settings</UnderlineNav.Item>
                  <UnderlineNav.Item counter='7'>Analytics</UnderlineNav.Item>
                  <UnderlineNav.Item counter='4'>Files</UnderlineNav.Item>
                </UnderlineNav>
              </PageHeader.Navigation>
            </div>
          </PageHeader>
        </div>
        <div className='mt-3 bg-surface-tertiary rounded p-4 border border-border-subtle'>
          <pre className='text-sm text-text-muted overflow-x-auto scrollbar-thin'>
            {`<PageHeader role="banner" aria-label="Complex example">
  <div className="px-4 py-4">
    <PageHeader.ContextArea>
      <PageHeader.ContextBar>
        <PageHeader.ParentLink href="#">
          ← Back to Projects
        </PageHeader.ParentLink>
        <PageHeader.ContextAreaActions>
          <Button variant="invisible" size="small">
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </PageHeader.ContextAreaActions>
      </PageHeader.ContextBar>
    </PageHeader.ContextArea>
    <div className="flex items-center justify-between">
      <PageHeader.TitleArea>
        <PageHeader.LeadingVisual>
          <div className="w-8 h-8 bg-accent-tertiary bg-opacity-20 rounded-full flex items-center justify-center">
            <EditIcon className="h-4 w-4 text-accent-tertiary" />
          </div>
        </PageHeader.LeadingVisual>
        <PageHeader.Title>Complex Page Header</PageHeader.Title>
        <PageHeader.TrailingVisual>
          <span className="bg-accent-secondary bg-opacity-20 text-accent-secondary text-xs px-2 py-1 rounded-full font-medium">
            Draft
          </span>
        </PageHeader.TrailingVisual>
      </PageHeader.TitleArea>
      <PageHeader.Actions>
        <Button variant="invisible" size="small">
          <SearchIcon className="h-4 w-4" />
        </Button>
        <Button variant="default" size="small">
          Save
        </Button>
        <Button variant="primary" size="small">
          Publish
        </Button>
      </PageHeader.Actions>
    </div>
    <PageHeader.Description>
      This is a complex page header demonstrating all available features
    </PageHeader.Description>
    <PageHeader.Navigation aria-label="Page navigation">
      <UnderlineNav aria-label="Page navigation">
        <UnderlineNav.Item aria-current="page" counter="12">
          Overview
        </UnderlineNav.Item>
        <UnderlineNav.Item counter="3">
          Settings
        </UnderlineNav.Item>
        <UnderlineNav.Item counter="7">
          Analytics
        </UnderlineNav.Item>
        <UnderlineNav.Item counter="4">
          Files
        </UnderlineNav.Item>
      </UnderlineNav>
    </PageHeader.Navigation>
  </div>
</PageHeader>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PageHeaderShowcase;
