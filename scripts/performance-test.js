#!/usr/bin/env node

/**
 * Performance Testing Script
 *
 * Runs performance tests on the built application to ensure
 * it meets performance requirements for production.
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const PERFORMANCE_THRESHOLDS = {
  bundleSize: 2 * 1024 * 1024, // 2MB
  gzippedSize: 500 * 1024, // 500KB
  maxChunkSize: 512 * 1024, // 512KB
  maxMemoryUsage: 100 * 1024 * 1024, // 100MB
};

const COLORS = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

// ============================================================================
// UTILITIES
// ============================================================================

function log(message, color = 'white') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function logHeader(message) {
  log(`\n${COLORS.bold}${COLORS.cyan}${'='.repeat(60)}${COLORS.reset}`);
  log(`${COLORS.bold}${COLORS.cyan}${message}${COLORS.reset}`);
  log(`${COLORS.bold}${COLORS.cyan}${'='.repeat(60)}${COLORS.reset}\n`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ============================================================================
// BUNDLE ANALYSIS
// ============================================================================

function analyzeBundle() {
  const distPath = path.join(process.cwd(), 'dist');

  if (!fs.existsSync(distPath)) {
    logError('Dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  const assetsPath = path.join(distPath, 'assets');
  const files = fs.readdirSync(assetsPath);

  let totalSize = 0;
  let gzippedSize = 0;
  const chunks = [];

  files.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;

    totalSize += size;

    // Estimate gzipped size (rough approximation)
    gzippedSize += Math.round(size * 0.3);

    chunks.push({
      name: file,
      size: size,
      gzippedSize: Math.round(size * 0.3),
    });
  });

  return {
    totalSize,
    gzippedSize,
    chunks,
  };
}

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================

function testBundleSize(analysis) {
  logHeader('Bundle Size Analysis');

  const { totalSize, gzippedSize, chunks } = analysis;

  // Test total bundle size
  if (totalSize <= PERFORMANCE_THRESHOLDS.bundleSize) {
    logSuccess(`Total bundle size: ${formatBytes(totalSize)} (within limit)`);
  } else {
    logError(
      `Total bundle size: ${formatBytes(totalSize)} (exceeds ${formatBytes(PERFORMANCE_THRESHOLDS.bundleSize)})`
    );
  }

  // Test gzipped size
  if (gzippedSize <= PERFORMANCE_THRESHOLDS.gzippedSize) {
    logSuccess(`Gzipped size: ${formatBytes(gzippedSize)} (within limit)`);
  } else {
    logError(
      `Gzipped size: ${formatBytes(gzippedSize)} (exceeds ${formatBytes(PERFORMANCE_THRESHOLDS.gzippedSize)})`
    );
  }

  // Test individual chunks
  log('\nChunk Analysis:');
  chunks.forEach(chunk => {
    if (chunk.size <= PERFORMANCE_THRESHOLDS.maxChunkSize) {
      logSuccess(
        `${chunk.name}: ${formatBytes(chunk.size)} (${formatBytes(chunk.gzippedSize)} gzipped)`
      );
    } else {
      logWarning(
        `${chunk.name}: ${formatBytes(chunk.size)} (${formatBytes(chunk.gzippedSize)} gzipped) - Large chunk`
      );
    }
  });

  return {
    totalSizePass: totalSize <= PERFORMANCE_THRESHOLDS.bundleSize,
    gzippedSizePass: gzippedSize <= PERFORMANCE_THRESHOLDS.gzippedSize,
    chunksPass: chunks.every(
      chunk => chunk.size <= PERFORMANCE_THRESHOLDS.maxChunkSize
    ),
  };
}

function testLazyLoading() {
  logHeader('Lazy Loading Analysis');

  // Check if lazy components are properly implemented
  const srcPath = path.join(process.cwd(), 'src');
  const lazyComponentsPath = path.join(
    srcPath,
    'components',
    'LazyComponents.tsx'
  );

  if (fs.existsSync(lazyComponentsPath)) {
    const content = fs.readFileSync(lazyComponentsPath, 'utf8');

    if (content.includes('React.lazy')) {
      logSuccess('Lazy loading is implemented');
    } else {
      logError('Lazy loading is not properly implemented');
    }

    if (content.includes('Suspense')) {
      logSuccess('Suspense boundaries are implemented');
    } else {
      logError('Suspense boundaries are missing');
    }
  } else {
    logError('LazyComponents.tsx not found');
  }
}

function testPerformanceOptimizations() {
  logHeader('Performance Optimizations Analysis');

  const srcPath = path.join(process.cwd(), 'src');

  // Check for React.memo usage
  const componentsPath = path.join(srcPath, 'components');
  const components = fs.readdirSync(componentsPath);

  let memoCount = 0;
  let useMemoCount = 0;
  let useCallbackCount = 0;

  components.forEach(component => {
    if (component.endsWith('.tsx') || component.endsWith('.ts')) {
      const filePath = path.join(componentsPath, component);
      const content = fs.readFileSync(filePath, 'utf8');

      if (content.includes('React.memo')) memoCount++;
      if (content.includes('useMemo')) useMemoCount++;
      if (content.includes('useCallback')) useCallbackCount++;
    }
  });

  log(`React.memo usage: ${memoCount} components`);
  log(`useMemo usage: ${useMemoCount} components`);
  log(`useCallback usage: ${useCallbackCount} components`);

  if (memoCount > 0) {
    logSuccess('React.memo is being used for component optimization');
  } else {
    logWarning('Consider using React.memo for expensive components');
  }

  if (useMemoCount > 0) {
    logSuccess('useMemo is being used for expensive calculations');
  } else {
    logWarning('Consider using useMemo for expensive calculations');
  }

  if (useCallbackCount > 0) {
    logSuccess('useCallback is being used for event handlers');
  } else {
    logWarning('Consider using useCallback for event handlers');
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  logHeader('Performance Testing Suite');

  try {
    // Analyze bundle
    const analysis = analyzeBundle();

    // Run tests
    const bundleResults = testBundleSize(analysis);
    testLazyLoading();
    testPerformanceOptimizations();

    // Summary
    logHeader('Test Results Summary');

    const allTestsPass =
      bundleResults.totalSizePass &&
      bundleResults.gzippedSizePass &&
      bundleResults.chunksPass;

    if (allTestsPass) {
      logSuccess('All performance tests passed! 🎉');
      process.exit(0);
    } else {
      logError(
        'Some performance tests failed. Please review the results above.'
      );
      process.exit(1);
    }
  } catch (error) {
    logError(`Performance testing failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the tests
main();
