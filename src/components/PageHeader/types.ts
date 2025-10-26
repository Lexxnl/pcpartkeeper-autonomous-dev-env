import { ReactNode, ComponentType } from 'react';

// ============================================================================
// BASE TYPES
// ============================================================================

export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
  hidden?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'data-testid'?: string;
}

export interface ForwardedRefProps<T = HTMLElement> {
  ref?: React.Ref<T>;
}

// ============================================================================
// PAGE HEADER TYPES
// ============================================================================

export interface PageHeaderProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLElement> {
  role?: 'banner' | 'header';
  hasBorder?: boolean;
  variant?: 'default' | 'minimal' | 'elevated';
}

// ============================================================================
// TITLE COMPONENT TYPES
// ============================================================================

export type TitleVariant = 'subtitle' | 'medium' | 'large' | 'xl' | '2xl';
export type TitleComponent =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div'
  | 'span';

export interface TitleAreaProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  variant?: TitleVariant;
  align?: 'left' | 'center' | 'right';
  spacing?: 'tight' | 'normal' | 'loose';
}

export interface TitleProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLElement> {
  as?: TitleComponent;
  variant?: 'default' | 'transparent' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface DescriptionProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  variant?: 'default' | 'transparent' | 'muted';
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// NAVIGATION COMPONENT TYPES
// ============================================================================

export interface NavigationProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  variant?: 'default' | 'minimal' | 'pills';
  orientation?: 'horizontal' | 'vertical';
}

export interface BreadcrumbsProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLElement> {
  separator?: ReactNode;
  variant?: 'default' | 'minimal';
  maxItems?: number;
}

// ============================================================================
// ACTION COMPONENT TYPES
// ============================================================================

export interface ActionsProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'loose';
  align?: 'start' | 'center' | 'end';
  wrap?: boolean;
}

export interface ActionProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  position?: 'leading' | 'trailing';
  spacing?: 'tight' | 'normal' | 'loose';
}

// ============================================================================
// VISUAL COMPONENT TYPES
// ============================================================================

export interface VisualProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  position?: 'leading' | 'trailing';
  spacing?: 'tight' | 'normal' | 'loose';
}

// ============================================================================
// CONTEXT COMPONENT TYPES
// ============================================================================

export interface ContextAreaProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  variant?: 'default' | 'minimal' | 'elevated';
  spacing?: 'tight' | 'normal' | 'loose';
}

export interface ContextBarProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  align?: 'start' | 'center' | 'end' | 'between';
  spacing?: 'tight' | 'normal' | 'loose';
}

export interface ContextAreaActionsProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'loose';
}

export interface ParentLinkProps
  extends BaseComponentProps,
    ForwardedRefProps<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  variant?: 'default' | 'minimal' | 'button';
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// COMPONENT REGISTRY TYPES
// ============================================================================

export interface PageHeaderComponents {
  TitleArea: ComponentType<TitleAreaProps>;
  Title: ComponentType<TitleProps>;
  Description: ComponentType<DescriptionProps>;
  Navigation: ComponentType<NavigationProps>;
  Breadcrumbs: ComponentType<BreadcrumbsProps>;
  Actions: ComponentType<ActionsProps>;
  LeadingAction: ComponentType<ActionProps>;
  TrailingAction: ComponentType<ActionProps>;
  LeadingVisual: ComponentType<VisualProps>;
  TrailingVisual: ComponentType<VisualProps>;
  ContextArea: ComponentType<ContextAreaProps>;
  ContextBar: ComponentType<ContextBarProps>;
  ContextAreaActions: ComponentType<ContextAreaActionsProps>;
  ParentLink: ComponentType<ParentLinkProps>;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[];

export interface VariantConfig {
  [key: string]: string;
}

export interface ConditionalClasses {
  [key: string]: string;
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export interface UsePageHeaderOptions {
  validateAria?: boolean;
  generateIds?: boolean;
  debugMode?: boolean;
}

export interface UsePageHeaderReturn {
  headerClasses: string;
  ariaAttributes: Record<string, string>;
  validatedProps: Record<string, any>;
  role: string;
  children: ReactNode;
  debugInfo?: Record<string, any>;
}
