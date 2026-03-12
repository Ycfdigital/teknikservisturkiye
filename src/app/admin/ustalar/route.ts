import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const durum = req.nextUrl.searchParams.get('durum') || 'beklemede';
    const [rows] = await pool.query(
      'SELECT * FROM usta WHERE durum = ? ORDER BY olusturma_tarihi DESC',
      [durum]
    );
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, durum, cta_aktif } = await req.json();
    if (!id) return NextResponse.json({ hata: 'id gerekli' }, { status: 400 });

    if (durum !== undefined) {
      await pool.query('UPDATE usta SET durum = ? WHERE id = ?', [durum, id]);
    }
    if (cta_aktif !== undefined) {
      await pool.query('UPDATE usta SET cta_aktif = ? WHERE id = ?', [cta_aktif ? 1 : 0, id]);
    }
    return NextResponse.json({ basari: true });
  } catch (err: any) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}
