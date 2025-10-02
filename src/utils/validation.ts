import { AccountType } from "../types/Account";

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export function validateLabel(raw?: string): ValidationResult {
  if (!raw) return { valid: true };
  if (raw.length > 50) {
    return { valid: false, message: "Метка: максимум 50 символов" };
  }
  return { valid: true };
}

export function validateLogin(login: string): ValidationResult {
  const trimmedLogin = login.trim();
  if (!trimmedLogin) {
    return { valid: false, message: "Логин обязателен" };
  }
  if (trimmedLogin.length > 100) {
    return { valid: false, message: "Логин: максимум 100 символов" };
  }
  return { valid: true };
}

export function validatePassword(
  pass: string | null | undefined,
  type: AccountType
): ValidationResult {
  if (type === "LDAP") return { valid: true };

  const value = pass ?? "";
  const trimmedPassword = value.trim();

  if (!trimmedPassword) {
    return {
      valid: false,
      message: "Пароль обязателен для локальной учётной записи",
    };
  }

  if (trimmedPassword.length > 100) {
    return { valid: false, message: "Пароль: максимум 100 символов" };
  }

  return { valid: true };
}
