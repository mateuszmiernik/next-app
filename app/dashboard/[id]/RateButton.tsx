'use client'

import { useState, useRouter } from 'react';
import { rateContentAction } from '@/app/actions/ai';
import { Button } from '@/components/ui/button';
import { router } from 'better-auth/api';

interface RateButtonProps {
    projectId: string
}

export function RateButton({ projectId }: RateButtonProps) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');

    const handleRate = async () => {
        const router = useRouter();
        setPending(true);
        setError('');

        const response = await rateContentAction(projectId);

        if (!response.success) {
            setError(response.error || 'Something went wrong.');
            setPending(false);
            return;
        }

        setPending(false);
        router.refresh();
    }

    return (
        <div>
            <Button
                onClick={handleRate}
                disabled={pending}
                variant="outline" 
                size="sm"
            >
                {pending ? (
                    <span className='flex items-center gap-2'>
                        <span className="animate-pulse">Analyzing text with AI...</span>
                    </span>
                ) : (
                    "Rate Content with AI"
                )
            }
            </Button>

            {error && (
                <p className='text-xs font-medium text-destructive mt-1 bg-destructive/10 p-2 rounded-lg border border-destructive/20'>
                    {error}
                </p>
            )}
        </div>
    )
}