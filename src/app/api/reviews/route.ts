// src/app/api/reviews/route.ts

import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server';

const TableName = 'reviews_pascal'

export async function POST(req: Request) {
    const body = await req.json()
    const { data, error } = await supabase.from(TableName).insert([body])
    return NextResponse.json({ data, error })
}
