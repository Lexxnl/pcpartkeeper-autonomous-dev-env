# ADR-0003: Tailwind with Semantic Design Tokens

**Status:** Accepted  
**Date:** December 2024  
**Deciders:** Development Team

## Context

We needed a design system approach that provides:
- Consistent theming across the application
- Easy dark/light mode switching (future)
- Semantic color naming
- Maintainable styling approach

Options considered:
- **Plain CSS**: Full control but lots of boilerplate
- **Styled-components**: CSS-in-JS, but adds runtime overhead
- **CSS Modules**: Scoped styles, but harder to share tokens
- **Tailwind + Custom Tokens**: Utility classes with semantic tokens

## Decision

Use Tailwind CSS with custom semantic design tokens for colors, spacing, and typography.

## Consequences

### Positive
- Rapid development with utility classes
- Consistent spacing and sizing system
- Easy to maintain and update theme
- Small bundle size with purging
- Built-in responsive design utilities
- Semantic naming improves code readability
- Easy migration to light mode in future

### Negative
- Learning curve for Tailwind-specific patterns
- Generated CSS file can be large without proper purging
- Some design patterns may require custom CSS classes
- Requires careful organization of custom tokens

## Implementation

Token structure:
```javascript
// tailwind.config.js
colors: {
  surface: {
    page: '#010409',
    primary: '#0d1117',
    secondary: '#161b22',
    // ...
  },
  text: {
    primary: '#ffffff',
    secondary: '#e6edf3',
    muted: '#9198a1',
    // ...
  },
  action: {
    primary: '#238636',
    danger: '#da3633',
    // ...
  }
}
```

## Notes
- All colors use semantic names (text-primary) not descriptive names (blue-500)
- CSS variables defined in index.css for future theme switching
- Utility classes in index.css for common patterns
- Responsive design uses mobile-first approach with sm:, md:, lg: breakpoints
- Color contrast ratios verified to meet WCAG AA standards

