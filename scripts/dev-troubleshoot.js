#!/usr/bin/env node

/**
 * Development Server Troubleshooting Script
 * Run this if you encounter WebSocket/HMR issues
 */

const { exec } = require('child_process');
const fs = require('fs');

console.log('🔧 Amazon Clone - Dev Server Troubleshooter\n');

function runCommand(command, description) {
  return new Promise((resolve) => {
    console.log(`📋 ${description}...`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ ${description} failed: ${error.message}`);
      } else {
        console.log(`✅ ${description} completed`);
        if (stdout) console.log(`   Output: ${stdout.trim()}`);
      }
      resolve();
    });
  });
}

async function troubleshoot() {
  console.log('🚀 Starting troubleshooting process...\n');
  
  // Step 1: Kill existing processes
  await runCommand('pkill -f "vite" || true', 'Killing existing Vite processes');
  
  // Step 2: Clear caches
  await runCommand('rm -rf node_modules/.vite', 'Clearing Vite cache');
  
  // Step 3: Check port availability
  await runCommand('lsof -ti:5173 || echo "Port 5173 is available"', 'Checking port 5173 availability');
  
  // Step 4: Verify Vite config
  if (fs.existsSync('vite.config.js')) {
    console.log('✅ Vite config file exists');
  } else {
    console.log('❌ Vite config file missing');
  }
  
  console.log('\n🎯 Troubleshooting complete!');
  console.log('\n💡 To start the dev server:');
  console.log('   npm run dev');
  console.log('\n🌐 If WebSocket issues persist, try:');
  console.log('   1. Restart your browser');
  console.log('   2. Clear browser cache');
  console.log('   3. Disable browser extensions');
  console.log('   4. Check firewall/antivirus settings');
}

troubleshoot().catch(console.error);