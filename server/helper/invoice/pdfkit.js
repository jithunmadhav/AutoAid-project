import PDFDocument from 'pdfkit';
import fs from 'fs';

export const  createInvoice=(invoiceData, filePath)=> {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe the PDF document to a writable stream
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Set the invoice title
  doc.fontSize(20).text('Autoaid Booking Payment Invoice', { align: 'center' });

  // Add invoice details
  doc.moveDown();
  doc.fontSize(12).text(`Invoice Number: ${invoiceData.invoiceNumber}`);
  doc.fontSize(12).text(`Date: ${new Date(invoiceData.date).toLocaleDateString()}`);

  // Add table header
  doc.moveDown();
  doc.fontSize(12).text('Customer Details:', { bold: true });

  // Set up table styling
  const tableTop = 200;
  const tableLeft = 50;
  const tableRight = doc.page.width - 50;
  const tableRowHeight = 30;
  const tableCol1Width = 200;
  const tableCol2Width = 100;
  const tableCol3Width = 100;

  // Draw table borders
  doc.lineWidth(1).rect(tableLeft, tableTop, tableRight - tableLeft, tableRowHeight).stroke();

  // Add table header content
  doc.fontSize(12).text('Customer Name', tableLeft + 5, tableTop + 5, { underline: false });
  doc.fontSize(12).text('Amount', tableLeft + tableCol1Width + 5, tableTop + 5, { underline: false });
  doc.fontSize(12).text('Payment ID', tableLeft + tableCol1Width + tableCol2Width + 5, tableTop + 5, { underline: false });

  // Calculate table body height
  const availableHeight = doc.page.height - tableTop - 100;
  const tableBodyHeight = Math.min(availableHeight, tableRowHeight)+200;

  // Draw table body box
  const tableBodyTop = tableTop + tableRowHeight;
  const tableBodyBottom = tableBodyTop + tableBodyHeight;
  doc.lineWidth(1).rect(tableLeft, tableBodyTop, tableRight - tableLeft, tableBodyHeight).stroke();

  // Add table row content
  doc.fontSize(12).text(invoiceData.customerName, tableLeft + 5, tableBodyTop + 5);
  doc.fontSize(12).text(invoiceData.amount.toString(), tableLeft + tableCol1Width + 5, tableBodyTop + 5);
  doc.fontSize(12).text(invoiceData.id, tableLeft + tableCol1Width + tableCol2Width + 5, tableBodyTop + 5);

  // Add total amount below the table
  const totalAmountTop = tableBodyBottom + 100;
  doc.fontSize(12).text(`Total Amount: ${invoiceData.totalAmount} /-`, tableLeft, totalAmountTop, { align: 'right' });

  // Save and finalize the PDF document
  doc.end();
}

 

