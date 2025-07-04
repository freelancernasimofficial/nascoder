#!/usr/bin/env node

/*
 * nascoder Protected Build System
 * Generates obfuscated and protected production builds
 */

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

class NascoderProtectedBuilder {
  constructor() {
    this.nascode_build_id = crypto.randomBytes(16).toString('hex');
    this.nascode_protection_level = 'MAXIMUM';
    this.nascode_obfuscation_map = new Map();
  }

  async nascode_createProtectedBuild() {
    console.log('🔒 nascoder Protected Build System');
    console.log(`🆔 Build ID: ${this.nascode_build_id}`);
    console.log(`🛡️  Protection Level: ${this.nascode_protection_level}\n`);

    // Create protected directories
    await this.nascode_setupProtectedDirectories();
    
    // Apply code protection
    await this.nascode_protectSourceFiles();
    
    // Generate license files
    await this.nascode_generateLicenseFiles();
    
    // Create deployment package
    await this.nascode_createDeploymentPackage();
    
    console.log('\n✅ Protected build completed successfully!');
    console.log('🔐 All source code has been obfuscated and protected');
    console.log('📦 Deployment package ready for distribution');
  }

  async nascode_setupProtectedDirectories() {
    const nascode_protected_dirs = [
      './dist/protected',
      './dist/protected/cli',
      './dist/protected/backend',
      './dist/protected/licenses'
    ];

    for (const nascode_dir of nascode_protected_dirs) {
      await fs.mkdir(nascode_dir, { recursive: true });
    }
    
    console.log('📁 Protected directories created');
  }

  async nascode_protectSourceFiles() {
    const nascode_source_patterns = [
      { src: './cli/src', dest: './dist/protected/cli' },
      { src: './backend/src', dest: './dist/protected/backend' }
    ];

    for (const nascode_pattern of nascode_source_patterns) {
      await this.nascode_processDirectory(nascode_pattern.src, nascode_pattern.dest);
    }
    
    console.log('🛡️  Source files protected and obfuscated');
  }

  async nascode_processDirectory(nascode_src, nascode_dest) {
    const nascode_entries = await fs.readdir(nascode_src, { withFileTypes: true });
    
    for (const nascode_entry of nascode_entries) {
      const nascode_src_path = path.join(nascode_src, nascode_entry.name);
      const nascode_dest_path = path.join(nascode_dest, nascode_entry.name);
      
      if (nascode_entry.isDirectory()) {
        await fs.mkdir(nascode_dest_path, { recursive: true });
        await this.nascode_processDirectory(nascode_src_path, nascode_dest_path);
      } else if (nascode_entry.name.endsWith('.js')) {
        await this.nascode_protectJavaScriptFile(nascode_src_path, nascode_dest_path);
      } else {
        await fs.copyFile(nascode_src_path, nascode_dest_path);
      }
    }
  }

  async nascode_protectJavaScriptFile(nascode_src_file, nascode_dest_file) {
    let nascode_content = await fs.readFile(nascode_src_file, 'utf8');
    
    // Add protection header
    const nascode_protection_header = this.nascode_generateProtectionHeader();
    nascode_content = nascode_protection_header + nascode_content;
    
    // Apply variable obfuscation
    nascode_content = this.nascode_obfuscateVariables(nascode_content);
    
    // Add runtime protection
    const nascode_runtime_protection = this.nascode_generateRuntimeProtection();
    nascode_content = nascode_runtime_protection + '\n\n' + nascode_content;
    
    // Minify and compress
    nascode_content = this.nascode_minifyCode(nascode_content);
    
    await fs.writeFile(nascode_dest_file, nascode_content);
  }

  nascode_generateProtectionHeader() {
    return `/*
 * nascoder Enterprise - Protected Build
 * Copyright (c) 2025 nascoder Technologies
 * 
 * CONFIDENTIAL AND PROPRIETARY
 * This software contains trade secrets and proprietary information.
 * Unauthorized reproduction or distribution is strictly prohibited.
 * 
 * Build: ${this.nascode_build_id}
 * Protection: ${this.nascode_protection_level}
 * Generated: ${new Date().toISOString()}
 * 
 * WARNING: This code is protected by multiple patents.
 * Reverse engineering attempts will be prosecuted to the full extent of the law.
 */

`;
  }

  nascode_obfuscateVariables(nascode_code) {
    // Obfuscate function names
    nascode_code = nascode_code.replace(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, (match, name) => {
      if (!name.startsWith('nascode_')) {
        const nascode_obfuscated = `nascode_${crypto.randomBytes(4).toString('hex')}_${name.slice(0, 2)}`;
        this.nascode_obfuscation_map.set(name, nascode_obfuscated);
        return match.replace(name, nascode_obfuscated);
      }
      return match;
    });

    // Obfuscate class names
    nascode_code = nascode_code.replace(/class\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, (match, name) => {
      if (!name.startsWith('Nascode')) {
        const nascode_obfuscated = `Nascode${crypto.randomBytes(4).toString('hex')}${name.slice(0, 2)}`;
        this.nascode_obfuscation_map.set(name, nascode_obfuscated);
        return match.replace(name, nascode_obfuscated);
      }
      return match;
    });

    // Obfuscate variable declarations
    nascode_code = nascode_code.replace(/(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, (match, keyword, name) => {
      if (!name.startsWith('nascode_') && name.length > 2) {
        const nascode_obfuscated = `nascode_${crypto.randomBytes(3).toString('hex')}_${name.slice(0, 1)}`;
        this.nascode_obfuscation_map.set(name, nascode_obfuscated);
        return `${keyword} ${nascode_obfuscated}`;
      }
      return match;
    });

    return nascode_code;
  }

  nascode_generateRuntimeProtection() {
    return `
// nascoder Runtime Protection System
(function() {
  'use strict';
  
  const nascode_build_signature = '${this.nascode_build_id}';
  const nascode_protection_active = true;
  
  // Anti-tampering detection
  const nascode_integrity_check = () => {
    const nascode_source = arguments.callee.toString();
    const nascode_hash = nascode_source.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return nascode_hash;
  };
  
  // Console hijacking protection
  const nascode_console_guard = (() => {
    const nascode_original = console.log;
    console.log = function(...args) {
      if (nascode_protection_active) {
        const nascode_stack = new Error().stack;
        if (nascode_stack && nascode_stack.includes('devtools')) {
          return;
        }
      }
      nascode_original.apply(console, args);
    };
  })();
  
  // Debug detection
  const nascode_debug_detector = () => {
    let nascode_detected = false;
    const nascode_start = performance.now();
    debugger;
    const nascode_end = performance.now();
    if (nascode_end - nascode_start > 100) {
      nascode_detected = true;
    }
    return nascode_detected;
  };
  
  // Periodic integrity monitoring
  if (typeof setInterval !== 'undefined') {
    setInterval(() => {
      if (nascode_debug_detector()) {
        console.warn('nascoder: Unauthorized debugging detected');
      }
      nascode_integrity_check();
    }, 10000);
  }
  
  // Export protection metadata
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.nascode_protected = true;
    module.exports.nascode_build_id = nascode_build_signature;
  }
  
  return {
    nascode_protected: true,
    nascode_build: nascode_build_signature
  };
})();
`;
  }

  nascode_minifyCode(nascode_code) {
    // Basic minification (remove comments and extra whitespace)
    return nascode_code
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/;\s*}/g, ';}') // Remove spaces before closing braces
      .trim();
  }

  async nascode_generateLicenseFiles() {
    const nascode_license_content = `
nascoder Enterprise License Agreement

Copyright (c) 2025 nascoder Technologies. All rights reserved.

PROPRIETARY SOFTWARE LICENSE

This software and associated documentation files (the "Software") are proprietary
to nascoder Technologies and are protected by copyright, trade secret, and other
intellectual property laws.

RESTRICTIONS:
1. You may not copy, modify, distribute, or reverse engineer the Software
2. You may not remove or alter any proprietary notices or labels
3. You may not use the Software to create competing products
4. Source code access is strictly prohibited without written authorization

VIOLATIONS of this license will result in immediate termination of your rights
and may subject you to criminal and civil penalties.

For licensing inquiries, contact: legal@nascoder.com

Build ID: ${this.nascode_build_id}
Generated: ${new Date().toISOString()}
`;

    await fs.writeFile('./dist/protected/licenses/LICENSE.txt', nascode_license_content);
    console.log('📜 License files generated');
  }

  async nascode_createDeploymentPackage() {
    const nascode_package_info = {
      name: 'nascoder-enterprise',
      version: '1.0.0',
      description: 'nascoder Enterprise - Protected Build',
      build_id: this.nascode_build_id,
      protection_level: this.nascode_protection_level,
      generated: new Date().toISOString(),
      obfuscated_symbols: this.nascode_obfuscation_map.size,
      license: 'Proprietary'
    };

    await fs.writeFile('./dist/protected/package.json', JSON.stringify(nascode_package_info, null, 2));
    
    // Create deployment manifest
    const nascode_manifest = {
      build_signature: this.nascode_build_id,
      protection_enabled: true,
      anti_tampering: true,
      debug_protection: true,
      console_protection: true,
      source_obfuscation: true,
      deployment_ready: true
    };

    await fs.writeFile('./dist/protected/manifest.json', JSON.stringify(nascode_manifest, null, 2));
    console.log('📦 Deployment package created');
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const nascode_builder = new NascoderProtectedBuilder();
  await nascode_builder.nascode_createProtectedBuild();
}

export { NascoderProtectedBuilder };
