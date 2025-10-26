#!/usr/bin/env node

/**
 * PageHeader Migration Script
 *
 * This script helps migrate from the old monolithic PageHeader component
 * to the new modular PageHeader system. It updates imports and usage patterns
 * throughout the codebase.
 *
 * Usage:
 *   node scripts/migrate-pageheader.js [options]
 *
 * Options:
 *   --dry-run    Show what would be changed without making changes
 *   --verbose    Show detailed output
 *   --path       Specific path to migrate (default: src/)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  srcPath: 'src/',
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  dryRun: false,
  verbose: false,
  backup: true,
};

// Migration patterns
const MIGRATION_PATTERNS = [
  // Pattern 1: Full import with sub-components
  {
    name: 'Full PageHeader import',
    pattern:
      /import\s+PageHeader\s+from\s+['"]\.\.\/components\/PageHeader['"];?/g,
    replacement: `import { PageHeader, TitleArea, Title, Description, Actions, Navigation, Breadcrumbs, ContextArea, ParentLink } from '../components/PageHeader';`,
    description: 'Replace full PageHeader import with destructured imports',
  },

  // Pattern 2: Destructured import
  {
    name: 'Destructured PageHeader import',
    pattern:
      /import\s*{\s*PageHeader\s*}\s*from\s+['"]\.\.\/components\/PageHeader['"];?/g,
    replacement: `import { PageHeader, TitleArea, Title, Description, Actions, Navigation, Breadcrumbs, ContextArea, ParentLink } from '../components/PageHeader';`,
    description:
      'Update destructured PageHeader import to include sub-components',
  },

  // Pattern 3: Relative import
  {
    name: 'Relative PageHeader import',
    pattern: /import\s+PageHeader\s+from\s+['"]\.\/PageHeader['"];?/g,
    replacement: `import { PageHeader, TitleArea, Title, Description, Actions, Navigation, Breadcrumbs, ContextArea, ParentLink } from './PageHeader';`,
    description: 'Update relative PageHeader import',
  },

  // Pattern 4: Absolute import
  {
    name: 'Absolute PageHeader import',
    pattern:
      /import\s+PageHeader\s+from\s+['"]@\/components\/PageHeader['"];?/g,
    replacement: `import { PageHeader, TitleArea, Title, Description, Actions, Navigation, Breadcrumbs, ContextArea, ParentLink } from '@/components/PageHeader';`,
    description: 'Update absolute PageHeader import',
  },
];

// Usage patterns to update
const USAGE_PATTERNS = [
  // Pattern 1: PageHeader.TitleArea
  {
    name: 'PageHeader.TitleArea usage',
    pattern: /PageHeader\.TitleArea/g,
    replacement: 'TitleArea',
    description: 'Replace PageHeader.TitleArea with TitleArea',
  },

  // Pattern 2: PageHeader.Title
  {
    name: 'PageHeader.Title usage',
    pattern: /PageHeader\.Title/g,
    replacement: 'Title',
    description: 'Replace PageHeader.Title with Title',
  },

  // Pattern 3: PageHeader.Description
  {
    name: 'PageHeader.Description usage',
    pattern: /PageHeader\.Description/g,
    replacement: 'Description',
    description: 'Replace PageHeader.Description with Description',
  },

  // Pattern 4: PageHeader.Actions
  {
    name: 'PageHeader.Actions usage',
    pattern: /PageHeader\.Actions/g,
    replacement: 'Actions',
    description: 'Replace PageHeader.Actions with Actions',
  },

  // Pattern 5: PageHeader.Navigation
  {
    name: 'PageHeader.Navigation usage',
    pattern: /PageHeader\.Navigation/g,
    replacement: 'Navigation',
    description: 'Replace PageHeader.Navigation with Navigation',
  },

  // Pattern 6: PageHeader.Breadcrumbs
  {
    name: 'PageHeader.Breadcrumbs usage',
    pattern: /PageHeader\.Breadcrumbs/g,
    replacement: 'Breadcrumbs',
    description: 'Replace PageHeader.Breadcrumbs with Breadcrumbs',
  },

  // Pattern 7: PageHeader.ContextArea
  {
    name: 'PageHeader.ContextArea usage',
    pattern: /PageHeader\.ContextArea/g,
    replacement: 'ContextArea',
    description: 'Replace PageHeader.ContextArea with ContextArea',
  },

  // Pattern 8: PageHeader.ParentLink
  {
    name: 'PageHeader.ParentLink usage',
    pattern: /PageHeader\.ParentLink/g,
    replacement: 'ParentLink',
    description: 'Replace PageHeader.ParentLink with ParentLink',
  },
];

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);

  args.forEach(arg => {
    switch (arg) {
      case '--dry-run':
        CONFIG.dryRun = true;
        break;
      case '--verbose':
        CONFIG.verbose = true;
        break;
      case '--no-backup':
        CONFIG.backup = false;
        break;
      default:
        if (arg.startsWith('--path=')) {
          CONFIG.srcPath = arg.split('=')[1];
        }
        break;
    }
  });
}

/**
 * Get all files to process
 */
function getFilesToProcess(dir) {
  const files = [];

  function walkDir(currentPath) {
    const items = fs.readdirSync(currentPath);

    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules and other common directories
        if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
          walkDir(fullPath);
        }
      } else if (CONFIG.extensions.includes(path.extname(item))) {
        files.push(fullPath);
      }
    });
  }

  walkDir(dir);
  return files;
}

/**
 * Create backup of file
 */
function createBackup(filePath) {
  if (!CONFIG.backup) return;

  const backupPath = `${filePath}.backup.${Date.now()}`;
  fs.copyFileSync(filePath, backupPath);

  if (CONFIG.verbose) {
    console.log(`📁 Created backup: ${backupPath}`);
  }
}

/**
 * Process a single file
 */
function processFile(filePath) {
  if (CONFIG.verbose) {
    console.log(`\n🔍 Processing: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let updatedContent = content;
  let hasChanges = false;

  // Apply import patterns
  MIGRATION_PATTERNS.forEach(pattern => {
    if (pattern.pattern.test(updatedContent)) {
      updatedContent = updatedContent.replace(
        pattern.pattern,
        pattern.replacement
      );
      hasChanges = true;

      if (CONFIG.verbose) {
        console.log(`  ✅ Applied: ${pattern.name}`);
      }
    }
  });

  // Apply usage patterns
  USAGE_PATTERNS.forEach(pattern => {
    if (pattern.pattern.test(updatedContent)) {
      updatedContent = updatedContent.replace(
        pattern.pattern,
        pattern.replacement
      );
      hasChanges = true;

      if (CONFIG.verbose) {
        console.log(`  ✅ Applied: ${pattern.name}`);
      }
    }
  });

  if (hasChanges) {
    if (CONFIG.dryRun) {
      console.log(`📝 Would update: ${filePath}`);
      if (CONFIG.verbose) {
        console.log('--- DIFF ---');
        console.log(updatedContent);
        console.log('--- END DIFF ---');
      }
    } else {
      createBackup(filePath);
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Updated: ${filePath}`);
    }
    return true;
  }

  return false;
}

/**
 * Main migration function
 */
function migrate() {
  console.log('🚀 Starting PageHeader migration...\n');

  if (CONFIG.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  const files = getFilesToProcess(CONFIG.srcPath);
  console.log(`📁 Found ${files.length} files to process\n`);

  let processedFiles = 0;
  let updatedFiles = 0;

  files.forEach(file => {
    processedFiles++;
    if (processFile(file)) {
      updatedFiles++;
    }
  });

  console.log(`\n📊 Migration Summary:`);
  console.log(`  Files processed: ${processedFiles}`);
  console.log(`  Files updated: ${updatedFiles}`);

  if (CONFIG.dryRun) {
    console.log(`\n💡 Run without --dry-run to apply changes`);
  } else {
    console.log(`\n✅ Migration completed successfully!`);

    if (CONFIG.backup) {
      console.log(`\n💾 Backup files created with .backup.timestamp extension`);
    }
  }
}

/**
 * Validate migration
 */
function validateMigration() {
  console.log('\n🔍 Validating migration...\n');

  const files = getFilesToProcess(CONFIG.srcPath);
  let issues = 0;

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // Check for remaining PageHeader. patterns
    const remainingPatterns = content.match(/PageHeader\.\w+/g);
    if (remainingPatterns) {
      console.log(
        `⚠️  ${file}: Found remaining PageHeader patterns: ${remainingPatterns.join(', ')}`
      );
      issues++;
    }

    // Check for missing imports
    const usesTitleArea =
      content.includes('TitleArea') &&
      !content.includes('import') &&
      !content.includes('from');
    if (usesTitleArea) {
      console.log(`⚠️  ${file}: Uses TitleArea but may be missing import`);
      issues++;
    }
  });

  if (issues === 0) {
    console.log('✅ Migration validation passed!');
  } else {
    console.log(`❌ Found ${issues} potential issues`);
  }
}

/**
 * Generate migration report
 */
function generateReport() {
  const reportPath = 'migration-report.md';
  const report = `# PageHeader Migration Report

## Migration Summary
- Date: ${new Date().toISOString()}
- Files processed: ${getFilesToProcess(CONFIG.srcPath).length}
- Migration patterns applied: ${MIGRATION_PATTERNS.length}
- Usage patterns updated: ${USAGE_PATTERNS.length}

## Changes Made

### Import Updates
${MIGRATION_PATTERNS.map(p => `- ${p.description}`).join('\n')}

### Usage Updates
${USAGE_PATTERNS.map(p => `- ${p.description}`).join('\n')}

## Next Steps
1. Review the changes made
2. Test the application thoroughly
3. Remove backup files if everything works correctly
4. Update any remaining manual references

## Rollback
If you need to rollback the changes:
1. Restore files from backup (files with .backup.timestamp extension)
2. Or run: \`git checkout HEAD -- src/\`
`;

  fs.writeFileSync(reportPath, report);
  console.log(`📄 Migration report generated: ${reportPath}`);
}

// Main execution
if (require.main === module) {
  parseArgs();

  if (process.argv.includes('--validate')) {
    validateMigration();
  } else if (process.argv.includes('--report')) {
    generateReport();
  } else {
    migrate();
  }
}

module.exports = {
  migrate,
  validateMigration,
  generateReport,
  CONFIG,
  MIGRATION_PATTERNS,
  USAGE_PATTERNS,
};
