'use server';
import { Firecrawl } from 'firecrawl';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { urlSchema } from '@/schemas/auth';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function analyzeWebsiteAction(urlValue: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session || !session.user) {
            return { success: false, error: "You must be logged in to perform this operation"}
        }

        const validation = urlSchema.safeParse({ url: urlValue });

        if (!validation.success) {
            return { success: false, error: "The provided URL address is invalid."}
        }

        const validUrl = validation.data.url;



        // console.log(validation);
        // console.log(session);

        // const results = await firecrawl.search(urlValue, {limit: 5 });

    } catch (error: any) {
        console.error("Critical Server Action error: ", error);
        return;
    }
}