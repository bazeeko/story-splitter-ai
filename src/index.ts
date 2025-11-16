import express from "express";
import {mastra} from "@src/mastra/index.js";
import {SplitStoryRequest, SplitStoryResponse} from "@src/models/user-story.js";
import {parseConfig} from "@src/configs/config.js";

const cfg = parseConfig();
const app = express();
app.use(express.json());

app.post("/user-stories/split", async (req, res) => {
    try {
        const reqBody = req.body as SplitStoryRequest;

        const storySplitterWorkflow = mastra.getWorkflow("storySplitterWorkflow");
        const run = await storySplitterWorkflow.createRunAsync();
        const result = await run.start({inputData: reqBody});

        if (result.status == "failed") {
            return res.status(500).json({error: result.error});
        } else if (result.status == "suspended") {
            return res.status(500).json({error: result.suspendPayload});
        }

        return res.json(result.result as SplitStoryResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Workflow failed"});
    }
});

app.listen(cfg.HTTP_PORT, () => console.log(`Server running on ${cfg.HTTP_PORT}`));
