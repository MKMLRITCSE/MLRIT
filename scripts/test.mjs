import { spawnSync } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';

const outputDir = '.test-build';

function run(args) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Command failed with exit code ${result.status}`);
}

rmSync(outputDir, { recursive: true, force: true });

try {
  run([
    'node_modules/typescript/bin/tsc',
    'lib/content/validate.ts',
    'lib/content/sections.ts',
    'lib/content/validate.test.ts',
    'lib/content/circulars.test.ts',
    '--outDir',
    outputDir,
    '--module',
    'commonjs',
    '--target',
    'es2022',
    '--esModuleInterop',
    '--skipLibCheck',
  ]);

  writeFileSync(`${outputDir}/package.json`, JSON.stringify({ type: 'commonjs' }));
  run(['--test', `${outputDir}/content/validate.test.js`, `${outputDir}/content/circulars.test.js`, 'tests/font-pipeline.test.mjs']);
} finally {
  rmSync(outputDir, { recursive: true, force: true });
}
