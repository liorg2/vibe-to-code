import type { Metadata } from "next";
import { Inter, Heebo, JetBrains_Mono, Geist } from "next/font/google";
import { getCourse } from "@/lib/course";
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

export const metadata: Metadata = {
  title: "Vibe → Code",
  description:
    "The vocabulary and mental models of professional software development, for people who build with AI. English and Hebrew.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="dark"
      className={cn(heebo.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body dir="ltr" suppressHydrationWarning>
        {/* restore the nav toggle before paint, so a refresh doesn't flash the wrong state */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('v2c.nav')==='1')document.body.classList.add('nav-toggled')}catch(e){}`,
          }}
        />
        <Providers UI={UI}>{children}</Providers>
      </body>
    </html>
  );
}
