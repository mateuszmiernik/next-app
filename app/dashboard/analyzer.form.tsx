'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { urlSchema } from '@/schemas/auth';
import { analyzeWebsiteAction } from '@/app/actions/analyze';
import { useRouter } from 'next/navigation';

export function AnalyzerForm() {
    const router = useRouter();
    const [urlValue, setUrlValue] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const handleAnalyze = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setPending(true);

        const result = urlSchema.safeParse({ url: urlValue });

        if (!result.success) {
            setError(result.error.issues[0].message);
            setPending(false);
            return;
        }

        const response = await analyzeWebsiteAction(result.data.url);

        if (!response.success) {
            setError(response.error || "Failed to analyze the website.")
            setPending(false);
            return;
        }

        setUrlValue("");
        setPending(false);
        router.refresh();
    }

    return (
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
            <div className="grow">
                <Input
                    type="text"
                    placeholder="https://example.com"
                    className="w-full bg-background border-border text-foreground focus-visible:ring-primary h-10"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                />
            </div>

            <Button type="submit" disabled={pending} className="h-10 px-6 font-semibold hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all duration-300">
                {pending ? "Analyzing..." : "Analyze"}
            </Button>
            {error && (
                <p className="block text-xs font-medium text-destructive mt-1">
                    {error}
                </p>
            )}
        </form>
    )
}