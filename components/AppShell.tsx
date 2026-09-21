import { Header } from "./Header";
import { SideNav } from "./SideNav";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  showHero = false,
  showNav = true,
}: {
  children: React.ReactNode;
  showHero?: boolean;
  /** ponytail: gated pages drop it — every link bounces back, and on a phone the nav
   *  stacks above the content and buries the message under 20 lesson links */
  showNav?: boolean;
}) {
  return (
    <div className="relative z-[1]">
      <Header showHero={showHero} showNav={showNav} />
      <main
        className={cn(
          "mx-auto grid max-w-[1240px] items-start gap-[34px] px-6 pb-[100px]",
          showNav ? "grid-cols-[272px_1fr]" : "nonav grid-cols-1"
        )}
      >
        {showNav && <SideNav />}
        <div id="content">{children}</div>
      </main>
      <footer>One static page. No tracking — progress lives in your browser, and in your account if you sign in.</footer>
    </div>
  );
}
