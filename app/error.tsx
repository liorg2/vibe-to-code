"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative z-[1]">
      <div className="empty">
        <p>Something went wrong. Give it another try.</p>
        <Button variant="brand" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
