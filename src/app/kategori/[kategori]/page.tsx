import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { kategoriler, iller } from "@/data/turkiye";
import { generateTitle, generateDescription, breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface Props { params: { kategori: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const kat = kategoriler.find(k => k.slug === params.kategori);
  if (!kat) return {};
  return {
    title: `Türkiye ${kat.ad} Rehberi 2026 | TeknikServisTürkiye`,
    description: `Türkiye genelinde ${kat.ad} için yetkili ve özel servis noktaları. İlinizi seçin, hemen ulaşın.`,
    alternates: { canonical: `${SITE_URL}/kategori/${params.kategori}` }
  };
}

export default function KategoriGenelSayfasi({ params }: Props) {
  const kat = kategoriler.find(k => k.slug === params.kategori);
  if (!kat) notFound();

  const breadcrumb = breadcrumbSchema([
    { ad: "Ana Sayfa", url: "/" },
    { ad: kat.ad, url: `/kategori/${params.kategori}` }
  ]);

  // Popüler iller (büyük şehirler önce)
  const populerIller = ["istanbul", "ankara", "izmir", "bursa", "antalya", "adana", "konya", "gaziantep"];
  const siraliIller = [
    ...populerIller.map(s => ({ slug: s, ...iller[s] })).filter(i => i.ad),
    ...Object.entries(iller).filter(([s]) => !populerIller.includes(s)).map(([slug, il]) => ({ slug, ...il }))
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Breadcrumb */}
      <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", fontSize: 13, color: "#6B7280", display: "flex", gap: 8 }}>
          <Link href="/" style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>Ana Sayfa</Link>
          <span>›</span>
          <span style={{ color: "#111827", fontWeight: 600 }}>{kat.ad}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1A56DB 0%, #1E40AF 100%)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{kat.icon}</div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
            Türkiye {kat.ad} Rehberi 2026
          </h1>
          <p style={{ color: "#BFDBFE", fontSize: 16, maxWidth: 600, lineHeight: 1.7 }}>
            Türkiye genelinde {kat.ad} için yetkili ve özel servis noktaları. İlinizi seçin, hemen ulaşın.
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {kat.marka_listesi.slice(0, 6).map(m => (
              <span key={m} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* İl Listesi */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 8 }}>
            İlinizi Seçin
          </h2>
          <p style={{ color: "#6B7280", fontSize: 15, marginBottom: 28 }}>
            {Object.keys(iller).length} ilde {kat.ad} servisi bulabilirsiniz.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
            {siraliIller.map(il => (
              <Link key={il.slug} href={`/${il.slug}/${il.ilceler[0]?.slug || "merkez"}/${params.kategori}`}
                title={`${il.ad} ${kat.ad}`}
                style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "14px 16px", textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>{il.ad}</div>
                  <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{il.ilceler.length} ilçe</div>
                </div>
                <span style={{ color: "#1A56DB", fontSize: 16 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popüler İlçeler */}
      <section style={{ padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", background: "#F9FAFB", borderRadius: 14, padding: "36px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 20 }}>
            Popüler {kat.ad} Aramaları
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {populerIller.flatMap(ilSlug => {
              const il = iller[ilSlug];
              if (!il) return [];
              return il.ilceler.slice(0, 2).map(ilce => (
                <Link key={`${ilSlug}-${ilce.slug}`}
                  href={`/${ilSlug}/${ilce.slug}/${params.kategori}`}
                  title={`${ilce.ad} ${kat.ad}`}
                  style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 14px", textDecoration: "none", color: "#1A56DB", fontWeight: 600, fontSize: 13 }}>
                  {ilce.ad} {kat.ad}
                </Link>
              ));
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
