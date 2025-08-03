'use client';

export function usePhoneFormat() {
  const formatPhone = (phone: string | undefined): string => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const removePhoneMask = (phone: string): string => {
    return phone.replace(/\D/g, '');
  };

  const isValidPhone = (phone: string): boolean => {
    const cleaned = removePhoneMask(phone);
    return cleaned.length === 10 || cleaned.length === 11;
  };

  return {
    formatPhone,
    removePhoneMask,
    isValidPhone,
  };
}