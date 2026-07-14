import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className='min-h-screen flex flex-col p-6 bg-background text-foreground'>
      <header className='flex justify-between items-center bg-card border border-border rounded-xl p-4 shadow-xl'>
        <h1 className='text-xl font-bold tracking-tight'>logo</h1>

        <nav className='flex items-center gap-3'>
          <Button variant='outline'>
            <Link href='/login'>Sign In</Link>
            
          </Button>
          
          <Button variant='default'>
            <Link href='/register'>Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className='flex-grow flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4 py-16'>
        <h2 className='text-5xl font-extrabold leading-tight'>
          Analyze Your Web Performance
          <span className="text-primary block mt-2 drop-shadow-[0_0_10px_rgba(244,63,94,0.2)]">Instantly</span>
        </h2>

        <p className='text-muted-foreground max-w-lg leading-relaxed mb-10'>Get comprehensive insights and data analysis for any URL. Fast, reliable, and tailored for modern web developers.</p>

        <Button variant='link' className='font-semibold text-base hover:underline'>
          <Link href='/dashboard'>Go to Dashboard →</Link>
        </Button>
      </main>

      <footer className='text-xs text-center text-muted-foreground/40 border-t border/40 border-border/40 py-4'>
         © 2026 LOGO App. All rights reserved.
      </footer>

    </div>
  )
}