# ADR-0005: Multi-Level Error Boundary Strategy

**Status:** Accepted  
**Date:** December 2024  
**Deciders:** Development Team

## Context

We needed an error handling strategy that:
- Prevents application crashes
- Provides granular error recovery
- Shows appropriate error UI
- Helps with debugging

Options considered:
- **Single page-level boundary**: Simple but all-or-nothing approach
- **Component-level boundaries everywhere**: Too granular, noisy
- **Strategic multi-level boundaries**: Balanced approach

## Decision

Implement a multi-level error boundary strategy with boundaries at page, form, and component levels.

## Consequences

### Positive
- Granular error handling prevents cascade failures
- Users see more helpful error messages
- Parts of app continue working when one part fails
- Better debugging with error context
- Improved UX during error states
- Can show different recovery options

### Negative
- More boundaries to maintain
- Additional error boundary components
- Need to test error scenarios
- Could mask underlying issues if not handled carefully

## Implementation

Three levels of error boundaries:

### 1. PageErrorBoundary
- Catches errors in page-level components
- Shows full error recovery UI
- Used at top of ItemsPage

### 2. FormErrorBoundary
- Catches errors in form components
- Shows form-specific error message
- Allows form to reset or retry

### 3. DataTableErrorBoundary
- Catches errors in table rendering
- Shows table-specific error UI
- Allows table to retry data fetch

```typescript
<PageErrorBoundary>
  {/* Page content */}
  <FormErrorBoundary>
    <ItemsFilters />
  </FormErrorBoundary>
  <DataTableErrorBoundary>
    <DataTable />
  </DataTableErrorBoundary>
</PageErrorBoundary>
```

## Error Types

1. **Render Errors**: Caught by boundaries, show fallback UI
2. **API Errors**: Handled by apiService with graceful degradation
3. **User Errors**: Handled by form validation
4. **Network Errors**: Use mock data fallback

## Notes
- Error boundaries catch errors in render, lifecycle, and constructors
- They do NOT catch errors in event handlers, async code, or SSR
- Each boundary logs errors for debugging
- Recovery options vary by boundary level
- Boundaries are React components that implement componentDidCatch or getDerivedStateFromError

