import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | YCF Digital | TeknikServisTürkiye",
  description: "TeknikServisTürkiye, YCF Digital tarafından geliştirilmiş Türkiye geneli teknik servis rehberidir.",
};

export default function HakkimizdaSayfasi() {
  return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #1A56DB, #1E40AF)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
            Hakkımızda
          </h1>
          <p style={{ color: "#BFDBFE", fontSize: 16 }}>TeknikServisTürkiye & YCF Digital</p>
        </div>
      </section>

      <section style={{ padding: "56px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 16 }}>
                TeknikServisTürkiye
              </h2>
              <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 15 }}>
                TeknikServisTürkiye, Türkiye genelinde teknik servis ihtiyacı duyan kullanıcıları
                güvenilir servis sağlayıcılarıyla buluşturmak amacıyla kurulmuştur.
              </p>
              <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 15, marginTop: 14 }}>
                Buzdolabı, çamaşır makinesi, bulaşık makinesi, klima ve kombi servisi için
                Türkiye&apos;nin her ilinden yetkili ve özel servis noktalarını bir araya getiriyoruz.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 16 }}>
                YCF Digital
              </h2>
              <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 15 }}>
                TeknikServisTürkiye, <a href="https://ycfdigital.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#1A56DB", fontWeight: 700 }}>YCF Digital</a> tarafından
                geliştirilmekte ve yönetilmektedir.
              </p>
              <div style={{ marginTop: 20, padding: "16px", background: "#F9FAFB", borderRadius: 10, border: "1px solid #E5E7EB" }}>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, margin: 0 }}>
                  📍 Yeşilova Mah. 4174/5 Sok. No:1<br />
                  Bornova / İzmir<br />
                  🌐 <a href="https://ycfdigital.com" style={{ color: "#1A56DB" }}>ycfdigital.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Misyon */}
          <div style={{ background: "#EBF5FF", borderRadius: 16, padding: "32px", textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🎯</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 12 }}>Misyonumuz</h3>
            <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 15, maxWidth: 560, margin: "0 auto" }}>
              Kullanıcıların teknik servis arayışında vakit kaybetmemesi için şeffaf, güvenilir ve
              kapsamlı bir platform sunmak. Bireysel teknik ustaları öne çıkararak onlara müşteriye
              doğrudan ulaşma imkânı sağlamak.
            </p>
          </div>

          {/* İstatistikler */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { sayi: "81", label: "İl" },
              { sayi: "970+", label: "İlçe" },
              { sayi: "5", label: "Servis Kategorisi" },
            ].map(item => (
              <div key={item.label} style={{ textAlign: "center", padding: "24px", background: "#F9FAFB", borderRadius: 12, border: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#1A56DB", marginBottom: 6 }}>{item.sayi}</div>
                <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 600 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
