'use client'

import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { signOut } from '@/lib/auth-client';
import { useState } from 'react';

export function SignOutButton() {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    
    const handleSignOut = async () => {
        setPending(true);

        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login');
                }
            }
        });
    }

    return(
        <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-destructive text-xs cursor-pointer"
            disabled={pending}
        >
        {pending ? 'Logging out...' : 'Log Out'}
        </Button>
    )
}