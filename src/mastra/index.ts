import {Mastra} from "@mastra/core/mastra";
import {PinoLogger} from "@mastra/loggers";
import {LibSQLStore} from "@mastra/libsql";
import {storySplitterWorkflow} from "@src/mastra/workflows/story-splitter-workflow.js";
import {analystAgent} from "@src/mastra/agents/analyst-agent.js";

export const mastra = new Mastra({
    workflows: {storySplitterWorkflow},
    agents: {analystAgent: analystAgent},
    scorers: {},
    storage: new LibSQLStore({
        url: ":memory:",
    }),
    logger: new PinoLogger({
        name: "Mastra",
        level: "info",
    }),
    observability: {
        default: {enabled: true},
    },
});
