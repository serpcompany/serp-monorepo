#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASELINE_FILE = path.join(__dirname, '..', 'reports', 'ts-error-baseline.json');
const TYPECHECK_OUTPUT_FILE = path.join(__dirname, '..', 'reports', 'typecheck-errors.txt');

function countTypeScriptErrors(content) {
  const errorPattern = /error (TS\d+)/g;
  const errorCounts = {};
  let match;
  
  while ((match = errorPattern.exec(content)) !== null) {
    const errorCode = match[1];
    errorCounts[errorCode] = (errorCounts[errorCode] || 0) + 1;
  }
  
  return errorCounts;
}

function generateBaseline(specificErrorCodes = null) {
  // Read the existing typecheck output
  if (!fs.existsSync(TYPECHECK_OUTPUT_FILE)) {
    console.error('Typecheck output file not found at:', TYPECHECK_OUTPUT_FILE);
    console.error('Please run "pnpm run typecheck" first.');
    process.exit(1);
  }
  
  const content = fs.readFileSync(TYPECHECK_OUTPUT_FILE, 'utf8');
  const errorCounts = countTypeScriptErrors(content);
  
  let baseline;
  
  if (specificErrorCodes && specificErrorCodes.length > 0) {
    // Update only specific error codes
    if (!fs.existsSync(BASELINE_FILE)) {
      console.error('No baseline file found. Run with --generate first to create a full baseline.');
      process.exit(1);
    }
    
    baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
    
    // Update only the specified error codes
    specificErrorCodes.forEach(code => {
      if (errorCounts[code] !== undefined) {
        baseline.errorCounts[code] = errorCounts[code];
        console.log(`Updated ${code}: ${errorCounts[code]}`);
      } else {
        // Remove from baseline if no longer present
        delete baseline.errorCounts[code];
        console.log(`Removed ${code} (no longer present)`);
      }
    });
    
    // Recalculate total and error types
    baseline.totalErrors = Object.values(baseline.errorCounts).reduce((sum, count) => sum + count, 0);
    baseline.errorTypes = Object.keys(baseline.errorCounts).sort();
    baseline.generated = new Date().toISOString();
    
    console.log(`\nBaseline updated for specific error codes: ${specificErrorCodes.join(', ')}`);
  } else {
    // Generate full baseline
    const totalErrors = Object.values(errorCounts).reduce((sum, count) => sum + count, 0);
    
    baseline = {
      generated: new Date().toISOString(),
      totalErrors,
      errorCounts,
      errorTypes: Object.keys(errorCounts).sort()
    };
    
    console.log('\nBaseline generated successfully!');
  }
  
  // Write baseline file
  fs.writeFileSync(BASELINE_FILE, JSON.stringify(baseline, null, 2));
  
  console.log(`Total errors: ${baseline.totalErrors}`);
  console.log('Error breakdown:');
  Object.entries(baseline.errorCounts)
    .sort(([, a], [, b]) => b - a)
    .forEach(([code, count]) => {
      console.log(`  ${code}: ${count}`);
    });
  
  return baseline;
}

function validateAgainstBaseline() {
  if (!fs.existsSync(BASELINE_FILE)) {
    console.error('No baseline file found. Run with --generate first.');
    process.exit(1);
  }
  
  if (!fs.existsSync(TYPECHECK_OUTPUT_FILE)) {
    console.error('Typecheck output file not found. Run typecheck first.');
    process.exit(1);
  }
  
  const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
  const content = fs.readFileSync(TYPECHECK_OUTPUT_FILE, 'utf8');
  const currentErrors = countTypeScriptErrors(content);
  
  const currentTotal = Object.values(currentErrors).reduce((sum, count) => sum + count, 0);
  
  console.log('Comparing current errors against baseline...');
  console.log(`Baseline total: ${baseline.totalErrors}`);
  console.log(`Current total: ${currentTotal}`);
  
  let hasNewErrors = false;
  const report = [];
  
  // Check for increased error counts
  Object.entries(currentErrors).forEach(([code, count]) => {
    const baselineCount = baseline.errorCounts[code] || 0;
    if (count > baselineCount) {
      hasNewErrors = true;
      report.push(`❌ ${code}: ${count} (baseline: ${baselineCount}, +${count - baselineCount})`);
    } else if (count < baselineCount) {
      report.push(`✅ ${code}: ${count} (baseline: ${baselineCount}, -${baselineCount - count})`);
    }
  });
  
  // Check for new error types
  Object.keys(currentErrors).forEach(code => {
    if (!baseline.errorCounts[code]) {
      hasNewErrors = true;
      report.push(`❌ ${code}: NEW ERROR TYPE (count: ${currentErrors[code]})`);
    }
  });
  
  if (report.length > 0) {
    console.log('\nError count changes:');
    report.forEach(line => console.log(`  ${line}`));
  }
  
  if (hasNewErrors) {
    console.error('\n❌ New TypeScript errors detected! Please fix them before committing.');
    process.exit(1);
  } else if (currentTotal < baseline.totalErrors) {
    console.log('\n✅ Great job! You\'ve reduced the number of TypeScript errors.');
    console.log('Auto-updating baseline to lock in improvements...');
    
    // Auto-update baseline when errors decrease
    const newBaseline = {
      generated: new Date().toISOString(),
      totalErrors: currentTotal,
      errorCounts: currentErrors,
      errorTypes: Object.keys(currentErrors).sort()
    };
    
    fs.writeFileSync(BASELINE_FILE, JSON.stringify(newBaseline, null, 2));
    console.log(`Baseline updated: ${baseline.totalErrors} → ${currentTotal} errors`);
    
    // Show which error types were reduced
    Object.entries(baseline.errorCounts).forEach(([code, baselineCount]) => {
      const currentCount = currentErrors[code] || 0;
      if (currentCount < baselineCount) {
        console.log(`  ${code}: ${baselineCount} → ${currentCount} (-${baselineCount - currentCount})`);
      }
    });
  } else {
    console.log('\n✅ No new TypeScript errors introduced.');
  }
  
  return !hasNewErrors;
}

// Main execution
const command = process.argv[2];
const additionalArgs = process.argv.slice(3);

if (command === '--generate') {
  // Check if specific error codes were provided
  const errorCodeIndex = additionalArgs.indexOf('--error-codes');
  if (errorCodeIndex !== -1 && additionalArgs[errorCodeIndex + 1]) {
    const errorCodes = additionalArgs[errorCodeIndex + 1].split(',').map(code => code.trim());
    generateBaseline(errorCodes);
  } else {
    generateBaseline();
  }
} else if (command === '--validate') {
  validateAgainstBaseline();
} else {
  console.log('Usage:');
  console.log('  node scripts/ts-error-baseline.mjs --generate                          Generate a new baseline');
  console.log('  node scripts/ts-error-baseline.mjs --generate --error-codes TS2339,TS2345  Update baseline for specific error codes');
  console.log('  node scripts/ts-error-baseline.mjs --validate                          Validate current errors against baseline');
  process.exit(1);
}