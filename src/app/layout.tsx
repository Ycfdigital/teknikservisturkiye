import type { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/layout/Layout";
import { organizationSchema } from "@/lib/seo";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
const ADSENSE_PUB = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "";

export const metadata: Metadata = {
  title: {
    default: "Türkiye Geneli Teknik Servis Ağı 2026 | TeknikServisTürkiye",
    template: "%s | TeknikServisTürkiye"
  },
  description: "Türkiye genelinde buzdolabı, çamaşır makinesi, bulaşık makinesi, klima ve kombi servisi. Yetkili ve özel teknik servis noktalarını karşılaştırın, hemen iletişime geçin.",
  keywords: ["teknik servis", "beyaz eşya servisi", "klima servisi", "kombi servisi", "türkiye"],
  openGraph: {
    siteName: "TeknikServisTürkiye",
    locale: "tr_TR",
    type: "website",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://teknikservisturkiye.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}

        {/* Google AdSense */}
        {ADSENSE_PUB && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${ADSENSE_PUB}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* GTM noscript */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0" width="0" style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
