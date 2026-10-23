import { buildContent } from '../src/content/build';

buildContent().catch(error => {
  console.error(
    error instanceof Error ? error.message : 'Content generation failed'
  );
  process.exitCode = 1;
});
