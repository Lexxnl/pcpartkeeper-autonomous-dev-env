# Contributing to PCPartKeeper-React

Thank you for your interest in contributing to PCPartKeeper-React! This document provides guidelines for contributing to the project.

---

## 🚀 Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd PCPartKeeper-React

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 📝 Code Standards

### TypeScript
- Always use TypeScript for new code
- Type all function parameters and return values
- Use interfaces for object types
- Use enums for constant values

### Component Guidelines
- Use functional components with hooks
- Use `React.memo` for list items and performance-critical components
- Use semantic HTML elements
- Include ARIA labels for accessibility
- Follow the component structure in `src/components/`

### Styling
- Use Tailwind CSS utility classes
- Use semantic design tokens (text-primary, surface-secondary, etc.)
- Follow responsive design patterns (mobile-first)
- Use the design tokens from `tailwind.config.js`

### State Management
- Use Zustand for global state
- Keep state local when possible
- Use store selectors for performance
- Follow the store structure in `src/store/`

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Button.test.tsx
```

### Writing Tests
- Write tests for all new components
- Test user interactions and edge cases
- Test accessibility with jest-axe
- Aim for >80% code coverage

### Test File Naming
- Component tests: `ComponentName.test.tsx`
- Integration tests: `ComponentName.integration.test.tsx`
- Accessibility tests: `ComponentName.a11y.test.tsx`

---

## 📦 Import Paths

### Use @/ Alias for Imports
We use the `@/` alias for cleaner import paths:

```typescript
// ✅ Good: Use @/ alias
import { cn } from '@/lib/utils';
import { Item } from '@/store/types';

// ❌ Bad: Don't use relative paths
import { cn } from '../../lib/utils';
import { Item } from '../../store/types';
```

### Import Organization
```typescript
// 1. External dependencies
import React, { useState } from 'react';
import { useItemsStore } from '@/store';

// 2. Internal components
import Button from '@/components/Button';
import DataTable from '@/components/DataTable';

// 3. Utilities and hooks
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

// 4. Types
import type { Item, FilterOptions } from '@/store/types';
```

---

## 🏗️ Component Structure

### Component Template

```typescript
import React from 'react';

/**
 * ComponentName - Brief description
 *
 * Longer description of what the component does and how it works.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 * @returns {JSX.Element} Component element
 */
interface ComponentNameProps {
  title: string;
  onAction?: () => void;
}

const ComponentName: React.FC<ComponentNameProps> = ({ title, onAction }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default ComponentName;
```

### File Naming Conventions
- Components: `PascalCase.tsx`
- Hooks: `camelCase.ts` (with `use` prefix)
- Utilities: `camelCase.ts`
- Types: `PascalCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts` or `camelCase.ts`

---

## 🚢 Commit Message Format

Follow the conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code restructuring
- `test`: Add or update tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples
```bash
feat(table): Add row selection support

Add ability to select multiple rows in DataTable component.
Includes keyboard navigation and bulk actions.

Ref: #123

fix(search): Resolve debounce timing issue

The search input was debouncing too quickly, causing results
to not update properly. Adjusted debounce delay from 200ms
to 300ms.

Closes #456

docs(readme): Update installation instructions

Updated README with latest Node.js requirements and npm
installation steps.
```

---

## 🔄 Pull Request Process

### Before Creating PR
1. Create a feature branch
   ```bash
   git checkout -b feat/new-feature
   ```
2. Make your changes
3. Run tests and linting
   ```bash
   npm test
   npm run lint
   npm run build
   ```
4. Commit your changes with descriptive messages
5. Push to your fork
   ```bash
   git push origin feat/new-feature
   ```

### Creating the PR
1. Go to GitHub and create a Pull Request
2. Fill in the PR template:
   - Clear title describing the change
   - Description of what changed and why
   - Screenshots if UI changes
   - Link to related issues
   - Check that CI checks pass

### PR Review
- Wait for code review
- Address review comments
- Update the PR if requested
- Once approved, maintainer will merge

---

## 🐛 Bug Reports

When reporting bugs, please include:
1. Description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Browser and OS information
7. Console errors if any

---

## ✨ Feature Requests

When suggesting features:
1. Clearly describe the feature
2. Explain the use case
3. Provide mockups or examples if possible
4. Discuss implementation approach

---

## 📚 Additional Resources

- [Component Documentation](./docs/COMPONENT_ANALYSIS.md)
- [Development Workflow](./docs/DEVELOPMENT_WORKFLOW.md)
- [Theme System](./docs/THEME_SYSTEM.md)
- [Testing Infrastructure](./docs/TESTING_INFRASTRUCTURE.md)
- [Memoization Policy](./MEMOIZATION_POLICY.md)
- [Architecture Decision Records](./docs/adr/)

---

## 📞 Questions?

Feel free to:
- Open an issue for questions
- Ask in discussions
- Check existing documentation

Thank you for contributing! 🎉

