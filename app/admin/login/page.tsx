import Link from "next/link";
import { supabaseConfigured } from "@/lib/supabase/config";
import { Wordmark } from "@/components/wordmark";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="Back to site">
            <Wordmark />
          </Link>
        </div>
        <div className="border border-hairline bg-cream p-8">
          <span className="micro">Studio admin</span>
          <h1 className="mt-2 font-display text-2xl text-ink">Sign in</h1>
          <p className="mt-2 mb-6 font-sans text-sm text-body">
            Manage the photos shown across the site.
          </p>

          {supabaseConfigured ? (
            <LoginForm />
          ) : (
            <p className="font-sans text-sm text-rose-deep">
              Admin isn&rsquo;t configured yet. Add your Supabase environment
              variables (see <code className="font-mono text-xs">SETUP.md</code>)
              and redeploy.
            </p>
          )}
        </div>
        <p className="mt-6 text-center">
          <Link
            href="/"
            className="font-sans text-xs text-muted hover:text-rose-deep"
          >
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
