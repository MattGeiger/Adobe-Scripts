# Adobe Automation Scripts

This repository contains ExtendScript-based automation scripts designed to streamline workflows in various Adobe programs, starting with Adobe Premiere Pro.

## Folder Structure
- **Premiere-Pro/**: Scripts designed for Adobe Premiere Pro.
- **After-Effects/** (Coming Soon): Scripts for automating workflows in Adobe After Effects.
- **Photoshop/** (Coming Soon): Scripts for Adobe Photoshop automation.

## Current Scripts

### Premiere-Pro
#### **Batch Video Import Script v2.3**

This script automates the process of importing multiple MP4 files into Adobe Premiere Pro and placing them sequentially in the timeline.

- **Location**: `Premiere-Pro/BatchVideoImportScript_v2.3.jsx`
- **Features**:
  - Prompts the user to select a folder containing MP4 video files.
  - Filters and imports the files into the project.
  - Checks for an active sequence and inserts the clips sequentially.

### Usage Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MattGeiger/Adobe-Scripts.git
2.	Open Adobe Premiere Pro and load your project.

3.	Run the Script:
- Use the ExtendScript Toolkit with Visual Studio Code.
- [Video Tutorial fo using ExtendScript and VS Code](https://youtu.be/CnYDiWxShR4)
- Navigate to the script in the Premiere-Pro/ folder.
- Follow the prompts in the script to select your MP4 files and automate the import process.

License

This project is licensed under the [MIT License](https://opensource.org/license/mit).

