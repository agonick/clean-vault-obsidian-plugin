import * as path from 'path';
import { defineConfig } from 'vitest/config';


export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    alias: {
      obsidian: path.resolve(__dirname, './tests/obsidian-mock.ts'),
      '../main': path.resolve(__dirname, './main.ts'),
    }
  },
});
