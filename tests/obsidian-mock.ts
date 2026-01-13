import { vi } from 'vitest';

export class TFile {
  path: string = '';
}

export class Plugin {
  app: any;
  manifest: any;
  constructor(app: any, manifest: any) {
    this.app = app;
    this.manifest = manifest;
  }
  registerEvent = vi.fn();
}

export class WorkspaceLeaf {}
