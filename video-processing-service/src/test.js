import ffmpeg from 'fluent-ffmpeg';

	const localRawVideoPath = "./src/raw-videos";
	const localProcessedVideoPath = "./src/processed-videos";

	function convertVideo(rawVideoName, processedVideoName) {
    return new Promise((resolve, reject) => {
      ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
      .outputOptions("-vf", "scale=-1:360") // 360p
      .on("end", () => {
        console.log("Processing finished successfully.");
        resolve();
      })
      .on("error", (err, stdout, stderr) => {
        console.log("pay attention here");
        console.log(`An error occurred: ${err.message}`);
        console.log(`An error occurred: ${err.message + stdout}`);
        console.log(`An error occurred: ${err.message + stderr}`);
        console.log("filler");
        console.log("filler");
        console.log("filler");
        console.log(`An error occurred: ${err.message + stdout + stderr}`);
        reject(err);
      })
      .save(`${localProcessedVideoPath}/${processedVideoName}`);
    });
  }

	convertVideo("mpegexample.mpeg", "processed-mpegexample.mpeg");