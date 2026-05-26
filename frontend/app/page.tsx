import Link from 'next/link';
import { CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <section className="container flex flex-col items-center justify-center gap-6 px-4 py-24 text-center md:py-32">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
          Stay organized and focused.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground text-pretty">
          A minimalist task manager designed to help you track your daily todos without distractions.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container px-4 py-16 md:py-24">

          <div className="mb-10 flex items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Why it works
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 auto-rows-fr">

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-muted/40 p-8 lg:col-span-2 min-h-[220px] flex flex-col justify-between hover:bg-muted/70 transition-colors duration-300">
              <span className="absolute right-6 top-4 font-mono text-[80px] font-bold leading-none text-border select-none pointer-events-none transition-transform duration-500 group-hover:translate-x-2">
                01
              </span>
              <div className="relative z-10">
                <p className="mb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">Interface</p>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Nothing you don't need.
                </h3>
              </div>
              <p className="relative z-10 mt-6 max-w-sm text-muted-foreground leading-relaxed">
                No dashboards, no analytics, no noise. Just your tasks for today, laid out clean.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground p-8 flex flex-col justify-between min-h-[220px] lg:row-span-2 hover:opacity-95 transition-opacity duration-300">
              <span className="absolute right-4 bottom-4 font-mono text-[120px] font-bold leading-none opacity-10 select-none pointer-events-none">
                ✓
              </span>
              <div>
                <p className="mb-3 text-xs font-mono uppercase tracking-widest opacity-60">Tracking</p>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Done is<br />a feeling.
                </h3>
              </div>
              <p className="mt-6 opacity-80 leading-relaxed text-sm">
                Check off a task and actually feel it. Every completion is satisfying, not buried in a sea of metrics.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-muted/40 p-8 flex items-center gap-8 hover:bg-muted/70 transition-colors duration-300">
              <div className="shrink-0 flex flex-col gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity">
                <div className="h-0.5 w-12 bg-foreground rounded-full" />
                <div className="h-0.5 w-8 bg-foreground rounded-full" />
                <div className="h-0.5 w-14 bg-foreground rounded-full" />
                <div className="h-0.5 w-6 bg-foreground rounded-full" />
              </div>
              <div>
                <p className="mb-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">Performance</p>
                <h3 className="text-xl font-semibold tracking-tight">Fast. Always.</h3>
                <p className="mt-2 text-sm text-muted-foreground">Works on mobile or desktop without lag or layout jank.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-muted/40 p-8 flex flex-col justify-between hover:bg-muted/70 transition-colors duration-300">
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Simplicity</p>
              <div>
                <div className="text-5xl font-bold tracking-tighter tabular-nums">
                  2
                  <span className="text-2xl text-muted-foreground font-normal"> clicks</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  From idea to tracked task, in two taps. No forms, no friction.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="border-t border-border mt-auto">
        <div className="container flex items-center justify-between px-4 py-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            <span>TodoApp</span>
          </div>
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

