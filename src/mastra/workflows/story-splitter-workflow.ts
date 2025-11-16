import {createStep, createWorkflow} from "@mastra/core/workflows";
import {z} from "zod";

export const StorySplitterInputSchema = z.object({
    text: z.string().describe('A user story or a text containing detailed description of the feature'),
});

export const StorySplitterTask = z.object({
    title: z.string().describe("A short title for the task"),
    complexity: z.number().int().describe("Task complexity (Fibonacci sequence)"),
});

export const StorySplitterOutputSchema = z.object({
    epic: z.string().describe("Title of the epic"),
    tasks: z.array(StorySplitterTask).describe("An array of tasks")
});

const splitStory = createStep({
    id: 'split-story',
    description: 'Suggests epic and tasks that should be created.',
    inputSchema: StorySplitterInputSchema,
    outputSchema: StorySplitterOutputSchema,
    execute: async ({inputData, mastra}) => {
        const {text} = inputData;

        if (!text) {
            throw new Error('user story not found');
        }

        const storySplitterAgent = mastra?.getAgent('storySplitterAgent');
        if (!storySplitterAgent) {
            throw new Error('story splitter agent not found');
        }

        const prompt = `
        Based on the provided user story, suggest appropriate tasks that should be created in Jira.
            
        Your response must strictly be a minified raw JSON object without any markdown symbols that conforms to the following following structure.
        {
            "epic": "Epic Title",
            "tasks": [
                {
                    "title": "Task Title 1",
                    "complexity": 2
                },
                {
                    "title": "Task Title 2",
                    "complexity": 5
                }
            ]
        }
        
        - The 'epic' field must be a concise title of the Epic.
        - The 'tasks' must be a comprehensive breakdown of all necessary implementation steps.
        - The 'title' for each task must be in the language that the user primarily used in this conversation.
        - The 'complexity' must be an integer from the standard Fibonacci sequence (1, 2, 3, 5, 8, 13), representing story points.
        
        User story:
        ${text}`;

        const response = await storySplitterAgent.stream([
            {
                role: 'user',
                content: prompt,
            },
        ]);

        let output = '';
        for await (const chunk of response.textStream) {
            process.stdout.write(chunk);
            output += chunk;
        }

        console.log("AGENT RESPONSE:", output)

        return JSON.parse(output);
    },
});

export const storySplitterWorkflow = createWorkflow({
    id: 'story-splitter-workflow',
    inputSchema: StorySplitterInputSchema,
    outputSchema: StorySplitterOutputSchema,
})
    .then(splitStory)

storySplitterWorkflow.commit();
