import { generatePdf } from '@/app/utils/Functions';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const index = Number(new URL(request.url).searchParams.get('index')) || 0;
        const pdfBytes = await generatePdf(index);

        // Use type assertion to handle the ArrayBufferLike compatibility
        const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });

        return new Response(blob, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="document-${index + 1}.pdf"`,
            },
        });
    } catch (error) {
        console.error('PDF generation failed:', error);
        return new Response('Failed to generate PDF', { status: 500 });
    }
}