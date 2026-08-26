'use server';
import { Firecrawl } from "firecrawl";

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function analyzeWebsiteAction(urlValue: string) {
    try {
        const results = await firecrawl.search(urlValue, {limit: 5 });

    } catch (error: any) {
        console.error("Critical Server Action error: ", error);
        return;
    }
}