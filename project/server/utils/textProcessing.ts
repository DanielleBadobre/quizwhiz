import { sanitizeText } from './sanitizer.ts';

export const processText = (text: string): string => {
  // Remove any null characters and invalid Unicode
  text = text.replace(/\0/g, '');
  text = text.replace(/[\uFFFD\uFFFE\uFFFF]/g, '');
  
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ');
  
  // Remove any control characters except newlines and tabs
  text = text.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  
  return sanitizeText(text);
};

export const splitIntoSections = (text: string): string[] => {
  // Split text into logical sections based on paragraphs or headers
  return text
    .split(/(?:\r?\n){2,}/)
    .map(section => section.trim())
    .filter(section => section.length > 0);
};