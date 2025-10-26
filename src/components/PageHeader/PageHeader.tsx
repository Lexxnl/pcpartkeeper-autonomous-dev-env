import React from 'react';
import { PageHeaderProps } from './types';
import { usePageHeader } from './hooks/usePageHeader';

/**
 * PageHeader - Main header component for page layouts
 *
 * A flexible header component with support for titles, descriptions, actions,
 * navigation, and contextual information. Uses semantic design tokens for theming.
 *
 * @example
 * ```tsx
 * <PageHeader aria-label="Main page header">
 *   <div className="px-5 py-5">
 *     <PageHeader.TitleArea>
 *       <PageHeader.Title>Page Title</PageHeader.Title>
 *     </PageHeader.TitleArea>
 *   </div>
 * </PageHeader>
 * ```
 *
 * @example
 * ```tsx
 * <PageHeader variant="elevated" hasBorder={false}>
 *   <div className="px-5 py-5">
 *     <div className="flex items-center justify-between">
 *       <PageHeader.TitleArea>
 *         <PageHeader.Title>Dashboard</PageHeader.Title>
 *       </PageHeader.TitleArea>
 *       <PageHeader.Actions>
 *         <Button variant="primary">Save</Button>
 *       </PageHeader.Actions>
 *     </div>
 *   </div>
 * </PageHeader>
 * ```
 */
const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (props, ref) => {
    const { headerClasses, ariaAttributes, validatedProps, role, children } =
      usePageHeader(props);

    return (
      <header 
        className={headerClasses}
        role="banner"
        aria-label="Page header"
      >
        <nav 
          className="page-header-nav" 
          aria-label="Primary navigation"
          role="navigation"
        >
          {/* ... existing nav ... */}
        </nav>
        
        {/* Add live region for announcements */}
        <div 
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          id="header-announcements"
        >
          {/* Dynamic content will be announced here */}
        </div>
        
        {/* ... rest of header ... */}
        
        {/* Ensure focus styles */}
        <style jsx>{`
          .page-header-nav :global(focus-visible) {
            outline: 2px solid var(--color-accent-primary);
            outline-offset: 2px;
          }
        `}</style>
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export default PageHeader;
