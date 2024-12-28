export const sanitizeText = (text: string): string => {
    // Remove any HTML tags that might be present in the text
    text = text.replace(/<[^>]*>/g, '');
    
    // Convert special characters to their normal form
    text = text.normalize('NFKC');
    
    // Remove any remaining special characters or symbols that might cause issues
    text = text.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, '');
    
    return text.trim();
  };
  
  export const validateTextLength = (text: string): boolean => {
    const minLength = 10; // Minimum characters required
    const maxLength = 50000; // Maximum characters allowed
    return text.length >= minLength && text.length <= maxLength;
  };