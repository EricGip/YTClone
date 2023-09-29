import { Storage } from "@google-cloud/storage"
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";


// creating instance of 
const storage = new Storage();

// bucket link to download video
const rawVideoBucketName = "nc-tut-raw-videos";
const processedVideoBucketName = "nc-tut-processed-videos";

// local storage, data should be deleted after
const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

// creates local directories for videos dl'd from google cloud
export function setupDirectories() {
    ensureDirectoryExistence(localRawVideoPath);
    ensureDirectoryExistence(localProcessedVideoPath);
}


/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video has been converted.
 */
 export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
        .outputOptions("-vf", "scale=-1:360") //360p
        .on("end", () => {
            console.log("Processing finished sucessfully.");
            resolve();
        })
        .on("error", (err) => {
            console.log(`An error occured: ${err.message}`);
            reject(err);
        })
        .save(`${localProcessedVideoPath}/${processedVideoName}`);
    })
  }


/**
 *  @param fileName - The namee of the file to download from {@link rawVideoBucketName} bucket
 * into the {@link localRawVideoPath} folder.
 * @returns a promise that resolves when file has been downloaded.
 */
export async function downloadRawVideo(fileName: string) {
    await storage.bucket(rawVideoBucketName)
      .file(fileName)
      .download({ destination: `${localRawVideoPath}/${fileName}`});

    console.log(
        `gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`
    );
}

/**
 * @param fileName - name of file uploaded from 
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}
 * @returns a promise that resolves file has been uploaded
 */
export async function uploadProcesssedVideo(fileName: string) {
    const bucket = storage.bucket(processedVideoBucketName);

    await bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
        destination: fileName
    });

    console.log(
        `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}.`
    );

    // default making every video public. 
    await bucket.file(fileName).makePublic();
}

/**
 * @param filePath -
 * @returns promise that resollves when 
 */
export function deleteRawVideo(fileName: string) {
    return deleteFile(`${localRawVideoPath}/${fileName}`);
}

/**
 * @param filePath -
 * @returns promise that resollves when 
 */
 export function deleteProcessedVideo(fileName: string) {
    return deleteFile(`${localProcessedVideoPath}/${fileName}`);
}


/**
 * @param filePath - path of file to delete
 * @returns a promise that resolves when file has been deleted
 */
function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`Failed to delete file at ${filePath}`, err);
                    reject(err);
                } else{
                    console.log(`file deleted at ${filePath}`);
                    resolve();
                }
            });
        } else {
            console.log(`File not found at ${filePath}, skipping the delete`);
            resolve()
        };
    });
}

/***
 * Ensures directory exists, if not creates it
 * @param {string} dirPath - directory path to check 
 */
function ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true }); // recursive for nested directories
        console.log(`Directory created at ${dirPath}`);
    }
}