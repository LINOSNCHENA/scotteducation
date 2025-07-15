import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import { COMP_ICON_LOGO } from '@/app/utils/Branding/ApiRoutes';
import { formatDateZM, formatCurrency } from '@/app/utils/Functions';
import { IOrderRequest } from '@/types/models.eshop';
import saveAs from 'file-saver';
import { COMP_NAME, COMP_ADDRESS, COMP_EMAIL, COMP_MOBILE } from '@/app/utils/Branding/DataPascal';



// Helper: Load logo as base64 from /public/log.png
async function fetchLogo(): Promise<Uint8Array> {
    const res = await fetch(COMP_ICON_LOGO);
    const blob = await res.blob();
    return new Uint8Array(await blob.arrayBuffer());
}

// Helper: Wrap text by approx max chars per line
function wrapText(text: string, maxLineLength: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
        if ((currentLine + word).length > maxLineLength) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    }
    if (currentLine.trim()) lines.push(currentLine.trim());
    return lines;
}

// Helper: Draw multiline text with line spacing & margin checks
function drawMultilineText(
    page: PDFPage,
    text: string,
    x: number,
    yStart: number,
    font: PDFFont,
    fontSize: number,
    maxLineLength: number,
    lineHeight: number,
    color = rgb(0, 0, 0),
    pageHeight: number,
    bottomMargin: number
): number {
    const lines = wrapText(text, maxLineLength);
    let y = yStart;
    for (const line of lines) {
        if (y < bottomMargin) break;
        page.drawText(line, { x, y, size: fontSize, font, color });
        y -= lineHeight;
    }
    return y;
}
export async function generateOrderInvoice(order: IOrderRequest) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();

    // Margins
    const marginLeft = 50;
    const marginRight = 50;
    const marginTop = 50;
    const marginBottom = 60;
    ///  const netWidth = width - width * 1 / 5;

    // Fonts & sizes
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const fontSizeSmall = 9;
    const fontSizeNormal = 11;
    const fontSizeLarge = 15;
    const lineHeight = 16;

    // y cursor starts at top minus margin
    let y = height - marginTop;

    // Draw logo
    const logoBytes = await fetchLogo();
    const logoImage = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logoImage, {
        x: marginLeft,
        y: y - 40,
        width: 100,
        height: 40,
    });

    // Company name and address - bold and normal
    page.drawText(COMP_NAME, { x: marginLeft + 110, y: y - 20, size: fontSizeLarge, font: fontBold, color: rgb(0, 0, 0.7) });
    page.drawText(COMP_ADDRESS, { x: marginLeft + 110, y: y - 40, size: fontSizeSmall, font, color: rgb(0.3, 0.3, 0.3) });

    // Date top right
    page.drawText(formatDateZM(new Date()), {
        x: width - marginRight - 100,
        y: y - 20,
        size: fontSizeSmall,
        font,
        color: rgb(0, 0, 0.5),
    });

    // Horizontal line below header
    const lineY = y - 55;
    page.drawLine({
        start: { x: marginLeft, y: lineY },
        end: { x: width - marginRight, y: lineY },
        thickness: 1,
        color: rgb(0, 0, 0),
    });

    y = lineY - 30;

    // Title - bold orange
    page.drawText('INVOICE (Web and Database Development Department)', {
        x: marginLeft,
        y,
        size: fontSizeLarge,
        font: fontBold,
        color: rgb(1, 0.4, 0),
    });
    y -= lineHeight + 5;

    // Customer Details block
    function drawLabelValue(label: string, value: string, yPos: number) {
        page.drawText(label, { x: marginLeft, y: yPos, size: fontSizeNormal, font: fontBold });
        page.drawText(value, { x: marginLeft + 120, y: yPos, size: fontSizeNormal, font });
    }

    drawLabelValue('Customer:', order.customer_name || '—', y);
    y -= lineHeight;
    drawLabelValue('Email:', order.customer_email || '—', y);
    y -= lineHeight;
    drawLabelValue('Phone:', order.customer_phone || '—', y);
    y -= lineHeight;
    drawLabelValue('Type:', order.plan_title || '—', y);
    y -= lineHeight;
    drawLabelValue('Price:', formatCurrency(order.plan_bill || 0), y);
    y -= lineHeight + 5;

    // Plan features list
    if (order.plan_features && order.plan_features.length > 0) {
        page.drawText('Plan Features:', { x: marginLeft, y, size: fontSizeNormal, font: fontBold });
        y -= lineHeight;
        order.plan_features.forEach((feature) => {
            if (y < marginBottom) return; // prevent overflow
            page.drawText(`• ${feature}`, { x: marginLeft + 15, y, size: fontSizeNormal, font });
            y -= lineHeight - 4; // tighter spacing for list
        });
        y -= 10;
    }

    // Client Requirements (wrapped)
    if (order.requirements) {
        page.drawText('Client Requirements:', { x: marginLeft, y, size: fontSizeNormal, font: fontBold });
        y -= lineHeight;
        y = drawMultilineText(page, order.requirements, marginLeft + 15, y, font, fontSizeNormal, 90, 16, rgb(0, 0, 0), height, marginBottom);
        y -= 10;
    }

    // Project Terms (wrapped)
    const created = new Date(order.created_at);
    const start = new Date(created);
    start.setDate(start.getDate() + 1);
    const end = new Date(created);
    end.setDate(end.getDate() + 21);
    const timeline = `The project will commence on ${start.toDateString()} and shall be completed within 21 days by ${end.toDateString()}. Payments must be made in three equal instalments: the first on website deployment, the second upon results from the first consultative meeting, and the last upon delivery of all final materials to the client.`;

    page.drawText('Project Terms:', { x: marginLeft, y, size: fontSizeNormal, font: fontBold });
    y -= lineHeight;
    y = drawMultilineText(page, timeline, marginLeft + 15, y, font, fontSizeNormal, 90, 16, rgb(0, 0, 0), height, marginBottom);
    y -= 10;

    // Payment Methods heading
    page.drawText('Payment Methods:', { x: marginLeft, y, size: fontSizeNormal, font: fontBold, color: rgb(0, 0, 0) });
    y -= lineHeight;

    const price = order.plan_bill || 0;
    const installment = price / 3;
    page.drawText(`Each instalment must be equal to: ${formatCurrency(installment)}`, {
        x: marginLeft + 15,
        y,
        size: fontSizeSmall,
        font,
        color: rgb(0.2, 0.2, 0.2),
    });
    y -= lineHeight;

    const methodsIntro = `All invoices are to be cleared by one of the below approved accounts or platforms; payments via unapproved accounts/platforms shall be invalid under this contract.`;
    y = drawMultilineText(page, methodsIntro, marginLeft + 15, y, font, fontSizeSmall, 90, 14, rgb(0, 0, 0), height, marginBottom);
    y -= 10;
    const paymentSections = [
        {
            title: 'AIRTEL MONEY (Preferred)',
            items: [
                'Name: Besa Mwape',
                'Number: +260 771 371 580',
            ],
        },
        {
            title: 'MTN MONEY (For MTN Users)',
            items: [
                'Name: Troopers ML Ltd',
                'Number: +260 761 278 111',
            ],
        },
        {
            title: 'BANK TRANSFER (For Payments Over K10,000)',
            items: [
                'Account Name: Troopers ML Limited',
                'Account Number: 9130006426410',
                'Bank Name: Stanbic Bank',
                'Branch: Lusaka Main',
                'Bank Code: 040002 | SWIFT Code: SBICZMLX',
            ],
        },
    ];


    for (const section of paymentSections) {
        if (y < marginBottom + 80) break; // prevent overflow
        page.drawText(section.title, { x: marginLeft, y, size: fontSizeNormal, font: fontBold, color: rgb(0, 0.2, 0.6) });
        y -= lineHeight;
        section.items.forEach((item) => {
            if (y < marginBottom) return;
            page.drawText(item, { x: marginLeft + 15, y, size: fontSizeSmall, font, color: rgb(0, 0, 0) });
            y -= lineHeight - 4;
        });
        y -= 10;
    }

    // Order Meta details
    page.drawText(`Order Status: ${order.status ?? 'Pending'}`, { x: marginLeft, y, size: fontSizeNormal, font, color: rgb(0, 0, 0) });
    y -= lineHeight;
    page.drawText(`Order Date: ${formatDateZM(order.created_at ? new Date(order.created_at) : new Date())}`, { x: marginLeft, y, size: fontSizeNormal, font, color: rgb(0, 0, 0) });
    y -= lineHeight;
    if (order.id) page.drawText(`Order ID: ${order.id}`, { x: marginLeft, y, size: fontSizeSmall, font, color: rgb(0, 0, 0.4) });
    y -= lineHeight;

    const paymentMsg = `Payment Confirmation: After making payments, please forward all receipts to either the company WhatsApp or email address listed below:
Email: ${COMP_EMAIL}   |   WhatsApp: ${COMP_MOBILE}| `;

    y = drawMultilineText(
        page,
        paymentMsg,
        marginLeft,
        y,
        font,
        fontSizeSmall,
        110,// netWidth,// 150,              // increase from 90 to allow more horizontal space
        14,
        rgb(0, 0, 0),
        height,
        marginBottom
    );



    // Signature line
    y -= lineHeight * 2;
    page.drawText('_______________________________', { x: marginLeft, y, size: fontSizeNormal, font, color: rgb(0, 0, 0) });
    y -= lineHeight;
    page.drawText('Project Officer | Case Officer ', { x: marginLeft, y, size: fontSizeNormal, font, color: rgb(0, 0, 0.6) });

    // Save PDF with safe filename
    const pdfBytes = await pdfDoc.save();
    const safeName = (order.customer_name || 'customer').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `Invoice-${safeName}-${Date.now()}.pdf`);
}
