export const iller: Record<string, { ad: string; slug: string; lat: number; lng: number; ilceler: { ad: string; slug: string; lat: number; lng: number }[] }> = {
  izmir: {
    ad: "İzmir", slug: "izmir", lat: 38.4192, lng: 27.1287,
    ilceler: [
      { ad: "Tire", slug: "tire", lat: 38.0897, lng: 27.7322 },
      { ad: "Bornova", slug: "bornova", lat: 38.4600, lng: 27.2197 },
      { ad: "Karşıyaka", slug: "karsiyaka", lat: 38.4597, lng: 27.1139 },
      { ad: "Konak", slug: "konak", lat: 38.4127, lng: 27.1384 },
      { ad: "Buca", slug: "buca", lat: 38.3822, lng: 27.1800 },
      { ad: "Kemalpaşa", slug: "kemalpasa", lat: 38.4297, lng: 27.4208 },
      { ad: "Torbalı", slug: "torbali", lat: 38.1597, lng: 27.3594 },
      { ad: "Ödemiş", slug: "odemis", lat: 38.2297, lng: 27.9761 },
      { ad: "Menderes", slug: "menderes", lat: 38.2597, lng: 27.1394 },
      { ad: "Aliağa", slug: "aliaga", lat: 38.8000, lng: 26.9736 },
    ]
  },
  istanbul: {
    ad: "İstanbul", slug: "istanbul", lat: 41.0082, lng: 28.9784,
    ilceler: [
      { ad: "Kadıköy", slug: "kadikoy", lat: 40.9927, lng: 29.0277 },
      { ad: "Beşiktaş", slug: "besiktas", lat: 41.0422, lng: 29.0083 },
      { ad: "Üsküdar", slug: "uskudar", lat: 41.0231, lng: 29.0150 },
      { ad: "Fatih", slug: "fatih", lat: 41.0186, lng: 28.9397 },
      { ad: "Beyoğlu", slug: "beyoglu", lat: 41.0333, lng: 28.9833 },
      { ad: "Şişli", slug: "sisli", lat: 41.0603, lng: 28.9872 },
      { ad: "Maltepe", slug: "maltepe", lat: 40.9350, lng: 29.1303 },
      { ad: "Pendik", slug: "pendik", lat: 40.8764, lng: 29.2322 },
    ]
  },
  ankara: {
    ad: "Ankara", slug: "ankara", lat: 39.9334, lng: 32.8597,
    ilceler: [
      { ad: "Çankaya", slug: "cankaya", lat: 39.9072, lng: 32.8597 },
      { ad: "Keçiören", slug: "kecioren", lat: 39.9897, lng: 32.8597 },
      { ad: "Mamak", slug: "mamak", lat: 39.9400, lng: 32.9200 },
      { ad: "Yenimahalle", slug: "yenimahalle", lat: 39.9672, lng: 32.7931 },
      { ad: "Etimesgut", slug: "etimesgut", lat: 39.9547, lng: 32.6931 },
    ]
  },
  bursa: {
    ad: "Bursa", slug: "bursa", lat: 40.1885, lng: 29.0610,
    ilceler: [
      { ad: "Osmangazi", slug: "osmangazi", lat: 40.1972, lng: 29.0722 },
      { ad: "Nilüfer", slug: "nilufer", lat: 40.2197, lng: 28.9722 },
      { ad: "Yıldırım", slug: "yildirim", lat: 40.1897, lng: 29.1222 },
      { ad: "İnegöl", slug: "inegol", lat: 40.0797, lng: 29.5122 },
    ]
  },
  antalya: {
    ad: "Antalya", slug: "antalya", lat: 36.8969, lng: 30.7133,
    ilceler: [
      { ad: "Muratpaşa", slug: "muratpasa", lat: 36.8897, lng: 30.7122 },
      { ad: "Konyaaltı", slug: "konyaalti", lat: 36.8697, lng: 30.6422 },
      { ad: "Kepez", slug: "kepez", lat: 36.9397, lng: 30.7322 },
      { ad: "Alanya", slug: "alanya", lat: 36.5433, lng: 31.9997 },
    ]
  }
};

export const kategoriler = [
  { ad: "Buzdolabı Servisi", slug: "buzdolabi-servisi", icon: "❄️", marka_listesi: ["Arçelik", "Bosch", "Beko", "Vestel", "LG", "Samsung", "Siemens", "Altus", "Profilo", "Liebherr"] },
  { ad: "Çamaşır Makinesi Servisi", slug: "camasir-makinesi-servisi", icon: "🌀", marka_listesi: ["Arçelik", "Bosch", "Beko", "Vestel", "LG", "Samsung", "Siemens", "Altus", "Profilo", "Miele"] },
  { ad: "Bulaşık Makinesi Servisi", slug: "bulasik-makinesi-servisi", icon: "🍽️", marka_listesi: ["Arçelik", "Bosch", "Beko", "Vestel", "LG", "Samsung", "Siemens", "Altus", "Profilo", "Miele"] },
  { ad: "Klima Servisi", slug: "klima-servisi", icon: "❄️", marka_listesi: ["Daikin", "Mitsubishi", "LG", "Samsung", "Arçelik", "Bosch", "Vestel", "Fujitsu", "Toshiba", "Carrier"] },
  { ad: "Kombi Servisi", slug: "kombi-servisi", icon: "🔥", marka_listesi: ["Vaillant", "Bosch", "Baymak", "Demirdöküm", "Buderus", "Ferroli", "Ariston", "Junkers", "Viessmann", "Protherm"] },
];

export const markalar = [
  "Arçelik", "Bosch", "Beko", "Vestel", "LG", "Samsung",
  "Siemens", "Altus", "Profilo", "Miele", "Liebherr",
  "Daikin", "Mitsubishi", "Fujitsu", "Toshiba", "Carrier",
  "Vaillant", "Baymak", "Demirdöküm", "Buderus", "Ferroli",
  "Ariston", "Junkers", "Viessmann", "Protherm"
];
