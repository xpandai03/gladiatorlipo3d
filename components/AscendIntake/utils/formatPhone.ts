import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export function toE164(raw: string): string | null {
  try {
    // Try to parse with country detection
    const phoneNumber = parsePhoneNumber(raw, 'US');
    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.format('E.164');
    }
    
    // Try parsing as international format
    const intlPhone = parsePhoneNumber(raw);
    if (intlPhone && intlPhone.isValid()) {
      return intlPhone.format('E.164');
    }
  } catch (error) {
    // Fallback to basic formatting
  }
  
  // Basic fallback: clean digits and add + if not present
  const digits = raw.replace(/\D/g, '');
  if (!digits) return null;
  
  // If it starts with country code
  if (digits.startsWith('1') && digits.length === 11) {
    return `+${digits}`;
  }
  
  // If it's a 10-digit US number
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // If already has + or starts with 00
  if (raw.startsWith('+')) {
    return `+${digits}`;
  }
  
  if (digits.startsWith('00')) {
    return `+${digits.slice(2)}`;
  }
  
  return digits.length >= 10 ? `+${digits}` : null;
}

export function formatPhoneDisplay(raw: string): string {
  try {
    const phoneNumber = parsePhoneNumber(raw, 'US');
    if (phoneNumber) {
      return phoneNumber.formatNational();
    }
  } catch (error) {
    // Return raw if can't format
  }
  return raw;
}