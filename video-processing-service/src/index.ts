import express from "express";
import ffmpeg from "fluent-ffmpeg";


const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
    // get path of the input video file from the req body

    const inputVideoPath = req.body.inputVideoPath;
    const outputVideoPath = req.body.outputVideoPath;

    if(!inputVideoPath || !outputVideoPath) {
        res.status(400).send("Bad request! Missing filepath.");
    }

    ffmpeg(inputVideoPath)
        .outputOption("-vf", "scale=-1:360")
        .on("end", () => {

            res.status(200).send("Video processing finished successfully.");
        })
        .on("error", (err) => {
            console.log(`An error occured: ${err}`);
            res.status(500).send(`Internal server error: ${err}`);
        })
        .save(outputVideoPath);

    
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video listening service listening at: http://localhost:${port}`);
});