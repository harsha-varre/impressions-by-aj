import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import { localBusinessJsonLd, JsonLd } from "@/lib/jsonld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "New Jersey photographer",
    "South Asian wedding photography",
    "arangetram photography",
    "maternity photographer NJ",
    "event photography New Jersey",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf7f3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <JsonLd data={localBusinessJsonLd()} />
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#fdf7f3",
              color: "#3a2f3a",
              border: "1px solid #f0dcdc",
              fontFamily: "var(--font-archivo)",
            },
          }}
        />
      </body>
    </html>
  );
}
