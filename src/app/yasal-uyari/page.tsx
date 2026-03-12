export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yasal Uyarı | TeknikServisTürkiye",
  robots: { index: false }
};

export default function YasalUyariSayfasi() {
  return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #1A56DB, #1E40AF)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff" }}>Yasal Uyarı & Sorumluluk Reddi</h1>
        </div>
      </section>

      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>

          <div style={{ background: "#FEF3C7", borderRadius: 12, padding: "24px", border: "2px solid #F59E0B" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#92400E", marginBottom: 12 }}>⚠️ Önemli Uyarı</h2>
            <p style={{ color: "#92400E", lineHeight: 1.8, fontSize: 15 }}>
              TeknikServisTürkiye sitesinde listelenen işletmeler, Google Places API ve diğer bağımsız
              kaynaklardan otomatik olarak derlenmektedir. YCF Digital ve TeknikServisTürkiye;
              listelenen işletmelerin yetkili servis statüsünü, hizmet kalitesini veya bilgilerin
              güncelliğini garanti etmez.
            </p>
          </div>

          {[
            {
              baslik: "Yetkili Servis Statüsü",
              icerik: `Sitemizdeki "Yetkili Servis" rozeti, Google Places veya ilgili markanın kamuya açık verilerine dayanmaktadır. Bu rozet, markanın resmi yetkili servis listesinde yer aldığı anlamına gelebilir; ancak kesin teyit için ilgili markanın resmi web sitesi ziyaret edilmelidir.

              Türkiye'de kendisini yetkili servis olarak tanıtıp bu statüde bulunmayan işletmeler hakkında TCK kapsamında "nitelikli dolandırıcılık" davası açılabilmektedir. Bu tür bir durumla karşılaşmanız halinde lütfen bize bildirin ve ilgili tüketici haklarından yararlanın.`
            },
            {
              baslik: "Bilgilerin Doğruluğu",
              icerik: "Sitedeki telefon numaraları, adresler ve diğer iletişim bilgileri otomatik olarak derlenmekte olup değişmiş olabilir. YCF Digital, hatalı veya güncel olmayan bilgilerden kaynaklanan zararlardan sorumlu tutulamaz."
            },
            {
              baslik: "Veri Kaynakları",
              icerik: "Bu sitede sunulan işletme bilgileri; Google Places API, kamuya açık dizinler ve kullanıcı bildirimleri aracılığıyla elde edilmektedir."
            },
            {
              baslik: "Sorumluluk Sınırı",
              icerik: "TeknikServisTürkiye bir rehber platformudur. Herhangi bir işletme ile kullanıcı arasındaki işlemlerden, anlaşmazlıklardan veya zararlardan YCF Digital sorumlu tutulamaz."
            },
            {
              baslik: "Sorun Bildirimi",
              icerik: "Hatalı, kapalı veya yanıltıcı bilgi içerdiğini düşündüğünüz bir işletmeyi 'Sorun Bildir' butonu aracılığıyla bildirebilirsiniz. Bildirimler incelenerek gerekli düzeltmeler yapılacaktır."
            }
          ].map(item => (
            <div key={item.baslik} style={{ background: "#F9FAFB", borderRadius: 12, padding: "24px", border: "1px solid #E5E7EB" }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: "#111827", marginBottom: 12 }}>{item.baslik}</h2>
              <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 14, whiteSpace: "pre-line" }}>{item.icerik}</p>
            </div>
          ))}

          <p style={{ fontSize: 13, color: "#9CA3AF", textAlign: "center" }}>
            Son güncelleme: Ocak 2026 — YCF Digital / TeknikServisTürkiye
          </p>
        </div>
      </section>
    </div>
  );
}
