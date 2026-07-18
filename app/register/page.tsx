import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">

            <Card className="w-full max-w-md bg-card border-border shadow-2xl">


                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                        Enter your details below to create your new account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-foreground">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="full name"
                                className="bg-background border-border text-foreground focus-visible:ring-primary"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="bg-background border-border text-foreground focus-visible:ring-primary"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-background border-border text-foreground focus-visible:ring-primary"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className="bg-background border-border text-foreground focus-visible:ring-primary"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full mt-2 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all duration-300">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                    <p>
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                    <p>
                        <Link href="/" className="hover:text-foreground text-xs transition-colors">
                            ← Back to homepage
                        </Link>
                    </p>
                </CardFooter>

            </Card>
        </div>
    )
}