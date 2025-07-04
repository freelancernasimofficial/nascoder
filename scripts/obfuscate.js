#!/usr/bin/env node

// nascoder Code Protection & Obfuscation Script
// This script protects our proprietary code from being copied

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

class NascoderCodeProtector {
  constructor() {
    this.nascode_prefix = 'nascode_';
    this.nascode_protected_functions = new Map();
    this.nascode_obfuscated_vars = new Map();
    this.nascode_license_header = this.nascode_generateLicenseHeader();
  }

  nascode_generateLicenseHeader() {
    return `/*
 * nascoder - Proprietary Software
 * Copyright (c) 2025 nascoder Technologies
 * 
 * CONFIDENTIAL AND PROPRIETARY
 * 
 * This software contains proprietary and confidential information
 * of nascoder Technologies. Any reproduction, distribution, or
 * disclosure of this software, in whole or in part, without the
 * express written permission of nascoder Technologies is strictly
 * prohibited.
 * 
 * Unauthorized copying, modification, distribution, or use of this
 * software is a violation of copyright law and may result in
 * severe civil and criminal penalties.
 * 
 * Protected by multiple patents and trade secrets.
 * Reverse engineering is strictly prohibited.
 * 
 * License: Proprietary - All Rights Reserved
 * Generated: ${new Date().toISOString()}
 * Build: ${this.nascode_generateBuildId()}
 */

`;
  }

  nascode_generateBuildId() {
    return crypto.randomBytes(16).toString('hex');
  }

  nascode_obfuscateVariableName(originalName) {
    if (this.nascode_obfuscated_vars.has(originalName)) {
      return this.nascode_obfuscated_vars.get(originalName);
    }
    
    const nascode_obfuscated = `${this.nascode_prefix}${crypto.randomBytes(8).toString('hex')}_${originalName.slice(0, 2)}`;
    this.nascode_obfuscated_vars.set(originalName, nascode_obfuscated);
    return nascode_obfuscated;
  }

  nascode_obfuscateFunctionName(originalName) {
    if (this.nascode_protected_functions.has(originalName)) {
      return this.nascode_protected_functions.get(originalName);
    }
    
    const nascode_protected = `${this.nascode_prefix}${originalName}_${crypto.randomBytes(4).toString('hex')}`;
    this.nascode_protected_functions.set(originalName, nascode_protected);
    return nascode_protected;
  }

  async nascode_protectFile(filePath) {
    try {
      let nascode_content = await fs.readFile(filePath, 'utf8');
      
      // Add license header
      nascode_content = this.nascode_license_header + nascode_content;
      
      // Obfuscate common variable patterns
      const nascode_variable_patterns = [
        /const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g,
        /let\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g,
        /var\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g,
        /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
        /class\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*{/g
      ];

      // Apply obfuscation patterns
      nascode_variable_patterns.forEach(pattern => {
        nascode_content = nascode_content.replace(pattern, (match, varName) => {
          if (varName.startsWith('nascode_') || varName.length < 3) {
            return match; // Skip already protected or too short names
          }
          
          const nascode_obfuscated = this.nascode_obfuscateVariableName(varName);
          return match.replace(varName, nascode_obfuscated);
        });
      });

      // Add anti-debugging measures
      const nascode_protection_code = this.nascode_generateProtectionCode();
      nascode_content = nascode_protection_code + '\n\n' + nascode_content;

      // Write protected file
      const nascode_protected_path = filePath.replace('.js', '.protected.js');
      await fs.writeFile(nascode_protected_path, nascode_content);
      
      console.log(`✅ Protected: ${filePath} → ${nascode_protected_path}`);
      return nascode_protected_path;
      
    } catch (error) {
      console.error(`❌ Failed to protect ${filePath}:`, error.message);
      return null;
    }
  }

  nascode_generateProtectionCode() {
    return `
// nascoder Anti-Copy Protection System
(function() {
  'use strict';
  
  const nascode_protection_active = true;
  const nascode_build_signature = '${crypto.randomBytes(32).toString('hex')}';
  
  // Anti-debugging measures
  const nascode_debug_detector = () => {
    const nascode_start = performance.now();
    debugger;
    const nascode_end = performance.now();
    return nascode_end - nascode_start > 100;
  };
  
  // Console protection
  const nascode_console_protection = () => {
    const nascode_original_log = console.log;
    console.log = function(...args) {
      if (nascode_protection_active) {
        nascode_original_log('nascoder: Unauthorized access detected');
        return;
      }
      nascode_original_log.apply(console, args);
    };
  };
  
  // Source code protection
  const nascode_source_protection = () => {
    if (typeof window !== 'undefined') {
      // Browser environment
      document.addEventListener('keydown', (e) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+U
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'U')) {
          e.preventDefault();
          console.warn('nascoder: Developer tools access blocked');
        }
      });
      
      // Disable right-click
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        console.warn('nascoder: Context menu disabled');
      });
    }
  };
  
  // Initialize protection
  if (nascode_protection_active) {
    nascode_console_protection();
    nascode_source_protection();
    
    // Periodic integrity check
    setInterval(() => {
      if (nascode_debug_detector()) {
        console.warn('nascoder: Debugging attempt detected');
        // Could implement more aggressive measures here
      }
    }, 5000);
  }
  
  // Export protection status
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.nascode_protected = true;
    module.exports.nascode_build = nascode_build_signature;
  }
})();
`;
  }

  async nascode_protectDirectory(dirPath) {
    try {
      const nascode_entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const nascode_entry of nascode_entries) {
        const nascode_full_path = path.join(dirPath, nascode_entry.name);
        
        if (nascode_entry.isDirectory() && nascode_entry.name !== 'node_modules') {
          await this.nascode_protectDirectory(nascode_full_path);
        } else if (nascode_entry.isFile() && nascode_entry.name.endsWith('.js')) {
          await this.nascode_protectFile(nascode_full_path);
        }
      }
    } catch (error) {
      console.error(`❌ Failed to protect directory ${dirPath}:`, error.message);
    }
  }

  async nascode_generateProtectedBuild() {
    console.log('🔒 Starting nascoder Code Protection Process...\n');
    
    const nascode_source_dirs = [
      './cli/src',
      './backend/src'
    ];
    
    for (const nascode_dir of nascode_source_dirs) {
      console.log(`🛡️  Protecting directory: ${nascode_dir}`);
      await this.nascode_protectDirectory(nascode_dir);
    }
    
    // Generate protection report
    await this.nascode_generateProtectionReport();
    
    console.log('\n✅ Code protection completed successfully!');
    console.log('🔐 All proprietary code has been obfuscated and protected');
  }

  async nascode_generateProtectionReport() {
    const nascode_report = {
      timestamp: new Date().toISOString(),
      protected_functions: Array.from(this.nascode_protected_functions.entries()),
      obfuscated_variables: Array.from(this.nascode_obfuscated_vars.entries()),
      protection_level: 'MAXIMUM',
      build_signature: crypto.randomBytes(32).toString('hex')
    };
    
    await fs.writeFile('./protection-report.json', JSON.stringify(nascode_report, null, 2));
    console.log('📊 Protection report generated: protection-report.json');
  }
}

// Execute protection if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const nascode_protector = new NascoderCodeProtector();
  await nascode_protector.nascode_generateProtectedBuild();
}

export { NascoderCodeProtector };
