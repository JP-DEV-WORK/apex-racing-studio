import { useState, useCallback, ChangeEvent } from 'react';

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  if (email.trim().length === 0) return true; // Empty is valid until required check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

interface UseEmailValidationReturn {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  isEmpty: boolean;
  hasBeenTouched: boolean;
  showError: boolean;
  reset: () => void;
  onBlur: () => void;
}

export function useEmailValidation(initialValue: string = ''): UseEmailValidationReturn {
  const [value, setValue] = useState(initialValue);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  
  const isValid = isValidEmail(value);
  const isEmpty = value.trim().length === 0;
  // Only show error after user has interacted and there's content
  const showError = hasBeenTouched && !isEmpty && !isValid;
  
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  
  const onBlur = useCallback(() => {
    setHasBeenTouched(true);
  }, []);
  
  const reset = useCallback(() => {
    setValue('');
    setHasBeenTouched(false);
  }, []);
  
  return {
    value,
    onChange,
    isValid,
    isEmpty,
    hasBeenTouched,
    showError,
    reset,
    onBlur,
  };
}

export { isValidEmail };
