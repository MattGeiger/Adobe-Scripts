# Adobe Automation Scripts

This repository contains ExtendScript-based automation scripts designed to streamline workflows in various Adobe programs, starting with Adobe Premiere Pro. These scripts automate repetitive tasks, helping editors and designers enhance their efficiency. 

## Features

- **Premiere Pro Automation**: The first script in this repository automates the import of multiple MP4 files into Adobe Premiere Pro and inserts them sequentially into the timeline. This script simplifies the process of organizing clips within a project.

- **Cross-Application Support**: While the initial focus is on Adobe Premiere Pro, this repository will expand to include scripts for other Adobe programs, such as After Effects, Photoshop, and Illustrator, in the future.

## Current Scripts

### 1. **Premiere Pro: Batch Video Import Automation Script v2.3**
This script automates the process of importing MP4 files into Adobe Premiere Pro, managing folder selection, file filtering, and sequence creation. It simplifies the workflow for editors dealing with large batches of video files.

#### Features:
- Prompts the user to select a folder containing video files.
- Automatically filters for `.mp4` files.
- Checks for an active sequence, creates one if necessary, and places the clips sequentially in the timeline.
- Error handling for common issues, such as missing project files or incorrect file formats.
- Alerts the user upon successful completion.

#### Usage:
1. Ensure Adobe Premiere Pro is open with a project loaded.
2. Run the script through the ExtendScript Toolkit or Adobe’s Scripting environment.
3. Follow the on-screen prompts to select a folder containing your MP4 files.
4. The script will filter, import, and insert the clips into the timeline sequentially.
