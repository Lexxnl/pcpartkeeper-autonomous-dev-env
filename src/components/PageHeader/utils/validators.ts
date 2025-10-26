import { TitleVariant, TitleComponent } from '../types';
import { logger } from '../../../utils/logger';

// ============================================================================
// TYPE VALIDATORS
// ============================================================================

/**
 * Validate title variant
 *
 * @param variant - The variant to validate
 * @returns True if valid title variant
 */
export function isValidTitleVariant(variant: string): variant is TitleVariant {
  return ['subtitle', 'medium', 'large', 'xl', '2xl'].includes(variant);
}

/**
 * Validate title component
 *
 * @param component - The component to validate
 * @returns True if valid title component
 */
export function isValidTitleComponent(
  component: string
): component is TitleComponent {
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'].includes(
    component
  );
}

/**
 * Validate ARIA attributes
 *
 * @param props - Props object to validate
 * @returns Validated props with warnings
 */
export function validateAriaAttributes(
  props: Record<string, any>
): Record<string, any> {
  const { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy } = props;

  if (ariaLabel && ariaLabelledBy) {
    logger.warn(
      'PageHeader: Both aria-label and aria-labelledby provided. aria-labelledby takes precedence.'
    );
  }

  if (ariaLabel && typeof ariaLabel !== 'string') {
    logger.warn('PageHeader: aria-label should be a string.');
  }

  if (ariaLabelledBy && typeof ariaLabelledBy !== 'string') {
    logger.warn('PageHeader: aria-labelledby should be a string.');
  }

  return props;
}

/**
 * Validate component props with type checking
 *
 * @param props - Props to validate
 * @param componentName - Name of the component for error messages
 * @returns Validated props
 */
export function validateComponentProps<T extends Record<string, any>>(
  props: T,
  componentName: string
): T {
  const validatedProps = { ...props };

  // Validate required props
  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined && key.includes('required')) {
      logger.warn(`${componentName}: Required prop '${key}' is undefined.`);
    }
  });

  // Validate string props
  const stringProps = ['className', 'aria-label', 'aria-labelledby'];
  stringProps.forEach(prop => {
    if (props[prop] && typeof props[prop] !== 'string') {
      logger.warn(`${componentName}: Prop '${prop}' should be a string.`);
    }
  });

  // Validate boolean props
  const booleanProps = ['hidden', 'external', 'wrap'];
  booleanProps.forEach(prop => {
    if (props[prop] !== undefined && typeof props[prop] !== 'boolean') {
      logger.warn(`${componentName}: Prop '${prop}' should be a boolean.`);
    }
  });

  return validatedProps;
}

/**
 * Validate responsive breakpoints
 *
 * @param breakpoints - Object with breakpoint keys
 * @returns True if all breakpoints are valid
 */
export function validateBreakpoints(breakpoints: Record<string, any>): boolean {
  const validBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  return Object.keys(breakpoints).every(breakpoint =>
    validBreakpoints.includes(breakpoint)
  );
}

/**
 * Validate spacing values
 *
 * @param spacing - Spacing value to validate
 * @returns True if valid spacing value
 */
export function isValidSpacing(spacing: string): boolean {
  return ['tight', 'normal', 'loose'].includes(spacing);
}

/**
 * Validate alignment values
 *
 * @param alignment - Alignment value to validate
 * @returns True if valid alignment value
 */
export function isValidAlignment(alignment: string): boolean {
  return ['start', 'center', 'end', 'between', 'around', 'evenly'].includes(
    alignment
  );
}

/**
 * Validate size values
 *
 * @param size - Size value to validate
 * @returns True if valid size value
 */
export function isValidSize(size: string): boolean {
  return ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(size);
}

/**
 * Validate variant values
 *
 * @param variant - Variant value to validate
 * @param validVariants - Array of valid variant values
 * @returns True if valid variant value
 */
export function isValidVariant(
  variant: string,
  validVariants: string[]
): boolean {
  return validVariants.includes(variant);
}

// ============================================================================
// PROP VALIDATORS
// ============================================================================

/**
 * Validate PageHeader props
 *
 * @param props - PageHeader props
 * @returns Validated props
 */
export function validatePageHeaderProps(
  props: Record<string, any>
): Record<string, any> {
  const validated = validateComponentProps(props, 'PageHeader');

  // Validate role
  if (props.role && !['banner', 'header'].includes(props.role)) {
    logger.warn('PageHeader: role should be "banner" or "header".');
  }

  // Validate hasBorder
  if (props.hasBorder !== undefined && typeof props.hasBorder !== 'boolean') {
    logger.warn('PageHeader: hasBorder should be a boolean.');
  }

  return validateAriaAttributes(validated);
}

/**
 * Validate TitleArea props
 *
 * @param props - TitleArea props
 * @returns Validated props
 */
export function validateTitleAreaProps(
  props: Record<string, any>
): Record<string, any> {
  const validated = validateComponentProps(props, 'TitleArea');

  // Validate variant
  if (props.variant && !isValidTitleVariant(props.variant)) {
    logger.warn(
      'TitleArea: variant should be one of: subtitle, medium, large, xl, 2xl'
    );
  }

  // Validate align
  if (props.align && !isValidAlignment(props.align)) {
    logger.warn('TitleArea: align should be one of: start, center, end');
  }

  // Validate spacing
  if (props.spacing && !isValidSpacing(props.spacing)) {
    logger.warn('TitleArea: spacing should be one of: tight, normal, loose');
  }

  return validated;
}

/**
 * Validate Title props
 *
 * @param props - Title props
 * @returns Validated props
 */
export function validateTitleProps(
  props: Record<string, any>
): Record<string, any> {
  const validated = validateComponentProps(props, 'Title');

  // Validate as prop
  if (props.as && !isValidTitleComponent(props.as)) {
    logger.warn(
      'Title: as should be one of: h1, h2, h3, h4, h5, h6, div, span'
    );
  }

  // Validate variant
  if (
    props.variant &&
    !['default', 'transparent', 'muted'].includes(props.variant)
  ) {
    logger.warn(
      'Title: variant should be one of: default, transparent, muted'
    );
  }

  // Validate weight
  if (
    props.weight &&
    !['normal', 'medium', 'semibold', 'bold'].includes(props.weight)
  ) {
    logger.warn(
      'Title: weight should be one of: normal, medium, semibold, bold'
    );
  }

  return validated;
}

/**
 * Validate Actions props
 *
 * @param props - Actions props
 * @returns Validated props
 */
export function validateActionsProps(
  props: Record<string, any>
): Record<string, any> {
  const validated = validateComponentProps(props, 'Actions');

  // Validate direction
  if (
    props.direction &&
    !['horizontal', 'vertical'].includes(props.direction)
  ) {
    logger.warn('Actions: direction should be "horizontal" or "vertical".');
  }

  // Validate spacing
  if (props.spacing && !isValidSpacing(props.spacing)) {
    logger.warn('Actions: spacing should be one of: tight, normal, loose');
  }

  // Validate align
  if (props.align && !['start', 'center', 'end'].includes(props.align)) {
    logger.warn('Actions: align should be one of: start, center, end');
  }

  return validated;
}

/**
 * Validate ParentLink props
 *
 * @param props - ParentLink props
 * @returns Validated props
 */
export function validateParentLinkProps(
  props: Record<string, any>
): Record<string, any> {
  const validated = validateComponentProps(props, 'ParentLink');

  // Validate href
  if (!props.href || typeof props.href !== 'string') {
    logger.warn('ParentLink: href is required and should be a string.');
  }

  // Validate external
  if (props.external !== undefined && typeof props.external !== 'boolean') {
    logger.warn('ParentLink: external should be a boolean.');
  }

  // Validate variant
  if (
    props.variant &&
    !['default', 'minimal', 'button'].includes(props.variant)
  ) {
    logger.warn(
      'ParentLink: variant should be one of: default, minimal, button'
    );
  }

  // Validate size
  if (props.size && !isValidSize(props.size)) {
    logger.warn('ParentLink: size should be one of: xs, sm, md, lg, xl, 2xl');
  }

  return validated;
}

// ============================================================================
// DEBUGGING UTILITIES
// ============================================================================

/**
 * Create debug information for component props
 *
 * @param props - Component props
 * @param componentName - Name of the component
 * @returns Debug information object
 */
export function createDebugInfo(
  props: Record<string, any>,
  componentName: string
): Record<string, any> {
  return {
    component: componentName,
    props: Object.keys(props),
    hasChildren: !!props.children,
    hasClassName: !!props.className,
    hasAriaLabel: !!props['aria-label'],
    hasAriaLabelledBy: !!props['aria-labelledby'],
    isHidden: !!props.hidden,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Log validation warnings in development
 *
 * @param warnings - Array of warning messages
 * @param componentName - Name of the component
 */
export function logValidationWarnings(
  warnings: string[],
  componentName: string
): void {
  if (process.env.NODE_ENV === 'development' && warnings.length > 0) {
    logger.warn(`🔍 ${componentName} Validation Warnings`);
    warnings.forEach(warning => logger.warn(warning));
    logger.warn(`🔍 ${componentName} Validation Warnings`);
  }
}
