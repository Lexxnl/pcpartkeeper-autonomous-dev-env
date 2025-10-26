import React from 'react';

// NOTE: PageHeader styling and functionality are final. Do not modify unless necessary.

/**
 * PageHeader - Main header component for page layouts
 *
 * A flexible header component with support for titles, descriptions, actions,
 * navigation, and contextual information. Uses semantic design tokens for theming.
 *
 * @example
 * <PageHeader>
 *   <div className="px-5 py-5">
 *     <PageHeader.TitleArea>
 *       <PageHeader.Title>Page Title</PageHeader.Title>
 *     </PageHeader.TitleArea>
 *   </div>
 * </PageHeader>
 */

// Type definitions
interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
  role?: string;
  'aria-label'?: string;
  hasBorder?: boolean;
}

interface TitleAreaProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'subtitle' | 'medium' | 'large';
  hidden?: boolean;
}

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
  as?: keyof JSX.IntrinsicElements;
  variant?: 'default' | 'transparent';
}

interface DescriptionProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
  variant?: 'default' | 'transparent';
}

interface NavigationProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  as?: keyof JSX.IntrinsicElements;
}

interface ActionsProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

interface VisualProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

interface ActionProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

interface ContextAreaProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

interface ParentLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  hidden?: boolean;
  'aria-label'?: string;
}

interface ContextBarProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

interface ContextAreaActionsProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

interface BreadcrumbsProps {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

const PageHeader = ({
  children,
  className = '',
  role = 'banner',
  'aria-label': ariaLabel,
  hasBorder = true,
}: PageHeaderProps) => {
  return (
    <header
      role={role}
      aria-label={ariaLabel}
      className={`bg-surface-page ${
        hasBorder ? 'border-b border-border-default' : ''
      } ${className}`}
    >
      {children}
    </header>
  );
};

const TitleArea = ({
  children,
  className = '',
  variant = 'medium',
  hidden = false,
}: TitleAreaProps) => {
  const variantClasses = {
    subtitle: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
  };

  if (hidden) return null;

  return (
    <div
      className={`flex items-center ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

const Title = ({
  children,
  className = '',
  hidden = false,
  as: Component = 'h2',
  variant = 'default',
}: TitleProps) => {
  if (hidden) return null;

  const variantClasses = {
    default: 'text-text-primary',
    transparent: 'text-text-primary',
  };

  return (
    <Component
      className={`font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

const Description = ({
  children,
  className = '',
  hidden = false,
  variant = 'default',
}: DescriptionProps) => {
  if (hidden) return null;

  const variantClasses = {
    default: 'text-text-muted',
    transparent: 'text-text-muted',
  };

  return (
    <div className={`text-sm ${variantClasses[variant]} mt-1 ${className}`}>
      {children}
    </div>
  );
};

const Navigation = ({
  children,
  className = '',
  hidden = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  as: Component = 'div',
}: NavigationProps) => {
  if (hidden) return null;

  return (
    <Component
      className={`mt-4 ${className}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </Component>
  );
};

const Actions = ({
  children,
  className = '',
  hidden = false,
}: ActionsProps) => {
  if (hidden) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>{children}</div>
  );
};

const LeadingVisual = ({
  children,
  className = '',
  hidden = false,
}: VisualProps) => {
  if (hidden) return null;

  return <div className={`mr-3 flex-shrink-0 ${className}`}>{children}</div>;
};

const TrailingVisual = ({
  children,
  className = '',
  hidden = false,
}: VisualProps) => {
  if (hidden) return null;

  return <div className={`ml-3 flex-shrink-0 ${className}`}>{children}</div>;
};

const LeadingAction = ({
  children,
  className = '',
  hidden = false,
}: ActionProps) => {
  if (hidden) return null;

  return <div className={`mr-4 ${className}`}>{children}</div>;
};

const TrailingAction = ({
  children,
  className = '',
  hidden = false,
}: ActionProps) => {
  if (hidden) return null;

  return <div className={`ml-4 ${className}`}>{children}</div>;
};

const ContextArea = ({
  children,
  className = '',
  hidden = false,
}: ContextAreaProps) => {
  if (hidden) return null;

  return <div className={`mb-2 ${className}`}>{children}</div>;
};

const ParentLink = ({
  children,
  href,
  className = '',
  hidden = false,
  'aria-label': ariaLabel,
}: ParentLinkProps) => {
  if (hidden) return null;

  return (
    <a
      href={href}
      className={`text-sm text-accent-primary hover:text-accent-primary-emphasis hover:underline transition-colors ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

const ContextBar = ({
  children,
  className = '',
  hidden = false,
}: ContextBarProps) => {
  if (hidden) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
};

const ContextAreaActions = ({
  children,
  className = '',
  hidden = false,
}: ContextAreaActionsProps) => {
  if (hidden) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>{children}</div>
  );
};

const Breadcrumbs = ({
  children,
  className = '',
  hidden = false,
}: BreadcrumbsProps) => {
  if (hidden) return null;

  return (
    <nav className={`text-sm ${className}`} aria-label='Breadcrumb'>
      {children}
    </nav>
  );
};

// Attach sub-components to PageHeader
PageHeader.TitleArea = TitleArea;
PageHeader.Title = Title;
PageHeader.Description = Description;
PageHeader.Navigation = Navigation;
PageHeader.Actions = Actions;
PageHeader.LeadingVisual = LeadingVisual;
PageHeader.TrailingVisual = TrailingVisual;
PageHeader.LeadingAction = LeadingAction;
PageHeader.TrailingAction = TrailingAction;
PageHeader.ContextArea = ContextArea;
PageHeader.ParentLink = ParentLink;
PageHeader.ContextBar = ContextBar;
PageHeader.ContextAreaActions = ContextAreaActions;
PageHeader.Breadcrumbs = Breadcrumbs;


export default PageHeader;
