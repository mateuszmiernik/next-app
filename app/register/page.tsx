'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { signUp } from '@/lib/auth-client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchema } from '@/schemas/auth';


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{
        name?: string,
        email?: string,
        password?: string,
        confirmPassword? :string
    }>({});

    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setFieldErrors({});
        setPending(true);

        const result = registerSchema.safeParse({ name, email, password, confirmPassword });

        console.log(result);

        if (!result.success) {
            const formattedErrors: typeof fieldErrors = {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as keyof typeof fieldErrors;
                formattedErrors[fieldName] = issue.message;
            });
            
            setFieldErrors(formattedErrors);
            setPending(false);
            return;
        }

        await signUp.email({
            email: result.data.email,
            password: result.data.password,
            name: result.data.name
            },
            {
                onSuccess: () => {
                    router.push('/dashboard');
                },
                onError: (ctx) => {
                    setError(ctx.error.message || "Something went wrong. Please try again.");
                    setPending(false);
                }
            }
        );
    }

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
                    {error && (
                        <div className="mb-4 p-3 rounded-md bg-destructive/15 text-destructive text-sm text-center font-medium border border-destructive/20">
                            {error}
                        </div>
                        )
                    }

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-foreground">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="full name"
                                className={`bg-background border-border text-foreground focus-visible:ring-primary ${fieldErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {fieldErrors.name && (
                                <p className='text-xs font-medium text-destructive mt-1'>
                                    {fieldErrors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className={`bg-background border-border text-foreground focus-visible:ring-primary ${fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {fieldErrors.email && (
                                <p className='text-xs font-medium text-destructive mt-1'>
                                    {fieldErrors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className={`bg-background border-border text-foreground focus-visible:ring-primary ${fieldErrors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {fieldErrors.password && (
                                <p className='text-xs font-medium text-destructive mt-1'>
                                    {fieldErrors.password}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className={`bg-background border-border text-foreground focus-visible:ring-primary ${fieldErrors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {fieldErrors.confirmPassword && (
                                <p className='text-xs font-medium text-destructive mt-1'>
                                    {fieldErrors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <Button type="submit" disabled={pending} className="w-full mt-2 hover:shadow-[0_0_.9375rem_rgba(244,63,94,0.4)] transition-all duration-300">
                            {pending ? "Creating account..." : "Sign Up"}
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