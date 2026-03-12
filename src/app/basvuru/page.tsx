"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { kategoriler, iller, markalar } from "@/data/turkiye";

export default function BasvuruSayfasi() {
  const [form, setForm] = useState({
    ad_soyad: "", telefon: "", whatsapp: "",
    kategori: [] as string[], markalar_sec: [] as string[],
    bolgeler: [{ il: "", ilce: "" }],
    hakkinda: ""
  });
  const [gonderildi, setGonderildi] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);

  const toggleKategori = (slug: string) => {
    setForm(f => ({
      ...f,
      kategori: f.kategori.includes(slug) ? f.kategori.filter(k => k !== slug) : [...f.kategori, slug]
    }));
  };

  const toggleMarka = (m: string) => {
    setForm(f => ({
      ...f,
      markalar_sec: f.markalar_sec.includes(m) ? f.markalar_sec.filter(x => x !== m) : [...f.markalar_sec, m]
    }));
  };

  const bolgEkle = () => setForm(f => ({ ...f, bolgeler: [...f.bolgeler, { il: "", ilce: "" }] }));

  const handleGonder = async () => {
    setYukleniyor(true);
    // Gerçekte Supabase'e gönderilir
    await new Promise(r => setTimeout(r, 1500));
    setYukleniyor(false);
    setGonderildi(true);
  };

  if (gonderildi) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 12 }}>Başvurunuz Alındı!</h2>
        <p style={{ color: "#6B7280", fontSize: 16, lineHeight: 1.7 }}>
          Başvurunuzu inceleyip en kısa sürede sizinle iletişime geçeceğiz. Onaylandıktan sonra sayfanız yayınlanacaktır.
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1A56DB, #1E40AF)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
            ⭐ Premium Usta Başvurusu
          </h1>
          <p style={{ color: "#BFDBFE", fontSize: 16 }}>
            Türkiye&apos;nin teknik servis rehberinde yerinizi alın. Müşterilere direkt ulaşın.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Bilgi kutusu */}
          <div style={{ background: "#EBF5FF", borderRadius: 12, padding: "20px", marginBottom: 32, border: "1px solid #BFDBFE" }}>
            <p style={{ fontSize: 14, color: "#1E40AF", lineHeight: 1.7 }}>
              📋 Başvurunuz ekibimiz tarafından incelenecek ve onaylandıktan sonra sayfanız yayınlanacaktır.
              Onay sürecinde sizi arayabiliriz. Lütfen gerçek bilgiler giriniz.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Ad Soyad */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Ad Soyad *</label>
              <input type="text" value={form.ad_soyad} onChange={e => setForm(f => ({ ...f, ad_soyad: e.target.value }))}
                placeholder="Ahmet Yılmaz" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none" }} />
            </div>

            {/* Telefon & WA */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Telefon *</label>
                <input type="tel" value={form.telefon} onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))}
                  placeholder="05XX XXX XX XX" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>WhatsApp</label>
                <input type="tel" value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                  placeholder="05XX XXX XX XX" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none" }} />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 10 }}>Servis Kategorisi *</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {kategoriler.map(k => (
                  <button key={k.slug} onClick={() => toggleKategori(k.slug)} style={{
                    padding: "8px 16px", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer",
                    border: "2px solid", transition: "all 0.15s",
                    borderColor: form.kategori.includes(k.slug) ? "#1A56DB" : "#E5E7EB",
                    background: form.kategori.includes(k.slug) ? "#EBF5FF" : "#fff",
                    color: form.kategori.includes(k.slug) ? "#1A56DB" : "#374151"
                  }}>
                    {k.icon} {k.ad}
                  </button>
                ))}
              </div>
            </div>

            {/* Markalar */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 10 }}>Hizmet Verilen Markalar</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {markalar.map(m => (
                  <button key={m} onClick={() => toggleMarka(m)} style={{
                    padding: "6px 12px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer",
                    border: "1.5px solid",
                    borderColor: form.markalar_sec.includes(m) ? "#1A56DB" : "#E5E7EB",
                    background: form.markalar_sec.includes(m) ? "#EBF5FF" : "#F9FAFB",
                    color: form.markalar_sec.includes(m) ? "#1A56DB" : "#374151"
                  }}>{m}</button>
                ))}
              </div>
            </div>

            {/* Bölgeler */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 10 }}>Çalıştığı Bölgeler *</label>
              {form.bolgeler.map((bolge, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 10 }}>
                  <select value={bolge.il} onChange={e => {
                    const yeni = [...form.bolgeler];
                    yeni[i] = { il: e.target.value, ilce: "" };
                    setForm(f => ({ ...f, bolgeler: yeni }));
                  }} style={{ padding: "10px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, background: "#fff", cursor: "pointer" }}>
                    <option value="">İl Seçin</option>
                    {Object.values(iller).map(il => <option key={il.slug} value={il.slug}>{il.ad}</option>)}
                  </select>
                  <select value={bolge.ilce} onChange={e => {
                    const yeni = [...form.bolgeler];
                    yeni[i] = { ...yeni[i], ilce: e.target.value };
                    setForm(f => ({ ...f, bolgeler: yeni }));
                  }} disabled={!bolge.il} style={{ padding: "10px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, background: bolge.il ? "#fff" : "#F9FAFB", cursor: bolge.il ? "pointer" : "not-allowed" }}>
                    <option value="">İlçe Seçin</option>
                    {bolge.il && iller[bolge.il]?.ilceler.map(ilce => <option key={ilce.slug} value={ilce.slug}>{ilce.ad}</option>)}
                  </select>
                </div>
              ))}
              <button onClick={bolgEkle} style={{ background: "none", border: "1.5px dashed #1A56DB", borderRadius: 8, padding: "8px 16px", color: "#1A56DB", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                + Bölge Ekle
              </button>
            </div>

            {/* Hakkında */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Kendinizi Tanıtın</label>
              <textarea value={form.hakkinda} onChange={e => setForm(f => ({ ...f, hakkinda: e.target.value }))}
                placeholder="Deneyiminiz, uzmanlık alanlarınız hakkında kısa bilgi..."
                rows={4} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, resize: "vertical", outline: "none" }} />
            </div>

            {/* Gönder */}
            <button onClick={handleGonder} disabled={yukleniyor || !form.ad_soyad || !form.telefon || form.kategori.length === 0} style={{
              background: form.ad_soyad && form.telefon && form.kategori.length > 0 ? "#1A56DB" : "#9CA3AF",
              color: "#fff", border: "none", borderRadius: 10, padding: "16px",
              fontWeight: 800, fontSize: 16, cursor: form.ad_soyad && form.telefon && form.kategori.length > 0 ? "pointer" : "not-allowed",
              transition: "background 0.15s"
            }}>
              {yukleniyor ? "Gönderiliyor..." : "🚀 Başvuruyu Gönder"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
