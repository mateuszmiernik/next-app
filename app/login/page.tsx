'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { loginSchema } from "@/schemas/auth";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{ email?: string, password?: string }>({});

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setFieldErrors({});

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors: { email?: string, password?: string }= {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as "email" || "password";
        formattedErrors[fieldName] = issue.message;
      });

      setFieldErrors(formattedErrors);
      setPending(false);
      return;
    }

    


    await signIn.email({
      email: email,
      password: password
    },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Invalid email or password.");
          setPending(false);
        }
      }
    )
  }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md bg-card border-border shadow-2xl">

          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Sign in
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-md bg-destructive/15 text-destructive text-sm text-center font-medium border border-destructive/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-background border-border text-foreground focus:bg-background focus-visible:ring-primary"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder=""
                  className="bg-background border-border text-foreground focus-visible:ring-primary"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" disabled={pending} className="w-full mt-2 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all duration-300">
                {pending ? "logging in... " : "Sign In"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign up
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
    );
  }