// app/pdfs/route.ts
import { generatePdf } from '@/app/utils/Functions';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const indexParam = url.searchParams.get('index');
    const index = Number(indexParam ?? 0);

    const pdfBytes = await generatePdf(index);

    return new Response(pdfBytes, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="pdf-${index + 1}.pdf"`,
        },
    });
}
