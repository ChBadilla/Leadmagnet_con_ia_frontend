import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates a PDF from a given HTML element.
 * @param {HTMLElement} element - The HTML element to capture.
 * @param {string} fileName - The desired name for the downloaded PDF file.
 */
export const generatePdfFromElement = (element, fileName = 'download.pdf') => {
  if (!element) {
    return Promise.reject(new Error('Element not provided for PDF generation.'));
  }

  return html2canvas(element, { 
    scale: 2, // Higher scale for better quality
    useCORS: true, // In case there are images from other origins
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    
    const pdfImageWidth = pdfWidth;
    const pdfImageHeight = pdfImageWidth / ratio;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfImageWidth, pdfImageHeight);
    pdf.save(fileName);
  });
};
