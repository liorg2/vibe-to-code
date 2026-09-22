import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Heebo, JetBrains_Mono, Geist } from "next/font/google";
import { getCourse } from "@/lib/course";
import { LANGS, parseLang } from "@/lib/lang";
import { serverLang } from "@/lib/lang-server";
import { SITE_URL, abs } from "@/lib/site";
import { Providers } from "@/components/Providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const { UI } = getCourse();

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-rtl",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const DESCRIPTION =
  "The vocabulary and mental models of professional software development, for people who build with AI. English and Hebrew.";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const lang = parseLang(h.get("x-vibe-lang"));
  // middleware strips the locale before the rewrite, so it hands the bare path back on a header
  const path = h.get("x-vibe-path") ?? "/";

  return {
    metadataBase: new URL(SITE_URL),
    title: "Vibe → Code",
    description: DESCRIPTION,
    alternates: {
      canonical: abs(lang, path),
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [l, abs(l, path)])),
        "x-default": abs("en", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Vibe → Code",
      title: "Vibe → Code",
      description: DESCRIPTION,
      url: abs(lang, path),
      locale: lang === "he" ? "he_IL" : "en_US",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await serverLang();
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      data-theme="dark"
      className={cn(heebo.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body dir={dir} suppressHydrationWarning>
        {/* restore the folded desktop nav before paint, so a refresh doesn't flash the wrong state */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('v2c.nav')==='1')document.body.classList.add('nav-collapsed')}catch(e){}`,
          }}
        />
        <Providers UI={UI}>{children}</Providers>
      </body>
    </html>
  );
}
