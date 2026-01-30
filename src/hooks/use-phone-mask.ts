import { useState, useCallback, ChangeEvent } from 'react';

/**
 * Formats a phone number string to Brazilian format
 * (DD) 9XXXX-XXXX for 11 digits (mobile)
 * (DD) XXXX-XXXX for 10 digits (landline)
 */
function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Limit to 11 digits (max for Brazilian phone)
  const limitedDigits = digits.slice(0, 11);
  
  if (limitedDigits.length === 0) {
    return '';
  }
  
  if (limitedDigits.length <= 2) {
    return `(${limitedDigits}`;
  }
  
  if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2)}`;
  }
  
  if (limitedDigits.length <= 10) {
    // Landline format: (DD) XXXX-XXXX
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 6)}-${limitedDigits.slice(6)}`;
  }
  
  // Mobile format: (DD) 9XXXX-XXXX
  return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 7)}-${limitedDigits.slice(7)}`;
}

/**
 * Extracts only digits from formatted phone
 */
function getDigitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validates if phone has minimum required digits (10 for landline, 11 for mobile)
 */
function isValidPhone(value: string): boolean {
  const digits = getDigitsOnly(value);
  // Empty is valid (field is optional)
  if (digits.length === 0) return true;
  // Must have at least 10 digits (landline) or 11 (mobile)
  return digits.length >= 10 && digits.length <= 11;
}

interface UsePhoneMaskReturn {
  value: string;
  displayValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  isEmpty: boolean;
  reset: () => void;
}

export function usePhoneMask(initialValue: string = ''): UsePhoneMaskReturn {
  const [value, setValue] = useState(initialValue);
  
  const displayValue = formatPhoneNumber(value);
  const isValid = isValidPhone(value);
  const isEmpty = getDigitsOnly(value).length === 0;
  
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Extract only digits and store
    const digits = getDigitsOnly(inputValue);
    setValue(digits);
  }, []);
  
  const reset = useCallback(() => {
    setValue('');
  }, []);
  
  return {
    value,
    displayValue,
    onChange,
    isValid,
    isEmpty,
    reset,
  };
}

export { formatPhoneNumber, getDigitsOnly, isValidPhone };
