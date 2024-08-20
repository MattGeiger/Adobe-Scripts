/**
 * Adobe Premiere Pro 2024 Batch Video Import Automation Script v2.3
 * 
 * This script automates the process of importing multiple MP4 files into Adobe Premiere Pro 
 * and inserting them sequentially into the timeline of a project. The script allows you to 
 * select a folder, filters for .mp4 files, imports them into the project, creates or selects 
 * an existing sequence, and then inserts the clips one after another.
 * 
 * Features:
 * 1. Prompts the user to select a folder containing video files.
 * 2. Filters for .mp4 files and imports them into the Premiere Pro project.
 * 3. Checks if there is an active sequence; creates a new sequence if one is not found.
 * 4. Inserts each clip into the sequence, one after another, adjusting the insertion point 
 *    to place each clip immediately after the previous one.
 * 5. Includes error handling for common issues, such as no project being open or no folder 
 *    being selected.
 * 6. Alerts the user once the script has completed successfully.
 * 
 * Usage:
 * - Ensure Adobe Premiere Pro is open with a project loaded.
 * - Run the script from the ExtendScript Toolkit or Adobe's Scripting environment.
 * - Works with Microsoft Visual Studio Code.
 * - Follow the on-screen prompts to select a folder containing your MP4 files.
 * 
 * Note:
 * - This script assumes that the video files are of a consistent format (.mp4).
 * - Designed Specifically for Adobe Premiere Pro 2024 on MacOS with Universal Binaries (Intel/Apple Silicon)
 * - The sequence created is basic and may need further adjustment depending on your specific 
 *   project requirements.
 * 
 * Author: Matt Geiger (https://github.com/MattGeiger/) with debugging help from ChatGPT4o and Claude 3.5 Sonnet
 * Date: 2024-August-17
 * MIT License (https://opensource.org/licenses/MIT)
 */
try {
    var project = app.project;
    
    // Check if project is available
    if (!project) {
        throw new Error("Unable to access project.");
    }
    
    var importFolder = Folder.selectDialog("Select the folder containing your video files");
    
    // Check if a folder was selected
    if (!importFolder) {
        throw new Error("No folder selected.");
    }
    
    // Get all files in the folder
    var allFiles = importFolder.getFiles();
    
    // Filter for .mp4 files using a for loop and basic string comparison
    var videoFiles = [];
    for (var i = 0; i < allFiles.length; i++) {
        var fileName = allFiles[i].name.toLowerCase();
        if (fileName.substr(fileName.length - 4) === '.mp4') {
            videoFiles.push(allFiles[i]);
        }
    }
    
    if (videoFiles.length === 0) {
        throw new Error("No .mp4 files found in the selected folder.");
    }
    
    // Import files
    for (var i = 0; i < videoFiles.length; i++) {
        project.importFiles([videoFiles[i].fsName], false, project.getInsertionBin(), false);
    }
    
    // Get or create sequence
    var sequence = project.activeSequence;
    if (!sequence) {
        sequence = project.createNewSequence("New Sequence", "");
    }
    
    // Insert clips
    var videoItems = project.rootItem.children;
    var insertTime = 0; // Start at the beginning of the sequence
    for (var j = 0; j < videoItems.length; j++) {
        if (videoItems[j].type === ProjectItemType.CLIP) {
            var success = sequence.insertClip(videoItems[j], insertTime, 0, 0);
            if (success) {
                // Move the insert point to the end of the inserted clip
                insertTime += videoItems[j].getOutPoint().seconds - videoItems[j].getInPoint().seconds;
            }
        }
    }
    
    alert("Script completed successfully!");
} catch (error) {
    alert("Error: " + error.message);
}
