import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows]: any = await pool.query('SELECT anahtar, deger FROM site_ayar');
    const ayarlar: Record<string, string> = {};
    rows.forEach((r: any) => { ayarlar[r.anahtar] = r.deger; });
    return NextResponse.json(ayarlar);
  } catch (err: any) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    for (const [anahtar, deger] of Object.entries(body)) {
      await pool.query(
        'INSERT INTO site_ayar (anahtar, deger) VALUES (?, ?) ON DUPLICATE KEY UPDATE deger = ?',
        [anahtar, deger, deger]
      );
    }
    return NextResponse.json({ basari: true });
  } catch (err: any) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}
