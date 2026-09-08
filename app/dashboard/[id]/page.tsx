import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from "next/link";
import { rateContentAction } from '@/app/actions/ai';
import { RateButton } from './RateButton';


interface DetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: DetailsPageProps) {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect('/login');
    }

    const project = await prisma.project.findFirst({
        where: {
            id: id,
            userId: session.user.id
        }
    });

    if (!project) {
        notFound();
    }

    // console.log(id);
    // console.log(session);
    // console.log(project);

    return (
        <div className='min-h-screen bg-background text-foreground p-6'>
            <main className='max-w-4xl w-full mx-auto space-y-6'>
                <div className='flex justify-between items-center'>
                    <Button variant="outline" size="sm">
                        <Link href="/dashboard">← Back to Dashboard</Link>
                    </Button>
                    <p className='text-xs text-muted-foreground'>Analyzed on: {new Date(project.createdAt || new Date()).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                </div>

                <Card>  
                    <CardHeader>
                        <CardTitle>
                            OpenRouter AI Audit
                        </CardTitle>
                        <CardDescription>
                            Get an automated SEO and readability score based on the scraped content.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {project.aiScore !== null && project.aiScore !== undefined ? (
                            <div className='flex flex-col md:flex-row gap-6 items-start md:items-center'>
                                <div className='flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-primary-foreground font-black text-sm shadow-inner shrink-0'>
                                    {project.aiScore}/100
                                </div>
                                <div className='space-y-1'>
                                    <p className="text-sm font-semibold text-foreground">AI Review Verdict:</p>
                                    <p className="text-sm text-muted-foreground italic">"{project.aiReview}"</p>
                                </div>
                            </div>
                            
                        ) : (
                            <div className='space-y-3'>
                                <p className="text-sm text-muted-foreground">This content has not been evaluated by AI yet.</p>
                                <RateButton projectId={project.id}/>
                            </div>
                        )}
                    </CardContent>
                </Card>

        

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {project.url}
                        </CardTitle>
                        <CardDescription>
                            Project ID: {project.id}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h3 className='text-sm font-semibold mb-3 tracking-wide text-foreground uppercase'>Scraped Markdown Content:</h3>
                        <div className='bg-background border border-border p-4 rounded-lg overflow-x-auto font-mono text-xs whitespace-pre-wrap leading-relaxed text-muted-foreground'>
                            {project.content}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}