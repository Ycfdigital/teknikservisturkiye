"use client";
import { useState } from "react";
import Link from "next/link";
import UstaKart from "@/components/ui/UstaKart";
import IsletmeKart from "@/components/ui/IsletmeKart";
import { AdSenseBanner } from "@/components/ui/AdSense";
import type { PremiumUsta, Isletme } from "@/types";

interface Props {
  il: string; ilAd: string;
  ilce: string; ilceAd: string;
  kategori: string; kategoriAd: string;
  kategoriMarkalar?: string[];
  ilLat: number; ilLng: number;
}

const ORNEK_ISLETMELER: Isletme[] = [
  {
    id: "s1", ad: "Tire Bosch Yetkili Servisi", slug: "tire-bosch-yetkili-servisi",
    adres: "Atatürk Cad. No:12, Tire/İzmir", telefon: "0232 511 00 00",
    il: "İzmir", ilSlug: "izmir", ilce: "Tire", ilceSlug: "tire",
    kategori: "Klima Servisi", kategoriSlug: "klima-servisi",
    yetkili: true, lat: 38.0897, lng: 27.7322,
    sikayet_sayisi: 0, cta_aktif: false, aktif: true
  },
  {
    id: "s2", ad: "Özkan Teknik Servis", slug: "ozkan-teknik-servis",
    adres: "Cumhuriyet Mah. Tire/İzmir", telefon: "0232 512 34 56",
    il: "İzmir", ilSlug: "izmir", ilce: "Tire", ilceSlug: "tire",
    kategori: "Klima Servisi", kategoriSlug: "klima-servisi",
    yetkili: false, lat: 38.0910, lng: 27.7350,
    sikayet_sayisi: 0, cta_aktif: true, whatsapp: "05321111111", aktif: true
  },
];

const ORNEK_PREMIUM: PremiumUsta[] = [
  {
    id: "p1", ad: "Ahmet Yılmaz", slug: "ahmet-yilmaz",
    telefon: "05321234567", whatsapp: "05321234567",
    kategori: ["Klima Servisi"], markalar: ["Daikin", "Mitsubishi", "LG"],
    bolgeler: [{ il: "İzmir", ilSlug: "izmir", ilce: "Tire", ilceSlug: "tire" }],
    hakkinda: "10 yıllık deneyim", aktif: true, durum: "onaylandi",
    cta_aktif: true, olusturma_tarihi: "2026-01-01"
  }
];

export default function KategoriSayfasiClient({ il, ilAd, ilce, ilceAd, kategori, kategoriAd, ilLat, ilLng }: Props) {
  const haritaUrl = `https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""}&q=${encodeURIComponent(`${kategoriAd} ${ilceAd} ${ilAd}`)}&center=${ilLat},${ilLng}&zoom=13`;

  return (
    <div>
      <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", fontSize: 13, color: "#6B7280", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>Ana Sayfa</Link>
          <span>›</span>
          <Link href={`/${il}`} style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>{ilAd}</Link>
          <span>›</span>
          <Link href={`/${il}/${ilce}`} style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>{ilceAd}</Link>
          <span>›</span>
          <span style={{ color: "#111827", fontWeight: 600 }}>{kategoriAd}</span>
        </div>
      </div>

      <section style={{ background: "linear-gradient(135deg, #1A56DB, #1E40AF)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(20px, 4vw, 38px)", fontWeight: 900, color: "#fff", marginBottom: 10 }}>
            {ilceAd} {kategoriAd} 2026
          </h1>
          <p style={{ color: "#BFDBFE", fontSize: 15 }}>
            {ilAd} / {ilceAd} bölgesinde yetkili ve özel teknik servisler
          </p>
        </div>
      </section>

      <div style={{ background: "#FEF3C7", borderBottom: "1px solid #FDE68A", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", fontSize: 13, color: "#92400E", display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span>⚠️</span>
          <span>Bu sayfada hem yetkili hem özel servisler listelenebilir. <strong>YETKİLİ SERVİS</strong> rozeti olmayan işletmeler bağımsız servis sağlayıcısıdır.</span>
        </div>
      </div>

      <AdSenseBanner tip="kategori" />

      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
        <section style={{ padding: "32px 24px 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 16 }}>📍 Harita</h2>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #E5E7EB", height: 380 }}>
              <iframe src={haritaUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>
      )}

      {ORNEK_PREMIUM.length > 0 && (
        <section style={{ padding: "40px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>⭐ Premium Ustalar</h2>
              <Link href="/basvuru" style={{ background: "#F59E0B", color: "#fff", borderRadius: 8, padding: "8px 16px", textDecoration: "none", fontWeight: 700, fontSize: 13 }}>Siz de Eklenin →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {ORNEK_PREMIUM.map(usta => <UstaKart key={usta.id} usta={usta} />)}
            </div>
          </div>
        </section>
      )}

      <AdSenseBanner tip="kategori" />

      <section style={{ padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 8 }}>
            🔧 {ilceAd} {kategoriAd} Listesi
          </h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 20 }}>{ORNEK_ISLETMELER.length} servis noktası bulundu</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {ORNEK_ISLETMELER.map((isletme, i) => (
              <>
                <IsletmeKart key={isletme.id} isletme={isletme} />
                {(i + 1) % 4 === 0 && (
                  <div key={`ad-${i}`} style={{ gridColumn: "1 / -1" }}>
                    <AdSenseBanner tip="kategori" />
                  </div>
                )}
              </>
            ))}
          </div>
          {ORNEK_PREMIUM.length === 0 && (
            <div style={{ marginTop: 32, background: "#EBF5FF", borderRadius: 14, padding: "28px", textAlign: "center", border: "2px dashed #1A56DB" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>💼</div>
              <h3 style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>Bu bölgede reklam vermek ister misiniz?</h3>
              <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 16 }}>{ilceAd} {kategoriAd} sayfasında premium usta olarak öne çıkın.</p>
              <Link href="/basvuru" style={{ background: "#1A56DB", color: "#fff", borderRadius: 8, padding: "12px 24px", textDecoration: "none", fontWeight: 700 }}>Başvur →</Link>
            </div>
          )}
        </div>
      </section>

      <AdSenseBanner tip="kategori" />
    </div>
  );
}
