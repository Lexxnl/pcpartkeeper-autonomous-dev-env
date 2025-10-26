# Deployment Guide

This document describes how to build and deploy the PCPartKeeper-React application.

---

## 🏗️ Build Process

### Prerequisites
- Node.js 18 or higher
- npm installed

### Build Command

```bash
npm run build
```

This command:
- Runs TypeScript type checking
- Bundles the application with Vite
- Optimizes assets (minification, tree-shaking)
- Generates production-ready files in `dist/` directory
- Creates source maps for debugging (in development)

### Build Output
```
dist/
  ├── index.html
  ├── assets/
  │   ├── index-<hash>.css
  │   ├── index-<hash>.js
  │   └── chunk-<hash>.js (vendor and feature chunks)
  └── ...
```

### Build Configuration
Configured in `vite.config.js`:
- Manual code splitting for optimized bundles
- Vendor chunks (React, Zustand, etc.)
- Feature chunks (DataTable, PageHeader, etc.)
- Terser minification
- Gzip compression

---

## 🔧 Environment Variables

### Development
Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_ENV=development
```

### Production
Set environment variables in your hosting platform:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_ENV=production
```

### Available Variables
- `VITE_API_BASE_URL`: Backend API endpoint URL
- `VITE_APP_ENV`: Environment name (dev, staging, production)

---

## 📦 Build Artifacts

### What Gets Deployed
- **index.html**: Entry point
- **assets/**: All JavaScript, CSS, and other assets
- **Optimized bundles**: Minified and compressed
- **Source maps**: Available in development builds

### Bundle Sizes
Typical production build:
- Total JavaScript: ~140 KB (uncompressed)
- Total CSS: ~57 KB (uncompressed)
- Total size: ~197 KB (uncompressed)
- Gzipped: ~60 KB

---

## 🚀 Deployment Steps

### 1. Pre-Deployment Checks

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check

# Build the application
npm run build

# Verify build output
ls -la dist/
```

### 2. Deploy to Hosting Provider

#### Railway
```bash
# Railway automatically detects and deploys
# Just push to main branch
git push origin main
```

Configuration file: `railway.json`

#### Netlify
```bash
# Deploy using Netlify CLI
netlify deploy --prod --dir=dist
```

Or use Netlify's automatic deployment from Git.

#### Vercel
```bash
# Deploy using Vercel CLI
vercel --prod
```

Or connect your repository for automatic deployments.

### 3. Verify Deployment

After deployment, verify:
- [ ] Application loads successfully
- [ ] No console errors
- [ ] API calls work correctly
- [ ] All features functional
- [ ] Performance metrics acceptable

---

## 🎯 Hosting Providers

### Railway
**Configuration:** `railway.json`
- Automatic deployments from Git
- Environment variables in dashboard
- Custom domain support

### Netlify
**Configuration:** `netlify.toml` (create if needed)
- Continuous deployment
- Branch preview deployments
- Asset optimization

### Vercel
**Configuration:** Automatic
- Zero-config deployment
- Edge network
- Analytics included

### Other Providers
- **GitHub Pages**: Build and deploy from `dist/`
- **AWS S3 + CloudFront**: Static hosting
- **Azure Static Web Apps**: Full-stack hosting
- **Firebase Hosting**: Google's hosting solution

---

## 🔍 Post-Deployment

### Monitoring
- Check error monitoring (Sentry, etc.)
- Monitor performance metrics
- Watch for build failures
- Track user analytics

### Rollback Plan
If deployment fails:
1. Identify the issue
2. Revert the commit if necessary
3. Re-deploy previous working version
4. Fix the issue in a new branch
5. Test and re-deploy

### Performance Checklist
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Bundle size within limits
- [ ] No console errors

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Check for TypeScript errors
npm run type-check

# Check for import errors
npm run build -- --debug

# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### Deployment Fails
1. Check environment variables
2. Verify build output exists
3. Check hosting provider logs
4. Ensure Node.js version is correct

### Runtime Errors
1. Check browser console
2. Verify API endpoints
3. Check CORS settings
4. Verify environment variables

---

## 📝 Continuous Integration

### GitHub Actions (Recommended)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm run deploy
```

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)

---

**Last Updated:** December 2024

