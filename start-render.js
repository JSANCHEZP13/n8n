#!/usr/bin/env node

/**
 * Startup script optimized for Render deployment
 * This script ensures proper environment setup and starts n8n
 * 
 * Note: pnpm build:deploy generates files in 'compiled/' directory
 */

const { spawn } = require('child_process');
const path = require('path');

// Set default environment variables for Render
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.N8N_PORT = process.env.PORT || process.env.N8N_PORT || '5678';

// Ensure we're using the correct host for Render
if (process.env.RENDER_EXTERNAL_HOSTNAME && !process.env.N8N_HOST) {
  process.env.N8N_HOST = process.env.RENDER_EXTERNAL_HOSTNAME;
  process.env.WEBHOOK_URL = `https://${process.env.RENDER_EXTERNAL_HOSTNAME}/`;
}

console.log('🚀 Starting n8n on Render...');
console.log(`📍 Host: ${process.env.N8N_HOST || 'localhost'}`);
console.log(`🔌 Port: ${process.env.N8N_PORT}`);
console.log(`🌐 Protocol: ${process.env.N8N_PROTOCOL || 'https'}`);

// Start n8n from the compiled directory
// pnpm build:deploy creates the production build in 'compiled/'
const n8nPath = path.join(__dirname, 'compiled', 'bin', 'n8n');
const n8nProcess = spawn('node', [n8nPath, 'start'], {
  stdio: 'inherit',
  env: process.env,
  cwd: path.join(__dirname, 'compiled')
});

n8nProcess.on('error', (error) => {
  console.error('❌ Failed to start n8n:', error);
  process.exit(1);
});

n8nProcess.on('exit', (code) => {
  console.log(`n8n process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 Received SIGTERM, shutting down gracefully...');
  n8nProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('📴 Received SIGINT, shutting down gracefully...');
  n8nProcess.kill('SIGINT');
});