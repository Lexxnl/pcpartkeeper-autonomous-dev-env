# Development Workflow Documentation

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - JavaScript runtime
- **npm 9+** - Package manager
- **Git** - Version control
- **VS Code** (recommended) - Code editor

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-repo/pcpartkeeper-react.git
cd pcpartkeeper-react

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Available Scripts

### Development Scripts

```bash
# Start development server
npm run dev                 # http://localhost:5173

# Build for production
npm run build              # Creates dist/ folder

# Preview production build
npm run preview            # Preview built application

# Start production server
npm run start              # Serve built application
```

### Testing Scripts

```bash
# Run all tests
npm test                   # Run test suite

# Run tests with coverage
npm run test:coverage      # Generate coverage report

# Run tests in watch mode
npm run test:watch         # Watch for changes

# Run tests in CI mode
npm run test:ci            # CI-optimized test run
```

### Code Quality Scripts

```bash
# Run ESLint
npm run lint               # Check code quality

# Fix ESLint issues
npm run lint -- --fix      # Auto-fix linting issues

# Type checking
npm run type-check         # TypeScript type checking
```

### Documentation Scripts

```bash
# Start Storybook
npm run storybook          # http://localhost:6006

# Build Storybook
npm run build-storybook    # Build static Storybook

# Build bundle analysis
npm run analyze            # Analyze bundle size
```

### Migration Scripts

```bash
# PageHeader migration
npm run migrate:pageheader           # Run migration
npm run migrate:pageheader:dry       # Dry run
npm run migrate:pageheader:validate  # Validate migration
npm run migrate:pageheader:report    # Generate report
```

## 🏗️ Development Environment

### VS Code Configuration

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

### Recommended Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**
- **GitLens**

### Environment Variables

```bash
# .env.local
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=PCPartKeeper
VITE_APP_VERSION=1.0.0
```

## 🔄 Git Workflow

### Branch Naming

```bash
# Feature branches
feature/add-item-modal
feature/search-functionality
feature/user-authentication

# Bug fix branches
fix/button-styling-issue
fix/search-performance
fix/accessibility-problems

# Hotfix branches
hotfix/critical-security-patch
hotfix/production-bug
```

### Commit Convention

```bash
# Format: type(scope): description
feat(button): add loading state to primary button
fix(search): resolve search performance issue
docs(readme): update installation instructions
style(theme): update color token values
refactor(components): extract common button logic
test(button): add accessibility tests
chore(deps): update dependencies
```

### Pull Request Process

1. **Create feature branch** from main
2. **Make changes** with descriptive commits
3. **Run tests** and ensure they pass
4. **Update documentation** if needed
5. **Create pull request** with description
6. **Request review** from team members
7. **Address feedback** and make changes
8. **Merge** after approval

## 🧪 Testing Workflow

### Test-Driven Development

```bash
# 1. Write failing test
npm test -- --testNamePattern="should add item"

# 2. Implement feature
# ... write code ...

# 3. Run tests to verify
npm test

# 4. Refactor if needed
# ... refactor code ...

# 5. Run tests again
npm test
```

### Test Coverage

```bash
# Check current coverage
npm run test:coverage

# Coverage thresholds (enforced in CI)
# - Branches: 80%
# - Functions: 80%
# - Lines: 80%
# - Statements: 80%
```

### Testing Best Practices

- **Write tests first** (TDD approach)
- **Test behavior, not implementation**
- **Use descriptive test names**
- **Keep tests focused and simple**
- **Mock external dependencies**
- **Test accessibility with jest-axe**

## 🎨 Styling Workflow

### Design System Usage

```typescript
// ✅ Use semantic tokens
<div className="bg-surface-primary text-text-secondary">

// ❌ Don't use hardcoded colors
<div className="bg-gray-900 text-white">
```

### Component Styling

```typescript
// 1. Use existing component classes
<button className="btn-primary">Click me</button>

// 2. Use semantic design tokens
<div className="bg-surface-primary border border-border-default">

// 3. Use responsive design
<div className="flex flex-col sm:flex-row">
```

### Theme Customization

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add new semantic tokens here
        surface: {
          custom: '#custom-color',
        },
      },
    },
  },
};
```

## 🔧 Component Development

### Creating New Components

```bash
# 1. Create component file
touch src/components/NewComponent.jsx

# 2. Create test file
touch src/components/NewComponent.test.jsx

# 3. Create Storybook story
touch src/components/NewComponent.stories.jsx

# 4. Add to exports
# Update src/components/index.js
```

### Component Structure

```typescript
// NewComponent.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * NewComponent - Component description
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 * @param {Function} props.onClick - Click handler
 */
const NewComponent = ({ title, onClick, ...props }) => {
  return (
    <div className="bg-surface-primary text-text-secondary" {...props}>
      <h2 className="text-text-primary">{title}</h2>
      <button
        className="btn-primary"
        onClick={onClick}
        aria-label="Action button"
      >
        Action
      </button>
    </div>
  );
};

NewComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NewComponent;
```

### Testing New Components

```typescript
// NewComponent.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import NewComponent from './NewComponent';

expect.extend(toHaveNoViolations);

describe('NewComponent', () => {
  test('renders with title', () => {
    render(<NewComponent title="Test Title" onClick={jest.fn()} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<NewComponent title="Test" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is accessible', async () => {
    const { container } = render(
      <NewComponent title="Test" onClick={jest.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 📚 Documentation Workflow

### Storybook Development

```bash
# Start Storybook
npm run storybook

# Create new story
# Add to component.stories.jsx
```

### Story Structure

```typescript
// Component.stories.jsx
export default {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Component description',
      },
    },
  },
};

export const Default = {
  args: {
    title: 'Default Title',
    onClick: () => console.log('Clicked'),
  },
};

export const WithCustomProps = {
  args: {
    title: 'Custom Title',
    onClick: () => console.log('Custom click'),
  },
};
```

### JSDoc Documentation

````typescript
/**
 * ComponentName - Component description
 *
 * A detailed description of what the component does,
 * its purpose, and how it should be used.
 *
 * @example
 * ```jsx
 * <ComponentName title="Hello" onClick={handleClick} />
 * ```
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title to display
 * @param {Function} props.onClick - Click handler function
 * @param {boolean} [props.disabled=false] - Whether component is disabled
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} Rendered component
 */
````

## 🚀 Build & Deployment

### Production Build

```bash
# Create production build
npm run build

# Build output
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── ...
```

### Build Optimization

```bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npx depcheck

# Check for security vulnerabilities
npm audit
```

### Deployment Checklist

- [ ] All tests pass (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Storybook builds (`npm run build-storybook`)
- [ ] Coverage meets thresholds
- [ ] Documentation is updated
- [ ] Performance is acceptable

## 🔍 Debugging

### Common Issues

```bash
# Issue: Port already in use
# Solution: Kill process or use different port
npm run dev -- --port 3001

# Issue: Build fails
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Issue: Tests failing
# Solution: Clear Jest cache
npm test -- --clearCache

# Issue: TypeScript errors
# Solution: Check tsconfig.json and types
npm run type-check
```

### Debug Tools

```bash
# React Developer Tools
# Install browser extension

# Redux DevTools (if using Redux)
# Install browser extension

# Network debugging
# Use browser dev tools

# Performance debugging
# Use React Profiler
```

## 📊 Performance Monitoring

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Check for large dependencies
npm ls --depth=0

# Check for duplicate dependencies
npx npm-check-duplicates
```

### Performance Metrics

```bash
# Lighthouse CI
npx lighthouse-ci autorun

# Bundle size monitoring
npx bundlesize

# Performance testing
npm run test:performance
```

## 🔒 Security

### Security Checklist

- [ ] Dependencies are up to date (`npm audit`)
- [ ] No hardcoded secrets in code
- [ ] Input validation is implemented
- [ ] XSS protection is in place
- [ ] CSRF protection is implemented
- [ ] Content Security Policy is configured

### Security Commands

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated

# Update packages
npm update
```

## 🎯 Best Practices

### Code Quality

- **Follow ESLint rules** - No warnings or errors
- **Use TypeScript** - Type safety for all components
- **Write tests** - Comprehensive test coverage
- **Document code** - JSDoc for all functions
- **Use semantic tokens** - No hardcoded values
- **Follow naming conventions** - Consistent naming

### Performance

- **Optimize images** - Use appropriate formats and sizes
- **Lazy load components** - Use React.lazy for large components
- **Minimize bundle size** - Tree-shake unused code
- **Use memoization** - React.memo for expensive components
- **Monitor performance** - Regular performance audits

### Accessibility

- **Use semantic HTML** - Proper element usage
- **Include ARIA labels** - Screen reader support
- **Test with keyboard** - Full keyboard navigation
- **Test with screen readers** - Accessibility compliance
- **Use jest-axe** - Automated accessibility testing

### Maintenance

- **Keep dependencies updated** - Regular updates
- **Remove dead code** - Clean up unused code
- **Update documentation** - Keep docs in sync
- **Monitor bundle size** - Prevent bloat
- **Review code regularly** - Code reviews

---

_This development workflow documentation is automatically updated as the project evolves._
