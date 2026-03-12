import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { iller, kategoriler } from "@/data/turkiye";
import { generateTitle, generateDescription, breadcrumbSchema, ilceSchema, faqSchema, kategoriSSS, sayfaBasliklari, SITE_URL } from "@/lib/seo";
import { AdSenseBanner } from "@/components/ui/AdSense";

export const dynamic = "force-dynamic";

interface Props { params: { il: string; ilce: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const il = iller[params.il];
  const ilce = il?.ilceler.find(i => i.slug === params.ilce);
  if (!il || !ilce) return {};
  return {
    title: generateTitle({ tip: "ilce", il: il.ad, ilce: ilce.ad }),
    description: generateDescription({ tip: "ilce", il: il.ad, ilce: ilce.ad }),
    alternates: { canonical: `${SITE_URL}/${params.il}/${params.ilce}` },
    openGraph: { title: generateTitle({ tip: "ilce", il: il.ad, ilce: ilce.ad }), description: generateDescription({ tip: "ilce", il: il.ad, ilce: ilce.ad }), url: `${SITE_URL}/${params.il}/${params.ilce}`, locale: "tr_TR", type: "website" }
  };
}

export default function IlceSayfasi({ params }: Props) {
  const il = iller[params.il];
  const ilce = il?.ilceler.find(i => i.slug === params.ilce);
  if (!il || !ilce) notFound();

  const basliklar = sayfaBasliklari({ tip: "ilce", il: il.ad, ilce: ilce.ad })!;
  const breadcrumb = breadcrumbSchema([{ ad: "Ana Sayfa", url: "/" }, { ad: il.ad, url: `/${params.il}` }, { ad: ilce.ad, url: `/${params.il}/${params.ilce}` }]);
  const ilceSema = ilceSchema({ il: il.ad, ilSlug: params.il, ilce: ilce.ad, ilceSlug: params.ilce, lat: ilce.lat, lng: ilce.lng });
  const sss = faqSchema(kategoriSSS({ ilce: ilce.ad, il: il.ad, kategori: "teknik servis", markalar: ["Arçelik", "Bosch", "Daikin", "Vaillant"] }));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {ilceSema.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sss) }} />

      <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", fontSize: 13, color: "#6B7280", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>Ana Sayfa</Link>
          <span>›</span>
          <Link href={`/${params.il}`} style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>{il.ad}</Link>
          <span>›</span>
          <span style={{ color: "#111827", fontWeight: 600 }}>{ilce.ad}</span>
        </div>
      </div>

      <section style={{ background: "linear-gradient(135deg, #1A56DB 0%, #1E40AF 100%)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>{basliklar.h1}</h1>
          <p style={{ color: "#BFDBFE", fontSize: 16, lineHeight: 1.7 }}>{basliklar.aciklama}</p>
        </div>
      </section>

      <AdSenseBanner tip="il_ilce" />

      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 8 }}>{basliklar.h2_kategoriler}</h2>
          <p style={{ color: "#6B7280", fontSize: 15, marginBottom: 24 }}>{ilce.ad} {il.ad} ilçesinde aradığınız teknik servis kategorisini seçin.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {kategoriler.map(k => (
              <Link key={k.slug} href={`/${params.il}/${params.ilce}/${k.slug}`}
                title={`${ilce.ad} ${k.ad} ${il.ad}`}
                style={{ background: "#fff", border: "2px solid #EBF5FF", borderRadius: 12, padding: "24px 20px", textDecoration: "none", display: "block" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{k.icon}</div>
                <h3 style={{ fontWeight: 800, color: "#111827", fontSize: 16, marginBottom: 6 }}>{ilce.ad} {k.ad}</h3>
                <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>{k.marka_listesi.slice(0, 3).join(", ")} ve daha fazlası</p>
                <div style={{ fontSize: 13, color: "#1A56DB", fontWeight: 700 }}>{ilce.ad} {k.ad} Servisleri →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", background: "#F9FAFB", borderRadius: 14, padding: "36px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16 }}>{ilce.ad} {il.ad} Teknik Servis Rehberi</h2>
          <p style={{ color: "#374151", lineHeight: 1.9, fontSize: 15 }}>
            <strong>{ilce.ad} klima servisi</strong>, <strong>{ilce.ad} kombi servisi</strong>, <strong>{ilce.ad} buzdolabı tamiri</strong>, <strong>{ilce.ad} çamaşır makinesi servisi</strong> ve <strong>{ilce.ad} bulaşık makinesi servisi</strong> için doğru adrestesiniz. {il.ad} iline bağlı {ilce.ad} ilçesinde hem yetkili hem özel servis noktalarını bulabilirsiniz.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 20 }}>{basliklar.h2_sss}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {kategoriSSS({ ilce: ilce.ad, il: il.ad, kategori: "teknik servis", markalar: ["Arçelik", "Bosch", "Daikin", "Vaillant"] }).map((s, i) => (
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
