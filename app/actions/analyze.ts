'use server';
import { Firecrawl } from 'firecrawl';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { urlSchema } from '@/schemas/auth';
import { prisma } from '@/lib/prisma';

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

        const scrapeResult = await firecrawl.scrape(validUrl);

        if (!scrapeResult || !scrapeResult.markdown) {
            return { success: false, error: "Failed to fetch website content. Please verify if the link works." }
        }

        const markdownContent = scrapeResult.markdown;

        const newProject = await prisma.project.create({
            data: {
                url: validUrl,
                content: markdownContent,
                userId: session.user.id
            }
        });
         
        return { success: true, projectId: newProject.id}
    } catch (error: any) {
        console.error("Critical Server Action error: ", error);
        return { success: false, error: "An internal server error occurred during the scraping process." };
    }
}