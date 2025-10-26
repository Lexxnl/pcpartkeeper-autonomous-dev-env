// ============================================================================
// MAIN COMPONENT EXPORTS
// ============================================================================

// Import main component
import PageHeaderBase from './PageHeader';
export type { PageHeaderProps } from './types';

// ============================================================================
// TITLE COMPONENT EXPORTS
// ============================================================================

import TitleAreaComponent from './components/Title/TitleArea';
import TitleComponent from './components/Title/Title';
import DescriptionComponent from './components/Title/Description';
export type { TitleAreaProps, TitleProps, DescriptionProps } from './types';

// ============================================================================
// NAVIGATION COMPONENT EXPORTS
// ============================================================================

import NavigationComponent from './components/Navigation/Navigation';
import BreadcrumbsComponent from './components/Navigation/Breadcrumbs';
export type { NavigationProps } from './types';

// ============================================================================
// ACTION COMPONENT EXPORTS
// ============================================================================

import ActionsComponent from './components/Actions/Actions';
import LeadingActionComponent from './components/Actions/LeadingAction';
import TrailingActionComponent from './components/Actions/TrailingAction';
export type { ActionsProps } from './types';

// ============================================================================
// VISUAL COMPONENT EXPORTS
// ============================================================================

import LeadingVisualComponent from './components/Visuals/LeadingVisual';
import TrailingVisualComponent from './components/Visuals/TrailingVisual';
export type { VisualProps } from './types';

// ============================================================================
// CONTEXT COMPONENT EXPORTS
// ============================================================================

import ContextAreaComponent from './components/Context/ContextArea';
import ContextBarComponent from './components/Context/ContextBar';
import ContextAreaActionsComponent from './components/Context/ContextAreaActions';
import ParentLinkComponent from './components/Context/ParentLink';
export type { ParentLinkProps } from './types';

// ============================================================================
// HOOK EXPORTS
// ============================================================================

export { usePageHeader } from './hooks/usePageHeader';

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export {
  cn,
  conditionalClasses,
  createVariantClasses,
} from './utils/classNames';

export {
  isValidTitleVariant,
  isValidTitleComponent,
  validateAriaAttributes,
} from './utils/validators';

// ============================================================================
// CONSTANT EXPORTS
// ============================================================================

export * from './constants';

// ============================================================================
// COMPOUND COMPONENT API - Attach sub-components to main component
// ============================================================================

const PageHeader = Object.assign(PageHeaderBase, {
  TitleArea: TitleAreaComponent,
  Title: TitleComponent,
  Description: DescriptionComponent,
  Navigation: NavigationComponent,
  Breadcrumbs: BreadcrumbsComponent,
  Actions: ActionsComponent,
  LeadingAction: LeadingActionComponent,
  TrailingAction: TrailingActionComponent,
  LeadingVisual: LeadingVisualComponent,
  TrailingVisual: TrailingVisualComponent,
  ContextArea: ContextAreaComponent,
  ContextBar: ContextBarComponent,
  ContextAreaActions: ContextAreaActionsComponent,
  ParentLink: ParentLinkComponent,
});

// Export the compound component as default
export default PageHeader;

// Export individual components as named exports
export const TitleArea = TitleAreaComponent;
export const Title = TitleComponent;
export const Description = DescriptionComponent;
export const Navigation = NavigationComponent;
export const Breadcrumbs = BreadcrumbsComponent;
export const Actions = ActionsComponent;
export const LeadingAction = LeadingActionComponent;
export const TrailingAction = TrailingActionComponent;
export const LeadingVisual = LeadingVisualComponent;
export const TrailingVisual = TrailingVisualComponent;
export const ContextArea = ContextAreaComponent;
export const ContextBar = ContextBarComponent;
export const ContextAreaActions = ContextAreaActionsComponent;
export const ParentLink = ParentLinkComponent;

// Export the main component as named export too
export { PageHeaderBase as PageHeader };
