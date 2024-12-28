import { PDFExtract } from 'pdf.js-extract';
import { promisify } from 'util';
import path from 'path';
import { processText, splitIntoSections } from '../utils/textProcessing';
import { validateTextLength } from '../utils/sanitizer';
import fs from 'fs';
const pdfExtract = new PDFExtract();
const extractPDF = promisify(pdfExtract.extract).bind(pdfExtract);
import os from 'os';
export class FileService {
  static async extractText(file: Express.Multer.File): Promise<string> {
    try {
      const ext = path.extname(file.originalname).toLowerCase();
      let text = '';

      if (ext === '.txt') {
        text = await FileService.extractFromTxt(file);
      } else if (ext === '.pdf') {
        text = await FileService.extractFromPdf(file);
      } else {
        throw new Error('Unsupported file type');
      }

      // Process and validate the extracted text
      text = processText(text);
      
      if (!validateTextLength(text)) {
        throw new Error(`Text length must meet requirements. Current length: ${text.length} characters`);
      }

      return text;
    } catch (error) {
      console.error('Error in text extraction:', error);
      throw new Error('Failed to process file content');
    }
  }

  private static async extractFromTxt(file: Express.Multer.File): Promise<string> {
    try {
      // Detect and handle different text encodings
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(file.buffer);
    } catch (error) {
      console.error('Error extracting text from TXT:', error);
      throw new Error('Failed to extract text from TXT file');
    }
  }

  private static async extractFromPdf(file: Express.Multer.File): Promise<string> {
    try {
        const uint8Array = new Uint8Array(file.buffer);
        const data = await pdfExtract.extractBuffer(uint8Array);
      
      // Process each page and combine the content
      const textContent = data.pages
        .map(page => {
          return page.content
            .map(item => item.str)
            .join(' ');
        })
        .join('\n\n');

      // Split into sections and rejoin to ensure proper formatting
      const sections = splitIntoSections(textContent);
      return sections.join('\n\n');
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF file');
    }
  }
}