import express from 'express';
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcesssedVideo } from './storage';
import { setVideo } from './firestore';
import { isVideoNew } from './firestore';

setupDirectories();

const app = express();
app.use(express.json());


app.post('/process-video', async (req, res) => {
    
    let data;

    try {
        const message = Buffer.from(req.body.message.data, "base64").toString("utf8");
        data = JSON.parse(message);

        console.log(data)

        if (!data.name) {
            throw new Error("Invalid message payload received.");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send("Bad Request: Missing file name");
    }

    // processing bucket
    const inputFileName = data.name; // Format of <UID>-<DATE>.<EXTENSION>
    const outputFileName = `processed-${inputFileName}`;
    const videoId = inputFileName.split(".")[0];

    if (!isVideoNew(videoId)) {
        return res.status(400).send("Bad Request: video already procesing or processed");
    } else {
        await setVideo(videoId, {
            id: videoId,
            uid: videoId.split("-")[0],
            status: "processing"
        });
    }

    // download the raw video from cloud storage
    await downloadRawVideo(inputFileName);

    // convert video to 360p, using try catch bc it may fail
    try {
        await convertVideo(inputFileName, outputFileName);
    } catch (err) {
        await Promise.all([
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFileName)
        ]);
        console.error(err);
        return res.status(500).send(`Interal server Error: video processing failed`);
    }

    // upload processed video to cloud storage
    await uploadProcesssedVideo(outputFileName);

    // after its processed, update status
    await setVideo(videoId, {
        status: "processed",
        filename: outputFileName
    });

    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ])

    return res.status(200).send(`Processsing finished successfully`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
