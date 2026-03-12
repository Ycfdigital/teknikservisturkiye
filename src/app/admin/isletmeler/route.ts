import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const sayfa = Number(req.nextUrl.searchParams.get('sayfa') || 1);
  const limit = 50;
    const offset = (sayfa - 1) * limit;
    const il = req.nextUrl.searchParams.get('il') || '';
    const kategori = req.nextUrl.searchParams.get('kategori') || '';

    let where = 'WHERE 1=1';
    const params: any[] = [];
    if (il) { where += ' AND il_slug = ?'; params.push(il); }
    if (kategori) { where += ' AND kategori_slug = ?'; params.push(kategori); }

    const [rows] = await pool.query(
      `SELECT * FROM isletme ${where} ORDER BY olusturma_tarihi DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    const [total]: any = await pool.query(
      `SELECT COUNT(*) as toplam FROM isletme ${where}`, params
    );
    return NextResponse.json({ isletmeler: rows, toplam: total[0].toplam, sayfa });
  } catch (err: any) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, cta_aktif, aktif } = await req.json();
    if (!id) return NextResponse.json({ hata: 'id gerekli' }, { status: 400 });

    if (cta_aktif !== undefined) {
      await pool.query('UPDATE isletme SET cta_aktif = ? WHERE id = ?', [cta_aktif ? 1 : 0, id]);
    }
    if (aktif !== undefined) {
      await pool.query('UPDATE isletme SET aktif = ? WHERE id = ?', [aktif ? 1 : 0, id]);
    }
    return NextResponse.json({ basari: true });
  } catch (err: any) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}
