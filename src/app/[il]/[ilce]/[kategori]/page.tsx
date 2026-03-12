export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { iller, kategoriler } from "@/data/turkiye";
import { generateTitle, generateDescription, breadcrumbSchema, kategoriSchema, faqSchema, kategoriSSS, SITE_URL } from "@/lib/seo";
import KategoriSayfasiClient from "@/components/sections/KategoriSayfasi";

interface Props { params: { il: string; ilce: string; kategori: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const il = iller[params.il];
  const ilce = il?.ilceler.find(i => i.slug === params.ilce);
  const kat = kategoriler.find(k => k.slug === params.kategori);
  if (!il || !ilce || !kat) return {};
  return {
    title: generateTitle({ tip: "kategori", il: il.ad, ilce: ilce.ad, kategori: kat.ad }),
    description: generateDescription({ tip: "kategori", il: il.ad, ilce: ilce.ad, kategori: kat.ad }),
    alternates: { canonical: `${SITE_URL}/${params.il}/${params.ilce}/${params.kategori}` },
    openGraph: { title: generateTitle({ tip: "kategori", il: il.ad, ilce: ilce.ad, kategori: kat.ad }), description: generateDescription({ tip: "kategori", il: il.ad, ilce: ilce.ad, kategori: kat.ad }), url: `${SITE_URL}/${params.il}/${params.ilce}/${params.kategori}`, locale: "tr_TR", type: "website" }
  };
}

export default function KategoriSayfasi({ params }: Props) {
  const il = iller[params.il];
  const ilce = il?.ilceler.find(i => i.slug === params.ilce);
  const kat = kategoriler.find(k => k.slug === params.kategori);
  if (!il || !ilce || !kat) notFound();

  const breadcrumb = breadcrumbSchema([
    { ad: "Ana Sayfa", url: "/" },
    { ad: il.ad, url: `/${params.il}` },
    { ad: ilce.ad, url: `/${params.il}/${params.ilce}` },
    { ad: `${ilce.ad} ${kat.ad}`, url: `/${params.il}/${params.ilce}/${params.kategori}` }
  ]);

  const katSema = kategoriSchema({
    il: il.ad, ilSlug: params.il,
    ilce: ilce.ad, ilceSlug: params.ilce,
    kategori: kat.ad, kategoriSlug: params.kategori,
    lat: ilce.lat, lng: ilce.lng,
    isletmeler: []
  });

  const sss = faqSchema(kategoriSSS({ ilce: ilce.ad, il: il.ad, kategori: kat.ad, markalar: kat.marka_listesi }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {katSema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sss) }} />
      <KategoriSayfasiClient
        il={params.il} ilAd={il.ad}
        ilce={params.ilce} ilceAd={ilce.ad}
        kategori={params.kategori} kategoriAd={kat.ad}
        kategoriMarkalar={kat.marka_listesi}
        ilLat={ilce.lat} ilLng={ilce.lng}
      />
    </>
  );
}
