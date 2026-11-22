"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <span className="micro">Studio admin</span>
      <h1 className="mt-3 font-display text-2xl text-ink">
        Something went wrong
      </h1>
      <p className="mt-3 font-sans text-sm text-body">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex h-11 items-center bg-rose px-6 font-sans text-sm font-semibold text-white hover:bg-rose-hover"
      >
        Try again
      </button>
    </div>
  );
}
