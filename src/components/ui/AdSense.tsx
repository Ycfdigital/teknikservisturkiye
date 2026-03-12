"use client";
import { useEffect } from "react";

interface AdSenseProps {
  slot: string;
  publisherId: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  style?: React.CSSProperties;
}

// Admin panelinden çekilen ayarlar (gerçek projede Supabase'den gelir)
export const ADSENSE_CONFIG = {
  publisher_id: process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "",
  slots: {
    ana_sayfa: process.env.NEXT_PUBLIC_ADSENSE_ANA_SAYFA || "",
    il_ilce: process.env.NEXT_PUBLIC_ADSENSE_IL_ILCE || "",
    kategori: process.env.NEXT_PUBLIC_ADSENSE_KATEGORI || "",
    premium_usta: process.env.NEXT_PUBLIC_ADSENSE_PREMIUM || "",
    marka: process.env.NEXT_PUBLIC_ADSENSE_MARKA || "",
    arama_sonuclari: process.env.NEXT_PUBLIC_ADSENSE_ARAMA || "",
  }
};

export default function AdSense({ slot, publisherId, format = "auto", style }: AdSenseProps) {
  useEffect(() => {
    if (!slot || !publisherId) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [slot, publisherId]);

  if (!slot || !publisherId) return null;

  return (
    <div style={{ textAlign: "center", overflow: "hidden", ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`ca-pub-${publisherId}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Sayfa tiplerine göre hazır bileşenler
export function AdSenseBanner({ tip }: { tip: keyof typeof ADSENSE_CONFIG.slots }) {
  const slot = ADSENSE_CONFIG.slots[tip];
  const pub = ADSENSE_CONFIG.publisher_id;
  if (!slot || !pub) return null;

  return (
    <div style={{ margin: "24px 0", padding: "0 24px" }}>
      <AdSense slot={slot} publisherId={pub} format="horizontal" />
    </div>
  );
}
