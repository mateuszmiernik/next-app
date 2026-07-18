import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export default function DashboardPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground p-6">

            <header className="flex justify-between items-center border-b border-border/40 pb-4 mb-8">
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-xs text-muted-foreground">Welcome back to your analysis panel</p>
                </div>

                <Button variant="outline" size="sm" asChild>
                    <Link href="/">← Back to Home</Link>
                </Button>
            </header>

            <main className="flex-grow max-w-4xl w-full mx-auto space-y-6">
                <Card className="bg-card border-border shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold tracking-tight">
                            Web Performance Analyzer
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-sm">
                            Enter any URL below to start a comprehensive speed and SEO analysis.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-grow">
                                <Input
                                    type="url"
                                    placeholder="https://example.com"
                                    className="w-full bg-background border-border text-foreground focus-visible:ring-primary h-10"
                                    required
                                />
                            </div>

                            <Button type="submit" className="h-10 px-6 font-semibold hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all duration-300">
                                Analyze
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-border/40 rounded-xl p-4 bg-card/50">
                        <p className="text-xs text-muted-foreground font-medium">Recent Analyses</p>
                        <p className="text-2xl font-bold mt-1 text-primary">0</p>
                    </div>
                    <div className="border border-border/40 rounded-xl p-4 bg-card/50">
                        <p className="text-xs text-muted-foreground font-medium">Average Score</p>
                        <p className="text-2xl font-bold mt-1">--</p>
                    </div>
                    <div className="border border-border/40 rounded-xl p-4 bg-card/50">
                        <p className="text-xs text-muted-foreground font-medium">System Status</p>
                        <p className="text-2xl font-bold mt-1 text-emerald-400">Operational</p>
                    </div>
                </div>
            </main>
        </div>
    )
}