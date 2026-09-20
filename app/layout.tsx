import type { Metadata } from "next";
import { getCourse } from "@/lib/course";
import { Providers } from "@/components/Providers";
import "./globals.css";

const { UI } = getCourse();

export const metadata: Metadata = {
  title: "Vibe → Code",
  description:
    "The vocabulary and mental models of professional software development, for people who build with AI. English and Hebrew.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Heebo:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body dir="ltr">
        <Providers UI={UI}>{children}</Providers>
      </body>
    </html>
  );
}
