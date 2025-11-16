import {Agent} from "@mastra/core/agent";
import {Memory} from "@mastra/memory";
import {LibSQLStore, LibSQLVector} from "@mastra/libsql";
import {fastembed} from "@mastra/fastembed"

export const analystAgent = new Agent({
    name: "Analyst Agent",
    instructions: `
        You are a professional Agile Product Manager and Technical Analyst.
        Your goal is to take a user's feature description and turn it into a structured Jira plan.
    `,
    model: "openai/gpt-4o-mini",
    tools: {},
    scorers: {},
    memory: new Memory({
        storage: new LibSQLStore({
            url: "file:../story-splitter.db",
        }),
        vector: new LibSQLVector({
            connectionUrl: "file:../vector-story-splitter.db"
        }),
        embedder: fastembed,
        options: {
            threads: {
                generateTitle: true,
            },
            semanticRecall: {
                topK: 5,
                messageRange: 2,
                scope: "resource",
            },
        },
    }),
});
