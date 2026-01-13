import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CleanVaultPlugin } from '../main';
import { App, PluginManifest, TFile } from 'obsidian';


describe('CleanVaultPlugin', () => {
  let plugin: any;

  beforeEach(() => {
    vi.clearAllMocks();
    const mockApp: any = {
      workspace: {
        getActiveFile: vi.fn(),
        on: vi.fn(),
      },
      vault: {
        read: vi.fn(),
        trash: vi.fn(),
        getAbstractFileByPath: vi.fn(),
      }
    };
    const mockManifest = {};
    plugin = new CleanVaultPlugin(mockApp as App, mockManifest as PluginManifest);
  });

  it('should delete a file if it is empty', async () => {
    const mockFile = new TFile();
    mockFile.path = 'empty.md';
    
    plugin.lastActiveFile = mockFile;
    plugin.app.vault.getAbstractFileByPath.mockReturnValue(mockFile);
    plugin.app.vault.read.mockResolvedValue('');

    await plugin.checkAndDeletePreviousFile();

    expect(plugin.app.vault.trash).toHaveBeenCalledWith(mockFile, false);
  });

  it('should delete a file if it contains only whitespace', async () => {
    const mockFile = new TFile();
    mockFile.path = 'whitespace.md';
    
    plugin.lastActiveFile = mockFile;
    plugin.app.vault.getAbstractFileByPath.mockReturnValue(mockFile);
    plugin.app.vault.read.mockResolvedValue('   \n  ');

    await plugin.checkAndDeletePreviousFile();

    expect(plugin.app.vault.trash).toHaveBeenCalledWith(mockFile, false);
  });

  it('should NOT delete a file if it has content', async () => {
    const mockFile = new TFile();
    mockFile.path = 'content.md';
    
    plugin.lastActiveFile = mockFile;
    plugin.app.vault.getAbstractFileByPath.mockReturnValue(mockFile);
    plugin.app.vault.read.mockResolvedValue('Hello World');

    await plugin.checkAndDeletePreviousFile();

    expect(plugin.app.vault.trash).not.toHaveBeenCalled();
  });

  it('should NOT delete if the file reference is null', async () => {
    plugin.lastActiveFile = null;

    await plugin.checkAndDeletePreviousFile();

    expect(plugin.app.vault.trash).not.toHaveBeenCalled();
  });

  it('should NOT delete if the file no longer exists in vault', async () => {
    const mockFile = new TFile();
    mockFile.path = 'deleted.md';
    
    plugin.lastActiveFile = mockFile;
    plugin.app.vault.getAbstractFileByPath.mockReturnValue(null);

    await plugin.checkAndDeletePreviousFile();

    expect(plugin.app.vault.trash).not.toHaveBeenCalled();
  });
});
