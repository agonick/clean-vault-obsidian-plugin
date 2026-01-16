import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CleanVaultPlugin } from '../main';
import { App, PluginManifest, TFile } from 'obsidian';

describe('CleanVaultPlugin', () => {
  let plugin: CleanVaultPlugin;
  let mockApp: any;
  const mockManifest = {};

  beforeEach(() => {
    vi.clearAllMocks();
    mockApp = {
      workspace: {
        getActiveFile: vi.fn(),
        on: vi.fn()
      },
      vault: {
        read: vi.fn(),
        trash: vi.fn()
      }
    };
    plugin = new CleanVaultPlugin(mockApp as App, mockManifest as PluginManifest);
  });

  it('should delete a file if it is empty', async () => {
    const mockFile = new TFile();
    mockFile.path = 'empty.md';
    
    plugin.lastActiveFile = mockFile;
    mockApp.vault.read.mockResolvedValue('');

    await plugin.checkAndDeletePreviousFile();

    expect(mockApp.vault.trash).toHaveBeenCalledWith(mockFile, false);
  });

  it('should delete a file if it contains only whitespace', async () => {
    const mockFile = new TFile();
    mockFile.path = 'whitespace.md';
    
    plugin.lastActiveFile = mockFile;
    mockApp.vault.read.mockResolvedValue('   \n  ');

    await plugin.checkAndDeletePreviousFile();

    expect(mockApp.vault.trash).toHaveBeenCalledWith(mockFile, false);
  });

  it('should NOT delete a file if it has content', async () => {
    const mockFile = new TFile();
    mockFile.path = 'content.md';
    
    plugin.lastActiveFile = mockFile;
    mockApp.vault.read.mockResolvedValue('Hello World');

    await plugin.checkAndDeletePreviousFile();

    expect(mockApp.vault.trash).not.toHaveBeenCalled();
  });

  it('should NOT delete if the file reference is null', async () => {
    plugin.lastActiveFile = null;

    await plugin.checkAndDeletePreviousFile();

    expect(mockApp.vault.trash).not.toHaveBeenCalled();
  });

  it('should handle file read errors gracefully', async () => {
    const mockFile = new TFile();
    mockFile.path = 'deleted.md';
    
    plugin.lastActiveFile = mockFile;
    mockApp.vault.read.mockRejectedValue(new Error('File not found'));

    await plugin.checkAndDeletePreviousFile();

    expect(mockApp.vault.trash).not.toHaveBeenCalled();
  });
});
