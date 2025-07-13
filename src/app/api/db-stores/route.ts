// src/app/api/counter/route.ts

import { NextResponse } from 'next/server';

let counterValue = 0;

export async function GET() {
    return NextResponse.json({ counter: counterValue });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const increment = typeof body.value === 'number' ? body.value : 0;
        counterValue += increment;

        return NextResponse.json({ counter: counterValue });
    } catch (error) {
        console.error('POST /api/db-store error:', error);
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }

}
