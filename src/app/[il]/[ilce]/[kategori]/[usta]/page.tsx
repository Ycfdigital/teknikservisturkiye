import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { iller, kategoriler } from "@/data/turkiye";
import { generateTitle, generateDescription, breadcrumbSchema, ustaSchema, SITE_URL } from "@/lib/seo";
import UstaSayfasi from "@/components/sections/UstaSayfasi";
import type { PremiumUsta } from "@/types";

interface Props { params: { il: string; ilce: string; kategori: string; usta: string } }

async function getUsta(slug: string): Promise<PremiumUsta | null> {
  const ORNEK: PremiumUsta = {
    id: "1", ad: "Ahmet Yılmaz", slug: "ahmet-yilmaz",
    telefon: "05321234567", whatsapp: "05321234567",
    kategori: ["Klima Servisi"], markalar: ["Daikin", "Mitsubishi", "LG"],
    bolgeler: [{ il: "İzmir", ilSlug: "izmir", ilce: "Tire", ilceSlug: "tire" }],
    hakkinda: "10 yıllık tecrübemle Daikin, Mitsubishi ve LG klimaları için hızlı ve güvenilir servis hizmeti sunmaktayım.",
    aktif: true, durum: "onaylandi", cta_aktif: true,
    ads_conversion_label: "XXXXXXXXXXXXXXXX",
    olusturma_tarihi: "2026-01-01"
  };
  return slug === ORNEK.slug ? ORNEK : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const il = iller[params.il];
  const ilce = il?.ilceler.find(i => i.slug === params.ilce);
  const kat = kategoriler.find(k => k.slug === params.kategori);
  const usta = await getUsta(params.usta);
  if (!il || !ilce || !kat || !usta) return {};
  return {
    title: generateTitle({ tip: "usta", il: il.ad, ilce: ilce.ad, kategori: kat.ad, ustaAd: usta.ad }),
    description: generateDescription({ tip: "usta", il: il.ad, ilce: ilce.ad, kategori: kat.ad, ustaAd: usta.ad, ustaMarkalar: usta.markalar }),
    alternates: { canonical: `${SITE_URL}/${params.il}/${params.ilce}/${params.kategori}/${params.usta}` },
    openGraph: { title: generateTitle({ tip: "usta", il: il.ad, ilce: ilce.ad, kategori: kat.ad, ustaAd: usta.ad }), url: `${SITE_URL}/${params.il}/${params.ilce}/${params.kategori}/${params.usta}`, locale: "tr_TR", type: "profile" }
  };
}

export default async function UstaRoute({ params }: Props) {
  const il = iller[params.il];
  const ilce = il?.ilceler.find(i => i.slug === params.ilce);
  const kat = kategoriler.find(k => k.slug === params.kategori);
  const usta = await getUsta(params.usta);
  if (!il || !ilce || !kat || !usta) notFound();

  const breadcrumb = breadcrumbSchema([
    { ad: "Ana Sayfa", url: "/" },
    { ad: il.ad, url: `/${params.il}` },
    { ad: ilce.ad, url: `/${params.il}/${params.ilce}` },
    { ad: `${ilce.ad} ${kat.ad}`, url: `/${params.il}/${params.ilce}/${params.kategori}` },
    { ad: usta.ad, url: `/${params.il}/${params.ilce}/${params.kategori}/${params.usta}` }
  ]);

  const ustaSema = ustaSchema({
    ad: usta.ad, slug: params.usta,
    telefon: usta.cta_aktif ? usta.telefon : undefined,
    whatsapp: usta.cta_aktif ? usta.whatsapp : undefined,
    il: il.ad, ilSlug: params.il,
    ilce: ilce.ad, ilceSlug: params.ilce,
    kategori: kat.ad, kategoriSlug: params.kategori,
    markalar: usta.markalar,
    lat: ilce.lat, lng: ilce.lng,
    hakkinda: usta.hakkinda
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {ustaSema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      {usta.ads_conversion_label && (
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'page_view_usta',conversion_label:'${usta.ads_conversion_label}',usta_id:'${usta.id}'});`
        }} />
      )}
      <UstaSayfasi
        usta={usta}
        il={params.il} ilAd={il.ad}
        ilce={params.ilce} ilceAd={ilce.ad}
        kategori={params.kategori} kategoriAd={kat.ad}
      />
    </>
  );
}
