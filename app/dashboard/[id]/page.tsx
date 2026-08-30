import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import Link from "next/link";


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
            <main>
                <div>
                    <Button variant="outline" size="sm">
                        <Link href="/dashboard">← Back to Dashboard</Link>
                    </Button>
                </div>
            </main>
        </div>
    );
}