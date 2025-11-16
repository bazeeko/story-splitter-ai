import dotenv from "dotenv";

interface ENV {
    HTTP_PORT: string | undefined;
    OPENAI_API_KEY: string | undefined;
}

export interface Config {
    HTTP_PORT: string;
    OPENAI_API_KEY: string;
}

export function parseConfig(): Config {
    dotenv.config();

    let env: ENV = {
        HTTP_PORT: process.env.HTTP_PORT ?? "3000",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    }

    for (const [key, value] of Object.entries(env)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in env config`);
        }
    }

    return env as Config;
}
