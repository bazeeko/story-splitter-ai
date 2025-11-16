import {z} from "zod";

export const StorySplitterInputSchema = z.object({
    text: z.string().describe("A user story or a text containing detailed description of the feature"),
});

export const StorySplitterTask = z.object({
    title: z.string().describe("A short title for the task"),
    complexity: z.number().int().describe("Task complexity (Fibonacci sequence)"),
});

export const StorySplitterOutputSchema = z.object({
    epic: z.string().describe("Title of the epic"),
    tasks: z.array(StorySplitterTask).describe("An array of tasks")
});

export type SplitStoryRequest = z.infer<typeof StorySplitterInputSchema>;
export type SplitStoryResponse = z.infer<typeof StorySplitterOutputSchema>;
