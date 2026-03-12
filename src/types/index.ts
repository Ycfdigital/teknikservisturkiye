export interface PremiumUsta {
  id: string;
  ad: string;
  slug: string;
  telefon: string;
  whatsapp: string;
  kategori: string[];
  markalar: string[];
  bolgeler: { il: string; ilSlug: string; ilce: string; ilceSlug: string }[];
  hakkinda: string;
  foto_url?: string;
  aktif: boolean;
  durum: "beklemede" | "onaylandi" | "reddedildi";
  cta_aktif: boolean;
  ads_conversion_label?: string;
  olusturma_tarihi: string;
}

export interface Isletme {
  id: string;
  ad: string;
  slug: string;
  adres: string;
  telefon?: string;
  whatsapp?: string;
  website?: string;
  il: string;
  ilSlug: string;
  ilce: string;
  ilceSlug: string;
  kategori: string;
  kategoriSlug: string;
  yetkili: boolean;
  lat?: number;
  lng?: number;
  sikayet_sayisi: number;
  cta_aktif: boolean;
  aktif: boolean;
}

export interface SiteAyarlari {
  gtm_id: string;
  ga4_id: string;
  adsense_publisher_id: string;
  adsense_slots: {
    ana_sayfa: string;
    il_ilce: string;
    kategori: string;
    premium_usta: string;
    marka: string;
    arama_sonuclari: string;
  };
}

export interface BasvuruFormu {
  ad_soyad: string;
  telefon: string;
  whatsapp: string;
  kategori: string[];
  markalar: string[];
  bolgeler: { il: string; ilce: string }[];
  hakkinda: string;
}
