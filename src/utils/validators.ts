// src/utils/validators.ts

export const isEmailValid = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPhoneValid = (phone: string): boolean => {
  if (!phone) return false;
  // This regex is for international phone numbers, including an optional '+'
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  // We remove spaces and dashes before testing
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};