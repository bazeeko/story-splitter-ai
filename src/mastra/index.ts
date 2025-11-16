import {Mastra} from '@mastra/core/mastra';
import {PinoLogger} from '@mastra/loggers';
import {LibSQLStore} from '@mastra/libsql';
import {storySplitterWorkflow} from './workflows/story-splitter-workflow.js';
import {storySplitterAgent} from './agents/story-splitter-agent.js';

export const mastra = new Mastra({
    workflows: {storySplitterWorkflow},
    agents: {storySplitterAgent},
    scorers: {},
    storage: new LibSQLStore({
        url: ":memory:",
    }),
    logger: new PinoLogger({
        name: 'Mastra',
        level: 'info',
    }),
    observability: {
        default: {enabled: true},
    },
});
