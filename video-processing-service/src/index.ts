import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcesssedVideo } from './storage';

setupDirectories();

const app = express();
app.use(express.json());


app.post('/process-video', async (req, res) => {
    
    // all from gcp cloud pub sub documentation
    let data;

    try {
        const message = Buffer.from(req.body.message.data, "base64").toString("utf8");
        data = JSON.parse(message);
        if (!data.name) {
            throw new Error("Invalid message payload received.");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send("Bad Request: Missing file name");
    }

    // processing bucket
    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;

    // download the raw video from cloud storage
    await downloadRawVideo(inputFileName);

    // convert video to 720p, using try catch bc it may fail
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
    await uploadProcesssedVideo(outputFileName)

    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ])
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
