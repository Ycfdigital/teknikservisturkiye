export const SITE_URL = "https://teknikservisturkiye.com";
export const SITE_ADI = "TeknikServisTürkiye";
export const YIL = "2026";

// ─── TITLE ──────────────────────────────────────────────────────────────────
// Kural: URL'deki kelimelerin tamamı title'da geçmeli.
// Örn: /izmir/tire/klima-servisi → "Tire Klima Servisi İzmir | 2026 | TeknikServisTürkiye"
// İlce önce → il sonra → yıl → site adı
export function generateTitle(params: {
  tip: "ana" | "il" | "ilce" | "kategori" | "usta" | "haberler" | "basvuru" | "hakkimizda" | "iletisim";
  il?: string;
  ilce?: string;
  kategori?: string;
  marka?: string;
  ustaAd?: string;
}): string {
  const { tip, il, ilce, kategori, marka, ustaAd } = params;
  switch (tip) {
    // Ana sayfa: genel, marka adı + slogan
    case "ana":
      return `Türkiye Teknik Servis Rehberi ${YIL} | Klima, Kombi, Beyaz Eşya | ${SITE_ADI}`;

    // İl: /izmir → "İzmir Teknik Servis 2026 | Klima Kombi Beyaz Eşya Servisi"
    case "il":
      return `${il} Teknik Servis ${YIL} | Klima, Kombi, Beyaz Eşya Servisi | ${SITE_ADI}`;

    // İlçe: /izmir/tire → "Tire İzmir Teknik Servis 2026 | Klima Kombi Beyaz Eşya"
    case "ilce":
      return `${ilce} ${il} Teknik Servis ${YIL} | Klima, Kombi, Beyaz Eşya Servisi | ${SITE_ADI}`;

    // Kategori: /izmir/tire/klima-servisi → "Tire Klima Servisi İzmir 2026"
    // Marka ile: "Tire Daikin Klima Servisi İzmir 2026"
    case "kategori":
      if (marka) return `${ilce} ${marka} ${kategori} ${il} ${YIL} | ${SITE_ADI}`;
      return `${ilce} ${kategori} ${il} ${YIL} | ${SITE_ADI}`;

    // Usta: /izmir/tire/klima-servisi/ahmet-usta → "Ahmet Usta | Tire Klima Servisi İzmir 2026"
    case "usta":
      return `${ustaAd} | ${ilce} ${kategori} ${il} ${YIL} | ${SITE_ADI}`;

    case "haberler":
      return `Teknik Servis Haberleri ${YIL} | ${SITE_ADI}`;
    case "basvuru":
      return `Premium Usta Başvurusu | ${SITE_ADI}`;
    case "hakkimizda":
      return `Hakkımızda | YCF Digital | ${SITE_ADI}`;
    case "iletisim":
      return `İletişim | ${SITE_ADI}`;
    default:
      return SITE_ADI;
  }
}

// ─── META DESCRIPTION ───────────────────────────────────────────────────────
// Kural: İlçe + İl + Kategori kelimeleri doğal cümle içinde geçmeli.
// Max 155 karakter. CTA içermeli.
export function generateDescription(params: {
  tip: "ana" | "il" | "ilce" | "kategori" | "usta";
  il?: string;
  ilce?: string;
  kategori?: string;
  marka?: string;
  ustaAd?: string;
  ustaMarkalar?: string[];
}): string {
  const { tip, il, ilce, kategori, marka, ustaAd, ustaMarkalar } = params;
  switch (tip) {
    case "ana":
      return `Türkiye genelinde klima servisi, kombi servisi, buzdolabı, çamaşır ve bulaşık makinesi tamiri. Yetkili ve özel servis noktaları. Hemen bul, hemen ara.`;

    // İl: il adı + tüm kategoriler + anahtar kelimeler
    case "il":
      return `${il} klima servisi, kombi servisi, buzdolabı tamiri, çamaşır makinesi ve bulaşık makinesi servisi. ${il} genelinde yetkili ve özel teknik servis noktaları ${YIL}.`;

    // İlçe: ilçe + il + kategoriler
    case "ilce":
      return `${ilce} ${il} teknik servis rehberi ${YIL}. Klima servisi, kombi servisi, buzdolabı tamiri, çamaşır ve bulaşık makinesi servisi. Hemen ara.`;

    // Kategori: ilçe + il + kategori + marka (varsa)
    case "kategori":
      if (marka)
        return `${ilce} ${marka} ${kategori} ${YIL}. ${il} ilinde ${marka} yetkili ve özel servis noktaları. Hızlı çözüm için hemen iletişime geçin.`;
      return `${ilce} ${kategori} ${YIL}. ${il} ilinde yetkili ve özel servis noktaları. Arızanızı hızla çözün, hemen arayın.`;

    // Usta: usta adı + ilçe + il + kategori + markalar
    case "usta":
      const markalarStr = ustaMarkalar?.slice(0, 3).join(", ") || "";
      return `${ustaAd}, ${ilce} ${il} bölgesinde ${kategori} hizmeti vermektedir. ${markalarStr} uzmanı. Hemen arayın veya WhatsApp'tan yazın.`;

    default:
      return `${SITE_ADI} — Türkiye Geneli Teknik Servis Rehberi ${YIL}`;
  }
}

// ─── JSON-LD ŞEMALAR ─────────────────────────────────────────────────────────

// Ana sayfa - Organization + WebSite (site geneli)
export function organizationSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": SITE_ADI,
      "alternateName": "Teknik Servis Türkiye",
      "description": "Türkiye Geneli Teknik Servis Rehberi",
      "slogan": "Aradığın Teknik Servisi Hemen Bul.",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`,
        "width": 200,
        "height": 60
      },
      "founder": {
        "@type": "Person",
        "name": "Mansur Sarı"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Yeşilova Mah. 4174/5 Sok. No:1",
        "addressLocality": "Bornova",
        "addressRegion": "İzmir",
        "postalCode": "35040",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "38.4600",
        "longitude": "27.2197"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Türkiye",
        "sameAs": "https://www.wikidata.org/wiki/Q43"
      },
      "sameAs": ["https://ycfdigital.com"]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": SITE_ADI,
      "description": "Türkiye Geneli Teknik Servis Rehberi",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}/arama?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "tr-TR"
    }
  ];
}

// İl sayfası şeması - City + Service
export function ilSchema(params: {
  il: string; ilSlug: string;
  lat: number; lng: number;
  ilceler: { ad: string; slug: string }[];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "City",
      "@id": `${SITE_URL}/${params.ilSlug}/#city`,
      "name": params.il,
      "url": `${SITE_URL}/${params.ilSlug}`,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": params.lat,
        "longitude": params.lng
      },
      "containsPlace": params.ilceler.map(i => ({
        "@type": "City",
        "name": i.ad,
        "url": `${SITE_URL}/${params.ilSlug}/${i.slug}`
      })),
      "containedInPlace": {
        "@type": "Country",
        "name": "Türkiye"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${params.il} Teknik Servis`,
      "description": `${params.il} ilinde buzdolabı, çamaşır makinesi, bulaşık makinesi, klima ve kombi servisi`,
      "provider": { "@id": `${SITE_URL}/#organization` },
      "areaServed": {
        "@type": "City",
        "name": params.il
      },
      "serviceType": ["Buzdolabı Servisi", "Çamaşır Makinesi Servisi", "Bulaşık Makinesi Servisi", "Klima Servisi", "Kombi Servisi"],
      "url": `${SITE_URL}/${params.ilSlug}`
    }
  ];
}

// İlçe sayfası şeması - City + Service
export function ilceSchema(params: {
  il: string; ilSlug: string;
  ilce: string; ilceSlug: string;
  lat: number; lng: number;
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "City",
      "@id": `${SITE_URL}/${params.ilSlug}/${params.ilceSlug}/#city`,
      "name": params.ilce,
      "url": `${SITE_URL}/${params.ilSlug}/${params.ilceSlug}`,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": params.lat,
        "longitude": params.lng
      },
      "containedInPlace": {
        "@type": "City",
        "name": params.il,
        "url": `${SITE_URL}/${params.ilSlug}`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${params.ilce} ${params.il} Teknik Servis`,
      "description": `${params.ilce} ${params.il} ilçesinde klima servisi, kombi servisi, buzdolabı, çamaşır ve bulaşık makinesi tamiri`,
      "provider": { "@id": `${SITE_URL}/#organization` },
      "areaServed": {
        "@type": "City",
        "name": params.ilce,
        "containedIn": params.il
      },
      "serviceType": ["Buzdolabı Servisi", "Çamaşır Makinesi Servisi", "Bulaşık Makinesi Servisi", "Klima Servisi", "Kombi Servisi"],
      "url": `${SITE_URL}/${params.ilSlug}/${params.ilceSlug}`
    }
  ];
}

// Kategori sayfası şeması - Service + ItemList
export function kategoriSchema(params: {
  il: string; ilSlug: string;
  ilce: string; ilceSlug: string;
  kategori: string; kategoriSlug: string;
  lat: number; lng: number;
  isletmeler?: { ad: string; slug: string; adres?: string; telefon?: string; yetkili: boolean }[];
}) {
  const url = `${SITE_URL}/${params.ilSlug}/${params.ilceSlug}/${params.kategoriSlug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}/#service`,
      "name": `${params.ilce} ${params.kategori}`,
      "description": `${params.ilce} ${params.il} ilçesinde ${params.kategori}. Yetkili ve özel servis noktaları.`,
      "provider": { "@id": `${SITE_URL}/#organization` },
      "areaServed": {
        "@type": "City",
        "name": params.ilce,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": params.lat,
          "longitude": params.lng
        }
      },
      "serviceType": params.kategori,
      "url": url
    },
    // ItemList — sayfadaki işletmeleri listele
    ...(params.isletmeler && params.isletmeler.length > 0 ? [{
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `${params.ilce} ${params.kategori} Listesi`,
      "description": `${params.ilce} ${params.il} bölgesindeki ${params.kategori} noktaları`,
      "url": url,
      "numberOfItems": params.isletmeler.length,
      "itemListElement": params.isletmeler.map((isletme, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "LocalBusiness",
          "name": isletme.ad,
          "url": `${url}/${isletme.slug}`,
          ...(isletme.adres && { "address": isletme.adres }),
          ...(isletme.telefon && { "telephone": isletme.telefon }),
          "areaServed": params.ilce
        }
      }))
    }] : [])
  ];
}

// Premium usta sayfası şeması - LocalBusiness + Person
export function ustaSchema(params: {
  ad: string; slug: string;
  telefon?: string; whatsapp?: string;
  il: string; ilSlug: string;
  ilce: string; ilceSlug: string;
  kategori: string; kategoriSlug: string;
  markalar: string[];
  lat: number; lng: number;
  hakkinda?: string;
}) {
  const url = `${SITE_URL}/${params.ilSlug}/${params.ilceSlug}/${params.kategoriSlug}/${params.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${url}/#localbusiness`,
      "name": `${params.ad} — ${params.ilce} ${params.kategori}`,
      "description": params.hakkinda || `${params.ad}, ${params.ilce} ${params.il} bölgesinde ${params.kategori} hizmeti vermektedir.`,
      "url": url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": params.ilce,
        "addressRegion": params.il,
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": params.lat,
        "longitude": params.lng
      },
      ...(params.telefon && { "telephone": params.telefon }),
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "serviceType": params.kategori,
      "areaServed": params.ilce,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${params.kategori} Hizmetleri`,
        "itemListElement": params.markalar.map(m => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `${m} ${params.kategori}`
          }
        }))
      },
      "brand": params.markalar.map(m => ({
        "@type": "Brand",
        "name": m
      })),
      "parentOrganization": { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": params.ad,
      "jobTitle": params.kategori,
      "worksFor": { "@id": `${url}/#localbusiness` },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": params.ilce,
        "addressRegion": params.il,
        "addressCountry": "TR"
      },
      ...(params.telefon && { "telephone": params.telefon })
    }
  ];
}

// ─── BREADCRUMBs ────────────────────────────────────────────────────────────
export function breadcrumbSchema(items: { ad: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.ad,
      "item": `${SITE_URL}${item.url}`
    }))
  };
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
export function faqSchema(sorular: { soru: string; cevap: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sorular.map(s => ({
      "@type": "Question",
      "name": s.soru,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": s.cevap
      }
    }))
  };
}

// Kategori sayfası için dinamik FAQ üretici
export function kategoriSSS(params: {
  ilce: string; il: string; kategori: string; markalar: string[]
}): { soru: string; cevap: string }[] {
  const { ilce, il, kategori, markalar } = params;
  const markalarStr = markalar.slice(0, 4).join(", ");
  return [
    {
      soru: `${ilce}'de ${kategori} için nereyi aramalıyım?`,
      cevap: `${ilce} ${il} bölgesinde ${kategori} için sayfamızdaki yetkili ve özel servis noktalarından birine ulaşabilirsiniz. Premium ustalarımız doğrudan iletişim için mevcuttur.`
    },
    {
      soru: `${ilce} ${kategori} fiyatları ne kadar?`,
      cevap: `${ilce}'de ${kategori} fiyatları arıza türüne, cihaz markasına ve servisin yetkili olup olmamasına göre değişmektedir. Kesin fiyat için listemizdeki servislerle iletişime geçin.`
    },
    {
      soru: `${ilce}'de hangi markalar için ${kategori} var?`,
      cevap: `${ilce} ${il}'de ${markalarStr} ve daha birçok marka için ${kategori} bulmak mümkündür. Sayfamızdaki filtreyi kullanarak aradığınız markayı hızlıca bulabilirsiniz.`
    },
    {
      soru: `${ilce}'de yetkili ${kategori} ile özel servis arasındaki fark nedir?`,
      cevap: `Yetkili servisler ilgili markanın resmi servis ağına dahil olup orijinal yedek parça kullanır. Özel servisler ise bağımsız teknik servis sağlayıcılarıdır. Her iki seçenek de sayfamızda ayrı rozetlerle belirtilmektedir.`
    },
    {
      soru: `${ilce} ${il} dışında da hizmet veren usta var mı?`,
      cevap: `Evet, bazı premium ustalarımız birden fazla ilçe ve ile hizmet vermektedir. Usta profil sayfasında "Çalıştığı Bölgeler" bölümünden hizmet alanlarını görebilirsiniz.`
    }
  ];
}

// ─── YARDIMCI ───────────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Sayfa içi H1/H2 metinleri için tutarlı kalıplar
export function sayfaBasliklari(params: {
  tip: "il" | "ilce" | "kategori" | "usta";
  il?: string; ilce?: string; kategori?: string; ustaAd?: string;
}) {
  const { tip, il, ilce, kategori, ustaAd } = params;
  switch (tip) {
    case "il":
      return {
        h1: `${il} Teknik Servis Rehberi ${YIL}`,
        h2_ilceler: `${il} İlçelerinde Teknik Servis`,
        h2_kategoriler: `${il} Servis Kategorileri`,
        h2_sss: `${il} Teknik Servis Hakkında Sık Sorulan Sorular`,
        aciklama: `${il} ilinde buzdolabı tamiri, çamaşır makinesi servisi, bulaşık makinesi onarımı, klima bakım ve montajı ile kombi servisi için yetkili ve özel servis noktaları.`
      };
    case "ilce":
      return {
        h1: `${ilce} ${il} Teknik Servis ${YIL}`,
        h2_kategoriler: `${ilce}'de Teknik Servis Kategorileri`,
        h2_sss: `${ilce} Teknik Servis Sık Sorulan Sorular`,
        aciklama: `${ilce} ${il} ilçesinde klima servisi, kombi servisi, buzdolabı tamiri, çamaşır makinesi ve bulaşık makinesi servisi için yetkili ve özel servis noktaları ${YIL}.`
      };
    case "kategori":
      return {
        h1: `${ilce} ${kategori} ${YIL}`,
        h2_premium: `${ilce}'de Öne Çıkan ${kategori} Ustaları`,
        h2_liste: `${ilce} ${il} ${kategori} Listesi`,
        h2_sss: `${ilce} ${kategori} Sık Sorulan Sorular`,
        aciklama: `${ilce} ${il} bölgesinde ${kategori} için yetkili ve özel servis noktaları. Premium ustalarla doğrudan iletişime geçin.`
      };
    case "usta":
      return {
        h1: `${ustaAd} — ${ilce} ${kategori}`,
        h2_markalar: "Hizmet Verilen Markalar",
        h2_bolgeler: "Çalışılan Bölgeler",
        h2_iletisim: "İletişim"
      };
  }
}
