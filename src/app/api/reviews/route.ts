// src/app/api/reviews/route.ts

import { createClient } from '@/app/composables/supabaseClient'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
    const supabase = createClient()
    const body = await req.json()
    const { data, error } = await supabase.from('reviews').insert([body])
    return NextResponse.json({ data, error })
}
