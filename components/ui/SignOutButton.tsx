'use client'

import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

export function SignOutButton() {
    const router = useRouter();
    const handleSignOut = () => {

    }

    return(
        <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-destructive text-xs"
        >
        Log Out
        </Button>
    )
}