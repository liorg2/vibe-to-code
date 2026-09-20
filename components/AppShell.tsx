import { Header } from "./Header";
import { SideNav } from "./SideNav";

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
    <div className="wrap">
      <Header showHero={showHero} />
      <main className={showNav ? undefined : "nonav"}>
        {showNav && <SideNav />}
        <div id="content">{children}</div>
      </main>
      <footer>One static page. No tracking — progress lives in your browser, and in your account if you sign in.</footer>
    </div>
  );
}
