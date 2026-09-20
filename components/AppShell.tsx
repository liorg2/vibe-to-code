import { Header } from "./Header";
import { SideNav } from "./SideNav";

export function AppShell({ children, showHero = false }: { children: React.ReactNode; showHero?: boolean }) {
  return (
    <div className="wrap">
      <Header showHero={showHero} />
      <main>
        <SideNav />
        <div id="content">{children}</div>
      </main>
      <footer>One static page. No tracking — progress lives in your browser, and in your account if you sign in.</footer>
    </div>
  );
}
