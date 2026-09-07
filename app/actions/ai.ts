'use server'
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath }from 'next/cache';


export async function rateContentAction(projectId: string) {
    const session = await auth.api.getSession(
        {
            headers: await headers()
        });

    if (!session) {
        return { success: false, error: "You must be logged in to perform this operation" }
    }

    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId: session.user.id
        }
    });

    if (!project || !project.content) {
        return { success: false, error: "Failed to fetch content" }
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "openrouter/free",
                    messages: [
                        {
                            role: "system",
                            content: "You are an SEO and web performance expert. Analyze the webpage text for readability. Return your response EXCLUSIVELY in JSON format: {\"score\": number_from_1_to_100, \"review\": \"a short summary in English up to 3 sentences\"}"
                        },
                        {
                            role: "user",
                            content: `Here is the scraped website content: \n\n${project.content}`
                        }
                    ],
                    response_format: { type: "json_object" }
                })
            });

            const data = await response.json();

            const aiResponseText = data.choices[0].message.content;
            const aiJson = JSON.parse(aiResponseText);

            const updateProject = await prisma.project.update({
                where: { id: projectId },
                data: {
                    aiScore: aiJson.score,
                    aiReview: aiJson.review
                }
            });

            revalidatePath(`/dashboard/${projectId}`);
            return { success: true };
    } catch (error) {
        console.error('OpenRouter error occured', error);
        return { success: false, error: "AI failed to respond correctly." }
    }
}