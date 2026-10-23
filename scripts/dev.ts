import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import chokidar from 'chokidar';

const require = createRequire(import.meta.url);
let compiler: ReturnType<typeof spawn> | undefined;
let closing = false;
function buildContent(): Promise<void> {
  if (closing) return Promise.resolve();
  return new Promise((resolve, reject) => {
    compiler = spawn(
      process.execPath,
      [require.resolve('tsx/cli'), 'scripts/content.ts'],
      { stdio: 'inherit', env: process.env }
    );
    compiler.once('error', reject);
    compiler.once('exit', code => {
      compiler = undefined;
      if (code === 0 || closing) resolve();
      else reject(new Error(`Content compiler exited with code ${code}`));
    });
  });
}
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    closing = true;
    compiler?.kill(signal);
  });
}

async function main() {
  await buildContent();
  if (closing) return;
  const child = spawn(
    process.execPath,
    [
      require.resolve('next/dist/bin/next'),
      'dev',
      '--webpack',
      ...process.argv.slice(2)
    ],
    { stdio: 'inherit', env: process.env }
  );
  let timer: ReturnType<typeof setTimeout> | undefined;
  let queue = Promise.resolve();
  const watcher = chokidar.watch(
    [
      'contents',
      'src/content',
      'scripts/content.ts',
      'public',
      'src/lib/rehype',
      'src/lib/remark',
      'src/utils/image.ts'
    ],
    { ignoreInitial: true }
  );
  watcher.on('all', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      queue = queue
        .then(async () => {
          await buildContent();
        })
        .catch(error => {
          console.error(
            'Content rebuild failed:',
            error instanceof Error ? error.message : 'unknown error'
          );
        });
    }, 150);
  });
  const close = async () => {
    closing = true;
    clearTimeout(timer);
    compiler?.kill();
    await watcher.close();
  };
  child.once('error', async error => {
    console.error(error.message);
    await close();
    process.exitCode = 1;
  });
  child.once('exit', async code => {
    await close();
    process.exitCode = code ?? 0;
  });
  for (const signal of ['SIGINT', 'SIGTERM'] as const)
    process.once(signal, () => {
      void close();
      child.kill(signal);
    });
}
main().catch(error => {
  console.error(
    error instanceof Error ? error.message : 'Development startup failed'
  );
  process.exitCode = 1;
});
