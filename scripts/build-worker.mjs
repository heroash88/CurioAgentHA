import * as esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/services/faceTracking.worker.ts'],
  bundle: true,
  outfile: 'public/faceTrackingWorker.bundle.js',
  format: 'iife',
  target: 'es2022',
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}).then(() => {
  console.log('Worker built successfully.');
}).catch(() => process.exit(1));
