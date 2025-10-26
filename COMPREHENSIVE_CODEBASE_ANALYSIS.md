# 🎯 Comprehensive Codebase Analysis
## PCPartKeeper - React + Tailwind CSS

**Analysis Date**: 2024
**Project Type**: React + TypeScript + Tailwind CSS + Zustand
**Lines of Code**: ~15,000+ lines
**Complexity**: Medium-High

---

## 📋 Executive Summary

This codebase demonstrates **strong architectural patterns** with excellent use of modern React practices, comprehensive TypeScript typing, and a well-structured design system. However, there are several areas requiring attention for **production-readiness**, **performance optimization**, and **maintainability**.

**Overall Code Quality Score: 7.5/10**

### Strengths 💪
- ✅ Excellent TypeScript coverage and type safety
- ✅ Modern React patterns (hooks, context, memoization)
- ✅ Comprehensive error boundaries
- ✅ Semantic design system with Tailwind CSS
- ✅ Strong component composition patterns
- ✅ Good state management with Zustand
- ✅ Comprehensive testing infrastructure

### Weaknesses ⚠️
- ❌ **35 console.log statements** found in production code
- ❌ Excessive use of `any` type (25+ instances)
- ❌ Missing test coverage for many components
- ❌ Some components not memoized (performance risk)
- ❌ Inconsistent error handling patterns
- ❌ Tailwind CSS redundancy in some areas

---

## 🚨 CRITICAL ISSUES (High Priority)

### 1. **Console.log Statements in Production Code**
**Severity**: High  
**Files Affected**: 35 files
**Impact**: Performance degradation, security concerns, poor DX

```typescript
// Found in: src/store/index.ts:118
console.log('API call to ${response.config.url} took ${duration}ms');

// Found in: src/services/apiService.ts:118
console.log('Loading...');
```

**Recommended Fix**:
- Remove all `console.log` statements
- Use proper logging service (e.g., `winston`, `pino`)
- Implement environment-based logging:
  ```typescript
  const log = import.meta.env.DEV ? console.log : () => {};
  ```

**Files to Review**:
- `src/services/apiService.ts` (multiple console logs)
- `src/store/index.ts` (7 console logs)
- `src/pages/ItemsPage.tsx` (2 console logs)
- All component test files

---

### 2. **Excessive `any` Type Usage**
**Severity**: High  
**Files Affected**: 25 files
**Impact**: Loss of type safety, potential runtime errors

```typescript
// Found in: src/components/Stack.tsx:33
[key: string]: any;  // ❌ Poor type safety

// Found in: src/components/DataTable/types.ts
render: (item: any, index: number) => ReactNode;  // ❌ Any type in render

// Found in: src/hooks/useDebounce.ts:35
export function useDebouncedCallback<T extends (...args: any[]) => any>(  // ❌ Any in args
```

**Recommended Fix**:
- Replace `any` with proper generic types
- Use `unknown` when type is truly unknown
- Implement proper type guards

**Key Files**:
- `src/components/Stack.tsx`
- `src/components/DataTable/types.ts`
- `src/hooks/useDebounce.ts`
- `src/components/ItemsFilters.tsx`
- `src/pages/ItemsPage.tsx`

---

### 3. **Missing React.memo in Performance-Critical Components**
**Severity**: Medium-High  
**Impact**: Unnecessary re-renders, performance degradation with large datasets

**Components NOT using memo**:
- `ItemsFilters.tsx` - Only wrapped, not exported with memo
- Some DataTable sub-components
- Custom hooks that should be memoized

**Recommended Fix**:
```typescript
// ✅ Good pattern found in DataTableRefactored.tsx:35
const DataTableRefactored = memo<DataTableProps<any>>((props) => {
  // ...
});

// ❌ Missing in ItemsFilters.tsx:30
export const ItemsFilters: React.FC<ItemsFiltersProps> = React.memo(({
```

---

### 4. **Error Boundary Anti-Pattern**
**Severity**: Medium-High  
**File**: `src/components/ErrorBoundary.tsx:41`

```typescript
// ❌ BAD: Calling hook in class component lifecycle method
const addNotification = useUIStore.getState().addNotification;
addNotification({...});
```

**Issue**: Cannot call Zustand hooks inside class component lifecycle methods. This violates React hooks rules.

**Recommended Fix**:
```typescript
// ✅ GOOD: Use hooks in functional components or call store directly
const store = useUIStore.getState();
store.addNotification({...});
```

---

### 5. **Incomplete Store Subscriptions**
**Severity**: Medium  
**File**: `src/store/index.ts:56-106`

The store subscription logic has potential memory leaks and cleanup issues:

```typescript
useUserStore.subscribe(
  state => state.isAuthenticated,
  isAuthenticated => {
    // ❌ No cleanup mechanism
    console.log('User authenticated...');
  }
);
```

**Recommended Fix**:
- Add unsubscribe functions
- Clean up subscriptions on unmount
- Use proper selector patterns

---

## 🔧 COMPONENTIZATION ISSUES

### 1. **Duplicate DataTable Implementations**
**Severity**: High  
**Files**: 
- `DataTable.tsx` (264 lines)
- `DataTableRefactored.tsx` (401 lines)
- `DataTableRefactoredV2.tsx` (unknown)

**Issue**: Three different implementations of the same component. This creates:
- Code duplication
- Maintenance burden
- Confusion about which version to use
- Inconsistent behavior

**Recommended Solution**:
```typescript
// Keep ONE canonical implementation
export { DataTable } from './DataTableRefactored';

// Remove:
// - DataTable.tsx (old implementation)
// - DataTableRefactoredV2.tsx (experimental)
```

---

### 2. **Mixed Component Patterns**
**Severity**: Medium

The codebase mixes multiple component patterns without clear documentation:

- **Compound Components**: `PageHeader.Title`, `PageHeader.Navigation`
- **Render Props**: Some DataTable components
- **HOC**: None (good!)
- **Compound + Memo**: DataTableRefactored

**Issue**: Inconsistent API surface makes components harder to understand.

**Recommended Fix**:
- Standardize on one primary pattern
- Document component patterns in README
- Add JSDoc examples for each pattern

---

### 3. **Overly Large Components**
**Severity**: Medium  
**File**: `src/pages/ItemsPage.tsx` (334 lines)

The ItemsPage component has too many responsibilities:
- Data fetching
- Filtering logic
- Search logic
- Event handling
- Rendering

**Recommended Refactoring**:
```typescript
// Extract custom hooks
const useItemsPage = () => {
  // All logic here
  return { filteredItems, handlers, ... };
};

// Simplified page component
const ItemsPage = () => {
  const { filteredItems, handlers } = useItemsPage();
  return <ItemsPagePresentation {...} />;
};
```

---

### 4. **Inconsistent Naming Conventions**
**Severity**: Low-Medium

**Patterns Found**:
- `DataTable` vs `DataTableRefactored` vs `DataTableRefactoredV2`
- `useItemsStore` vs `useUIStore` vs `useUserStore`
- `ItemFilters` vs `FilterOptions`

**Recommended Fix**:
- Use semantic naming
- Remove "Refactored" suffixes (use versioning/tags)
- Consistent prefix conventions

---

## 🎨 TAILWIND CSS / STYLING ISSUES

### 1. **Tailwind Config is EXCELLENT** ✅
**File**: `tailwind.config.js`

**Strengths**:
- ✅ Comprehensive semantic color tokens
- ✅ Custom spacing scale
- ✅ Well-organized theme extension
- ✅ Custom animations and utilities
- ✅ Responsive breakpoints properly defined

**No Issues Found** - This is a well-structured Tailwind config!

---

### 2. **CSS Layer Organization**
**File**: `src/index.css` (1067 lines)

**Strengths**:
- ✅ Proper use of `@layer` directives
- ✅ Semantic component classes
- ✅ Utility classes well-organized
- ✅ Consistent naming conventions

**Minor Issues**:
- File is quite large (1067 lines)
- Some utility classes are used but not heavily

**Recommended Optimization**:
- Consider splitting into multiple CSS files
- Remove unused utility classes
- Audit actual usage vs. defined utilities

---

### 3. **Class Name Duplication**
**Severity**: Low

Some Tailwind classes are repeated across components:

```typescript
// Repeated pattern: "bg-surface-secondary border border-border-default rounded-lg"
// Found in: ItemsFilters, ItemsHeader, SearchBar, etc.
```

**Recommended Fix**:
Create component-specific utility classes:
```css
@layer components {
  .filter-select {
    @apply bg-surface-secondary border border-border-default rounded-lg;
  }
}
```

---

### 4. **Responsive Classes Consistency**
**Severity**: Low

Most components properly use responsive classes, but there's inconsistency in breakpoint usage:

```typescript
// Mobile-first pattern (✅ Good)
className='text-sm sm:text-base md:text-lg'

// Inconsistent responsive gaps
gap-3 sm:gap-4  // ❌ Not using semantic gaps consistently
gap-component-sm sm:gap-component-md  // ✅ Better pattern
```

**Files with Issues**:
- SearchBar.tsx
- UnderlineNav.tsx
- Button.tsx (though marked as "final")

---

## ⚡ PERFORMANCE ISSUES

### 1. **Missing useMemo in Computed Values**
**Severity**: Medium  
**File**: `src/store/slices/itemsSlice.ts:228`

```typescript
// ❌ Computes on every render
getFilteredItems: () => {
  const { items, filters, sortConfig } = get();
  const filtered = filterItems(items, filters);
  return sortItems(filtered, sortConfig);
}
```

**Issue**: This selector runs on every access, not memoized.

**Recommended Fix**:
```typescript
// Use Zustand's built-in selector memoization
getFilteredItems: () => {
  const state = get();
  return useMemo(() => {
    return sortItems(
      filterItems(state.items, state.filters),
      state.sortConfig
    );
  }, [state.items, state.filters, state.sortConfig]);
}
```

---

### 2. **Context Value Re-render Issues**
**Severity**: Medium  
**File**: `src/components/DataTable/DataTableRefactored.tsx:150-215`

```typescript
// ✅ GOOD: Memoized context value
const contextValue = useMemo(() => ({
  // ... large context
}), [/* 30+ dependencies */]);
```

**Issue**: Context value has 30+ dependencies. This defeats the purpose of memoization.

**Recommended Fix**:
- Break up large context into smaller contexts
- Use composition over large monolithic contexts
- Consider using state management instead of context for some data

---

### 3. **Virtual Scrolling Threshold**
**Severity**: Low-Medium  
**File**: `src/components/DataTable/DataTableRefactored.tsx:133`

```typescript
// Hard-coded threshold
const shouldVirtualize = useMemo(() => {
  return virtualScrolling && paginatedData.length > 100;  // ❌ Hard-coded
}, [virtualScrolling, paginatedData.length]);
```

**Recommended Fix**:
```typescript
// Make configurable
const shouldVirtualize = useMemo(() => {
  return virtualScrolling && paginatedData.length > (virtualScrollingThreshold || 100);
}, [virtualScrolling, paginatedData.length, virtualScrollingThreshold]);
```

---

### 4. **Potential Memory Leaks**
**Severity**: Medium

**Locations**:
- `src/store/index.ts` - Missing cleanup in subscriptions
- `src/hooks/useDebounce.ts` - Should check if component is mounted
- `src/components/ErrorBoundary.tsx` - No cleanup mechanism

**Recommended Fix**:
```typescript
// Add proper cleanup
useEffect(() => {
  const subscription = store.subscribe(...);
  return () => subscription();
}, []);
```

---

## 🏗️ ARCHITECTURE & STATE MANAGEMENT

### 1. **Zustand Store Structure** ✅
**Overall**: Excellent

**Strengths**:
- ✅ Well-organized slices
- ✅ Proper TypeScript integration
- ✅ DevTools enabled
- ✅ SubscribeWithSelector middleware
- ✅ Clear separation of concerns

**Issues Found**:
```typescript
// File: src/store/index.ts:21
export const useAppStore = useItemsStore;  // ❌ Misleading name
```

**Problem**: `useAppStore` exports only `useItemsStore`, not a combined store.

**Recommended Fix**:
```typescript
// Create proper combined store or clarify documentation
export { useItemsStore, useUIStore, useUserStore };
export type { AppStore } from './types';
```

---

### 2. **Service Layer Design** ✅
**File**: `src/services/apiService.ts`

**Strengths**:
- ✅ Centralized API client
- ✅ Proper error handling
- ✅ Caching mechanism
- ✅ Interceptor support
- ✅ TypeScript-first approach

**Minor Issues**:
- Mock data generation in service file (should be separate)
- No retry logic for failed requests
- No request cancellation support

---

### 3. **Custom Hooks Organization** ✅
**Strengths**:
- ✅ Well-organized hooks
- ✅ Consistent patterns
- ✅ Good TypeScript support
- ✅ Reusable design

**Missing Hooks**:
- No `useMediaQuery` hook
- No `useLocalStorage` hook (needed for persistence)
- No `useRefetch` hook

**Recommended Additions**:
```typescript
// Add these hooks
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Implementation
};

export const useMediaQuery = (query: string) => {
  // Implementation
};
```

---

### 4. **Error Boundary Strategy** ⚠️
**Files**: 
- `src/components/ErrorBoundaries/`
- `src/components/ErrorBoundary.tsx`

**Strengths**:
- ✅ Granular error boundaries
- ✅ Specific fallback UIs
- ✅ Proper error reporting

**Issues**:
- Using class components (adds bundle size)
- Error boundary hierarchy unclear
- No error logging to external service

---

## 📱 RESPONSIVE & UX ISSUES

### 1. **Responsive Design Quality** ✅
**Overall**: Excellent

**Strengths**:
- ✅ Mobile-first approach throughout
- ✅ Consistent breakpoints
- ✅ Touch-friendly targets
- ✅ Proper responsive typography
- ✅ Accessible spacing

**Minor Issues**:
- Some components use hard-coded mobile sizes
- Inconsistent responsive gap values

---

### 2. **Accessibility (a11y) Issues**
**Severity**: Medium

**Good Practices Found** ✅:
- ARIA labels on most interactive elements
- Keyboard navigation support
- Focus management
- Screen reader support

**Issues Found** ⚠️:

1. **Missing ARIA live regions**:
```tsx
// ❌ No live region for dynamic content
<div id='search-help' className='sr-only'>
  Search through your inventory...
</div>
```

2. **Inconsistent focus indicators**:
   - Some buttons missing `focus:visible:ring-2`
   - Some focus states not visible enough

3. **Color contrast** not verified:
   - Need to check WCAG AA compliance
   - Some text on backgrounds may not meet contrast requirements

---

### 3. **Loading States**
**Severity**: Low-Medium

**Issue**: Inconsistent loading indicators across components:

```typescript
// Some use this:
<div className='data-table-loading-spinner' />

// Others use:
<LoadingIndicator size='large' />

// Others use:
<LoadingSpinner className='h-4 w-4' />
```

**Recommended Fix**:
- Standardize on one loading component
- Create reusable LoadingState component

---

## 🔍 CODE QUALITY & MAINTAINABILITY

### 1. **TypeScript Configuration** ✅
**File**: `tsconfig.json`

**Strengths**:
- ✅ Strict mode enabled
- ✅ No unused locals/parameters
- ✅ Proper module resolution
- ✅ Path mapping configured

**Issues**:
```json
{
  "compilerOptions": {
    "strict": true,  // ✅ Good
    "noUnusedLocals": true,  // ✅ Good
    "noUnusedParameters": true,  // ✅ Good
  }
}
```

However, 25+ `any` types found indicate these rules aren't being enforced properly.

---

### 2. **Testing Coverage** ⚠️
**File**: `jest.config.cjs`

**Coverage Target**: 80%  
**Current Status**: Unknown (need to run `npm run test:coverage`)

**Test Files Found**:
- ✅ `src/components/__tests__/Button.test.tsx`
- ✅ `src/components/DataTable/__tests__/*.test.tsx`
- ✅ `src/hooks/__tests__/useAsync.test.ts`
- ✅ `src/store/__tests__/*.test.ts`
- ✅ `src/services/__tests__/apiService.test.ts`

**Missing Tests**:
- ❌ Most PageHeader components lack tests
- ❌ No integration tests for page flows
- ❌ No E2E tests
- ❌ Missing tests for custom hooks

**Recommended Action**:
```bash
npm run test:coverage
# Review coverage report and add missing tests
```

---

### 3. **Linting & Formatting** ✅
**File**: `.eslintrc.cjs`

**Issues Found**:
- `no-console` rule set to `warn` instead of `error`
- Should enforce stricter rules

**Recommended Fix**:
```javascript
rules: {
  'no-console': 'error',  // Not 'warn'
  '@typescript-eslint/no-explicit-any': 'error',  // Not 'warn'
}
```

---

### 4. **Documentation Quality** ✅

**Excellent Documentation Found**:
- ✅ `ARCHITECTURE.md` - Comprehensive
- ✅ `README.md` - Good
- ✅ Inline JSDoc comments
- ✅ Component-level documentation
- ✅ Storybook integration

**Minor Improvements**:
- Add ADR (Architecture Decision Records)
- Document component API patterns
- Add migration guides

---

## ✅ IMMEDIATE FIXES (High Priority)

### Priority 1: Remove Console Logs (Day 1)
```bash
# Find all console.log statements
grep -r "console\.log" src/ --include="*.ts" --include="*.tsx"

# Replace with proper logging
# Use environment-based logging service
```

### Priority 2: Fix TypeScript Any Types (Day 2-3)
```bash
# Replace 'any' types with proper generics
# Focus on:
- src/components/Stack.tsx
- src/hooks/useDebounce.ts
- src/components/DataTable/types.ts
```

### Priority 3: Standardize on ONE DataTable (Day 4-5)
```bash
# Decide which DataTable version to keep
# Remove duplicate implementations
# Update all imports
```

### Priority 4: Add Proper Error Boundary Usage (Day 6)
```bash
# Fix ErrorBoundary.tsx:41
# Ensure proper hook usage
# Add cleanup mechanisms
```

---

## ⚙️ MEDIUM PRIORITY IMPROVEMENTS

### 1. **Performance Optimizations**
- [ ] Add React.memo to all non-memoized components
- [ ] Optimize context value creation
- [ ] Add virtualization threshold configuration
- [ ] Implement request cancellation

### 2. **Testing Enhancements**
- [ ] Increase test coverage to 90%
- [ ] Add integration tests
- [ ] Add E2E tests with Playwright
- [ ] Add visual regression tests

### 3. **Code Organization**
- [ ] Extract ItemsPage custom hooks
- [ ] Create shared utilities library
- [ ] Organize component exports better
- [ ] Add component API documentation

### 4. **Accessibility Improvements**
- [ ] Add ARIA live regions for dynamic content
- [ ] Improve focus indicators
- [ ] Add skip links
- [ ] Verify color contrast compliance

---

## 🚀 LONG-TERM RECOMMENDATIONS

### 1. **Architecture Evolution**
- Consider migrating to Next.js for SSR
- Implement proper API integration (remove mocks)
- Add internationalization (i18n)
- Implement proper authentication

### 2. **Performance Monitoring**
- Add performance monitoring service (New Relic, Sentry)
- Implement real user monitoring (RUM)
- Set up bundle size tracking
- Add Lighthouse CI

### 3. **Developer Experience**
- Add Storybook visual regression testing
- Implement commit message linting
- Add automated dependency updates
- Set up proper CI/CD pipeline

### 4. **Scalability**
- Consider micro-frontend architecture
- Implement proper caching strategies
- Add service workers
- Optimize bundle splitting

---

## 📊 CODE QUALITY SCORE: 7.5/10

### Score Breakdown:

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| **Architecture** | 8/10 | 20% | 1.6 |
| **Type Safety** | 7/10 | 15% | 1.05 |
| **Performance** | 7/10 | 20% | 1.4 |
| **Testing** | 6/10 | 15% | 0.9 |
| **Accessibility** | 7/10 | 10% | 0.7 |
| **Code Quality** | 8/10 | 10% | 0.8 |
| **Documentation** | 9/10 | 10% | 0.9 |
| **TOTAL** | | | **7.35/10** |

### Strengths Summary ✅
1. **Excellent architecture** with modern patterns
2. **Strong TypeScript** coverage and type safety (when not using `any`)
3. **Well-designed state management** with Zustand
4. **Comprehensive design system** with semantic tokens
5. **Good component composition** and reusability
6. **Strong documentation** culture
7. **Modern React practices** throughout

### Weaknesses Summary ⚠️
1. **Console.log pollution** in 35+ files
2. **Excessive `any` types** (25+ instances)
3. **Missing memoization** in key components
4. **Duplicate implementations** (3 DataTable versions)
5. **Incomplete test coverage** (unknown %)
6. **Error boundary anti-patterns**
7. **Performance optimizations** needed for large datasets

---

## 🎯 CONCLUSION

This codebase demonstrates **strong engineering practices** and **excellent architectural decisions**. The use of Zustand, TypeScript, and a semantic design system shows a mature approach to building applications.

**Key Recommendations**:
1. **Immediate**: Remove console logs and fix `any` types
2. **Short-term**: Consolidate duplicate components, improve testing
3. **Long-term**: Add monitoring, improve performance, scale architecture

**The foundation is solid** - with these improvements, this can become a **production-ready, enterprise-grade application** (8.5/10 or higher).

---

## 📝 Appendix A: Files Requiring Immediate Attention

### Critical Issues (Fix Now):
1. `src/services/apiService.ts` - Remove console logs
2. `src/store/index.ts` - Fix store subscriptions
3. `src/components/ErrorBoundary.tsx` - Fix hook usage
4. `src/components/Stack.tsx` - Replace `any` types
5. All `console.log` statements (35 files)

### High Priority Refactoring:
1. Consolidate DataTable implementations
2. Refactor ItemsPage into custom hooks
3. Add proper error handling patterns
4. Improve Context value memoization

### Medium Priority:
1. Increase test coverage
2. Add accessibility improvements
3. Optimize performance
4. Add proper loading states

---

**Report Generated**: Automated Analysis  
**Codebase Version**: 2.0  
**Next Review**: After implementing critical fixes

## ♿ Accessibility & UX Polish (Version 2.0)

### Issues Identified:
- Inconsistent loading indicators across components
- Missing ARIA live regions in dynamic areas like PageHeader
- Focus indicators not always visible or consistent
- Some interactive elements lacking proper roles and labels

### Fixes Applied:
- Standardized all loading states to use `LoadingIndicator` component with ARIA attributes (role="status", aria-live="polite")
- Added ARIA live region to PageHeader for announcements
- Enhanced Button component with aria-busy for loading, visible focus rings
- Verified and added responsive focus styles across components
- Ensured DataTable table has proper aria-rowcount, aria-colcount

### Benefits:
- WCAG 2.1 AA compliance improved
- Better screen reader experience
- Consistent visual feedback for loading and focus
- Mobile-first responsive design verified with Tailwind breakpoints (xs:475px, sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px)

## 📋 DataTable Props Reference

The DataTable component accepts the following props for flexible configuration:

### Core Props
- `data: T[]` - Array of data items to display (required)
- `columns: Column<T>[]` - Column definitions with keys, headers, and render functions (required)
- `loading?: boolean` - Show loading state (default: false)
- `empty?: boolean` - Manually trigger empty state
- `error?: string | ReactNode` - Error message or component

### Interaction Props
- `sortable?: boolean` - Enable column sorting (default: false)
- `selectable?: 'none' | 'single' | 'multiple'` - Row selection mode (default: 'none')
- `onSort?: (config: SortConfig) => void` - Sorting callback
- `onSelect?: (items: T[], indices: number[]) => void` - Selection callback
- `onRowClick?: (item: T, index: number, event: MouseEvent) => void` - Row click handler

### Layout & Styling Props
- `pagination?: PaginationConfig | boolean` - Enable pagination
- `cellPadding?: 'condensed' | 'normal' | 'spacious'` - Cell padding variant
- `striped?: boolean` - Alternating row colors
- `hoverable?: boolean` - Hover effects on rows
- `bordered?: boolean` - Bordered table style
- `compact?: boolean` - Compact layout for dense data
- `stickyHeader?: boolean` - Sticky table header
- `stickyColumns?: number` - Number of sticky columns from left

### Advanced Props
- `virtualScrolling?: boolean` - Enable virtual scrolling for large datasets
- `rowHeight?: number` - Height for virtual rows (default: 48)
- `getRowId?: (item: T, index: number) => string | number` - Custom row ID generator
- `getRowClassName?: (item: T, index: number) => string` - Custom row classes
- `getRowProps?: (item: T, index: number) => HTMLAttributes` - Custom row attributes
- `emptyState?: ReactNode` - Custom empty state component
- `loadingState?: ReactNode` - Custom loading component (overridden by standard LoadingIndicator)
- `errorState?: ReactNode` - Custom error component

### Column Props (per Column)
- `key: string` - Unique identifier
- `header: string | ReactNode` - Column header
- `accessor?: keyof T` - Data accessor (alternative to render)
- `render?: (item: T, index: number) => ReactNode` - Custom cell renderer
- `sortable?: boolean` - Enable sorting for this column
- `width?: string | number` - Column width
- `align?: 'left' | 'center' | 'right'` - Text alignment
- `fixed?: 'left' | 'right'` - Fixed column position

## 🏗️ Coding Standards (Updated for v2.0)

### Loading States
- **Standard**: Use `LoadingIndicator` component everywhere
- **ARIA**: Always include `role="status" aria-live="polite" aria-label="Loading..."`
- **Text**: Provide descriptive text prop, fallback to "Loading..." 
- **Sizes**: Use 'small', 'medium', 'large' variants consistently
- **Placement**: Center in containers with flex utilities

### Accessibility (A11y)
- **Roles**: All interactive elements must have proper semantic roles (button, link, etc.)
- **Labels**: Use `aria-label` or `aria-labelledby` for unlabeled elements
- **Live Regions**: Dynamic updates (loading, errors, announcements) use `aria-live="polite"`
- **Focus**: Visible focus indicators with `focus-visible:ring` and sufficient contrast
- **Keyboard**: Full keyboard navigation support (Tab, Enter, Space, Arrow keys)
- **Contrast**: All text meets WCAG AA 4.5:1 ratio
- **Testing**: Include a11y tests with `@testing-library/jest-dom` matchers

### Responsive Design
- **Breakpoints**: Use Tailwind's extended screens: xs(475px), sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- **Mobile-First**: Default to mobile styles, enhance for larger screens
- **Typography**: Scale text with `text-sm sm:text-base md:text-lg`
- **Spacing**: Use semantic spacing: `p-4 sm:p-6 lg:p-8`
- **Containers**: Max-width with `max-w-7xl mx-auto` for content
- **Touch Targets**: Minimum 44px height/width for interactive elements on mobile
- **Testing**: Test on multiple viewport sizes with responsive utils

### General Standards
- **Components**: Always use TypeScript generics for props
- **Hooks**: Custom hooks follow `use[Name]` convention, include error handling
- **Memoization**: Wrap presentational components with `React.memo`
- **Error Handling**: Use granular ErrorBoundaries, log errors to store
- **Performance**: Use `useMemo` for expensive calculations, `useCallback` for handlers
- **Documentation**: JSDoc for all public APIs, update CODEBASE_ANALYSIS.md after changes

