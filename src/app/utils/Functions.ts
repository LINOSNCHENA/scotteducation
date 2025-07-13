// lib/pdfHelpers.ts

import { PDFDocument, rgb } from 'pdf-lib'; // Or any PDF library

export async function generate1Pdf(index: number): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText(`This is PDF #${index + 1}`, { x: 50, y: 350 });
    return await pdfDoc.save();
}

export const formatDate = (dateStr: string | Date) =>
    new Date(dateStr).toLocaleDateString("en-ZM", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

export const formatDateZM = (dateStr: string | Date) =>
    new Date(dateStr).toLocaleString("en-ZM", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Africa/Lusaka"
    });


export const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export const formatCurrency = (amount: number | string): string => {
    return new Intl.NumberFormat('en-ZM', {
        style: 'currency',
        currency: 'ZMW',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(amount));
};

export async function generatePdf(index: number): Promise<Uint8Array> {
    console.log(`📄 Starting PDF generation for index: ${index}`);
    try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        console.log('🆕 PDF document created');
        // Add a new page with specific dimensions
        const page = pdfDoc.addPage([600, 400]);
        console.log(`📝 Added page (600x400)`);
        // Add text to the page
        const text = `This is PDF #${index + 1}`;
        page.drawText(text, {
            x: 50,
            y: 350,
            size: 24,
            color: rgb(0.2, 0.4, 0.6)
        });
        console.log(`✏️  Added text: "${text}"`);
        // Save the PDF and return the bytes
        const pdfBytes = await pdfDoc.save();
        console.log(`✅ PDF generated successfully (${pdfBytes.length} bytes)`);
        return pdfBytes;
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        throw error;
    }
}



