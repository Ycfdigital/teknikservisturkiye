import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { iller, kategoriler } from "@/data/turkiye";
import { generateTitle, generateDescription, breadcrumbSchema, ilSchema, faqSchema, kategoriSSS, sayfaBasliklari, SITE_URL } from "@/lib/seo";
import { AdSenseBanner } from "@/components/ui/AdSense";

export const dynamic = "force-dynamic";

interface Props { params: { il: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const il = iller[params.il];
  if (!il) return {};
  return {
    title: generateTitle({ tip: "il", il: il.ad }),
    description: generateDescription({ tip: "il", il: il.ad }),
    alternates: { canonical: `${SITE_URL}/${params.il}` },
    openGraph: { title: generateTitle({ tip: "il", il: il.ad }), description: generateDescription({ tip: "il", il: il.ad }), url: `${SITE_URL}/${params.il}`, locale: "tr_TR", type: "website" }
  };
}

export default function IlSayfasi({ params }: Props) {
  const il = iller[params.il];
  if (!il) notFound();

  const basliklar = sayfaBasliklari({ tip: "il", il: il.ad })!;
  const breadcrumb = breadcrumbSchema([{ ad: "Ana Sayfa", url: "/" }, { ad: il.ad, url: `/${params.il}` }]);
  const ilSema = ilSchema({ il: il.ad, ilSlug: params.il, lat: il.lat, lng: il.lng, ilceler: il.ilceler });
  const sss = faqSchema(kategoriSSS({ ilce: il.ad, il: "Türkiye", kategori: "teknik servis", markalar: ["Arçelik", "Bosch", "Daikin", "Vaillant"] }));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {ilSema.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sss) }} />

      <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", fontSize: 13, color: "#6B7280", display: "flex", gap: 8 }}>
          <Link href="/" style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>Ana Sayfa</Link>
          <span>›</span>
          <span style={{ color: "#111827", fontWeight: 600 }}>{il.ad}</span>
        </div>
      </div>

      <section style={{ background: "linear-gradient(135deg, #1A56DB 0%, #1E40AF 100%)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>{basliklar.h1}</h1>
          <p style={{ color: "#BFDBFE", fontSize: 16, maxWidth: 680, lineHeight: 1.7 }}>{basliklar.aciklama}</p>
          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 600 }}>📍 {il.ilceler.length} İlçe</span>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 600 }}>🔧 {kategoriler.length} Servis Kategorisi</span>
          </div>
        </div>
      </section>

      <AdSenseBanner tip="il_ilce" />

      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 8 }}>{basliklar.h2_ilceler}</h2>
          <p style={{ color: "#6B7280", fontSize: 15, marginBottom: 24 }}>{il.ad} iline ait {il.ilceler.length} ilçede teknik servis arayabilirsiniz.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {il.ilceler.map(ilce => (
              <Link key={ilce.slug} href={`/${params.il}/${ilce.slug}`}
                title={`${ilce.ad} ${il.ad} Teknik Servis`}
                style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "14px 16px", textDecoration: "none", display: "block" }}>
                <div style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>{ilce.ad}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 3 }}>{il.ad} teknik servis →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 16 }}>{basliklar.h2_kategoriler}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
            {kategoriler.map(k => (
              <div key={k.slug} style={{ background: "#F8FAFF", borderRadius: 12, padding: "20px", border: "1px solid #EBF5FF" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{k.icon}</div>
                <h3 style={{ fontWeight: 700, color: "#111827", fontSize: 15, marginBottom: 10 }}>{il.ad} {k.ad}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {il.ilceler.slice(0, 4).map(ilce => (
                    <Link key={ilce.slug} href={`/${params.il}/${ilce.slug}/${k.slug}`}
                      title={`${ilce.ad} ${k.ad}`}
                      style={{ fontSize: 11, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, padding: "3px 8px", textDecoration: "none", color: "#1A56DB", fontWeight: 600 }}>
                      {ilce.ad}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", background: "#F9FAFB", borderRadius: 14, padding: "36px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 20 }}>{il.ad} Teknik Servis Hakkında</h2>
          <p style={{ color: "#374151", lineHeight: 1.9, fontSize: 15 }}>
            <strong>{il.ad} klima servisi</strong>, <strong>{il.ad} kombi servisi</strong>, <strong>{il.ad} buzdolabı tamiri</strong>, <strong>{il.ad} çamaşır makinesi servisi</strong> ve <strong>{il.ad} bulaşık makinesi servisi</strong> için Türkiye&apos;nin en kapsamlı rehberini sunuyoruz. {il.ilceler.length} ilçesiyle geniş bir coğrafyayı kapsayan {il.ad}&apos;de Bosch, Arçelik, Daikin, Vaillant gibi markaların hem yetkili hem özel servis noktalarını bulabilirsiniz.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 20 }}>{basliklar.h2_sss}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {kategoriSSS({ ilce: il.ad, il: "Türkiye", kategori: "teknik servis", markalar: ["Arçelik", "Bosch", "Daikin", "Vaillant"] }).map((s, i) => (
              <details key={i} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "16px 20px" }}>
                <summary style={{ fontWeight: 700, color: "#111827", fontSize: 15, cursor: "pointer" }}>{s.soru}</summary>
                <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>{s.cevap}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <AdSenseBanner tip="il_ilce" />
    </div>
  );
}
