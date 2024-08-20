/**
 * Adobe Premiere Pro 2024 Batch Video Import and Sequence Creation Script (Part 1 of 2) V1.0
 * 
 * This script imports multiple video files into Adobe Premiere Pro and creates a unique sequence 
 * for each file using createNewSequenceFromClips().
 * 
 * Usage:
 * - Ensure Adobe Premiere Pro is open with a project loaded.
 * - Run the script from the ExtendScript Toolkit or Adobe's Scripting environment.
 * - Follow the on-screen prompts to select a folder containing your video files.
 * 
 * Author: Matt Geiger (https://github.com/MattGeiger/)
 * Date: 2024-August-19
 * MIT License (https://opensource.org/licenses/MIT)
 */

function logMessage(message) {
    $.writeln(message);
}

function createFolder(folderPath) {
    var folder = new Folder(folderPath);
    if (!folder.exists) {
        folder.create();
        return true;
    }
    return false;
}

function isVideoFile(fileName) {
    var videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv', '.webm'];
    var ext = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
    for (var i = 0; i < videoExtensions.length; i++) {
        if (ext === videoExtensions[i]) {
            return true;
        }
    }
    return false;
}

function decodeFileName(fileName) {
    return decodeURIComponent(fileName.replace(/\+/g, " "));
}

try {
    var project = app.project;
    
    if (!project) {
        throw new Error("Unable to access project.");
    }

    alert("Before running this script, ensure 'Auto-transcribe all imported clips' is enabled in Premiere Pro's Preferences > Transcription Settings. Files will be processed in ascending order by filename.");

    var importFolder = Folder.selectDialog("Select the folder containing your video files");
    if (!importFolder) {
        throw new Error("No folder selected.");
    }

    var transcriptsFolder = importFolder.fsName + "/Transcripts";
    createFolder(transcriptsFolder);

    var allFiles = importFolder.getFiles();
    var videoFiles = [];
    for (var i = 0; i < allFiles.length; i++) {
        if (isVideoFile(allFiles[i].name)) {
            videoFiles.push(allFiles[i]);
        }
    }

    videoFiles.sort(function(a, b) {
        return decodeFileName(a.name).localeCompare(decodeFileName(b.name));
    });

    if (videoFiles.length === 0) {
        throw new Error("No video files found in the selected folder.");
    }

    alert("Number of video files found: " + videoFiles.length + "\n\nClick OK to start processing. This may take a while, please do not interrupt the process.");

    for (var i = 0; i < videoFiles.length; i++) {
        var videoFile = videoFiles[i];
        var decodedFileName = decodeFileName(videoFile.name);
        var fileNameWithoutExt = decodedFileName.slice(0, decodedFileName.lastIndexOf("."));
        var sequenceName = fileNameWithoutExt + "_Sequence";

        // Import the file
        project.importFiles([videoFile.fsName], false, project.getInsertionBin(), false);
        var importedItem = project.rootItem.children[project.rootItem.children.length - 1];
        
        // Create a new sequence from the imported clip
        var newSequence = project.createNewSequenceFromClips(sequenceName, [importedItem], project.rootItem);

        if (newSequence) {
            logMessage("Processed: " + decodedFileName);
        } else {
            logMessage("Failed to create sequence: " + sequenceName);
        }
    }

    alert("All files imported and sequences created. Please wait for all transcriptions to complete before running Part 2 of the script.");

} catch (error) {
    alert("Error: " + error.message);
}
