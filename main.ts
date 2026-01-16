import { Plugin, TFile, WorkspaceLeaf } from 'obsidian';

export class CleanVaultPlugin extends Plugin {
    lastActiveFile: TFile | null = null;

    async onload() {
        console.log('CleanVaultPlugin loaded');
        this.lastActiveFile = this.app.workspace.getActiveFile();

        this.registerEvent(
            this.app.workspace.on('active-leaf-change', async (leaf: WorkspaceLeaf | null) => {
                await this.checkAndDeletePreviousFile();
                this.lastActiveFile = this.app.workspace.getActiveFile();
            })
        );
    }

    async checkAndDeletePreviousFile() {
        const file = this.lastActiveFile;

        if (!file || !(file instanceof TFile)) {
            return;
        }

        try {
            const content = await this.app.vault.read(file);
            if (content.trim().length === 0) {
                await this.app.vault.trash(file, false);
                console.log(`[CleanVaultPlugin] Deleted empty file: ${file.path}`);
            }
        } catch (error) {
            console.error(`[CleanVaultPlugin] Error reading/deleting file ${file.path}:`, error);
        }
    }
    
}

export default CleanVaultPlugin;
