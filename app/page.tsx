import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className='min-h-screen flex flex-col p-6 bg-background text-foreground'>
      <header className='flex justify-between items-center bg-card border border-border rounded-xl p-4 shadow-xl'>
        <h1 className='text-xl font-bold tracking-tight'>logo</h1>

        <nav>
          <Button variant='outline'>
            <Link href='/'>Sign In</Link>
            
          </Button>
          
          <Button variant='default'>
            <Link href='/'>Sign Up</Link>
          </Button>
        </nav>
      </header>
    </div>
  )
}