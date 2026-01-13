#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Ed-Tun STEM Environment Configuration...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local not found!');
  console.log('📝 Please create .env.local file based on .env.example\n');
  
  if (fs.existsSync(envExamplePath)) {
    console.log('Example .env.local content:');
    console.log(fs.readFileSync(envExamplePath, 'utf8'));
  }
  process.exit(1);
}

// Parse .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

// Required environment variables
const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_GEMINI_API_KEY',
];

const optional = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_APP_URL',
];

console.log('📋 Required Variables:');
let hasAllRequired = true;

required.forEach(key => {
  const value = envVars[key];
  if (value && value !== 'your_' + key.toLowerCase()) {
    console.log(`  ✅ ${key}`);
  } else {
    console.log(`  ❌ ${key} - Missing or placeholder`);
    hasAllRequired = false;
  }
});

console.log('\n📋 Optional Variables:');
optional.forEach(key => {
  const value = envVars[key];
  if (value && value !== 'your_' + key.toLowerCase()) {
    console.log(`  ✅ ${key}`);
  } else {
    console.log(`  ⚠️  ${key} - Not set (optional)`);
  }
});

console.log('\n' + '='.repeat(50));

if (hasAllRequired) {
  console.log('✅ Environment configuration is complete!');
  console.log('🚀 You can run: npm run dev');
} else {
  console.log('❌ Missing required environment variables!');
  console.log('📝 Please update your .env.local file');
  process.exit(1);
}

console.log('='.repeat(50) + '\n');

// Check package.json scripts
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  console.log('📦 Available Scripts:');
  Object.keys(packageJson.scripts || {}).forEach(script => {
    console.log(`  • npm run ${script}`);
  });
  console.log('');
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('⚠️  node_modules not found. Run: npm install\n');
}

console.log('💡 Quick Start:');
console.log('  1. Make sure Supabase database is set up');
console.log('  2. Run: npm install (if not done)');
console.log('  3. Run: npm run dev');
console.log('  4. Open: http://localhost:3000\n');