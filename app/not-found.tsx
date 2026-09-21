import Link from "@/components/Link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative z-[1]">
      <div className="empty">
        <p>Page not found.</p>
        <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
          Back home
        </Button>
      </div>
    </div>
  );
}
