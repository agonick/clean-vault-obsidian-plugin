# Clean Vault - Obsidian Plugin

Automatically deletes files that are left empty (0 characters or whitespace only) when you switch away from them or close the page without making changes.


## Why did I create this plugin?
It's for my own use, because I always forget about deleting empty files. I know that there are a lot of plugins for this, but I wanted to try my hand at Obsidian plugins, and I also wanted to learn more about Obsidian's API.

I also wanted to test antigravity, to see how it works, and I think that it was a good experience.

If you want, please do a code review of this plugin. 

I'm planning to make more plugins in the future.

## Installation

To install this plugin manually in your Obsidian Vault:

1.  **Locate your Vault's plugin folder**:
    *   Open your vault in a file explorer.
    *   Enable "Show Hidden Files" if necessary.
    *   Navigate to `.obsidian/plugins/`.

2.  **Create the plugin folder**:
    *   Create a new folder named `clean-vault` inside `.obsidian/plugins/`.

3.  **Copy files**:
    *   Copy `main.js` and `manifest.json` from this project into the new `clean-vault` folder.

4.  **Enable the plugin**:
    *   Open Obsidian.
    *   Go to **Settings** -> **Community Plugins**.
    *   Click the "Reload plugins" button (refresh icon).
    *   Find "Clean Vault" in the list and toggle it **ON**.

## Usage
*   Create a new file, leave it empty, and click away. It should be deleted.
*   Clear an existing file (remove all text) and click away. It should be deleted.

## Development
1.  `npm install`
2.  `npm run build`

## Testing
1.  `npm run test`


## AI Disclaimer
This project was kickstarted and developed with the help of Antigravity, demonstrating how it is possible to achieve great things with human creativity and machine interaction.

