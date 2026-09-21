"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="wrap">
      <div className="empty">
        <p>Something went wrong. Give it another try.</p>
        <button className="btn prim" onClick={reset}>
          Try again
        </button>
      </div>
    </div>
  );
}
