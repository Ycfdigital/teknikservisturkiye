import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as sayi FROM isletme');
    return NextResponse.json({ baglanti: 'OK', veri: rows });
  } catch (err: any) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}
