import { defineStore } from "pinia";
import { ref } from "vue";
import { Account } from "../types/Account";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "account_store";

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<Account[]>([]);

  const loadAccounts = (): void => {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      if (!rawData) return;

      const parsedAccounts = JSON.parse(rawData) as Account[];

      // Валидация загруженных данных
      if (Array.isArray(parsedAccounts)) {
        accounts.value = parsedAccounts;
      } else {
        console.log("Неверные форматы данных");
      }
    } catch (error) {
      console.log("Не удалось загрузить учетные записи из хранилища");
      accounts.value = [];
    }
  };

  const persistAccounts = (): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value));
    } catch (error) {
      console.log("Ошибка persistAccounts: ", error);
    }
  };

  const createAccount = (): string => {
    const newAccount: Account = {
      id: uuidv4(),
      labels: [],
      rawLabels: "",
      type: "LDAP",
      login: "",
      password: null,
    };

    accounts.value.push(newAccount);
    persistAccounts();

    return newAccount.id;
  };

  const removeAccount = (id: string): boolean => {
    const initialLength = accounts.value.length;
    accounts.value = accounts.value.filter((account) => account.id !== id);

    const wasRemoved = accounts.value.length < initialLength;
    if (wasRemoved) {
      persistAccounts();
    } else {
      console.warn(`Аккаунт с id ${id} не найден для удаления`);
    }

    return wasRemoved;
  };

  const updateAccount = (id: string, patch: Partial<Account>) => {
    const idx = accounts.value.findIndex((x) => x.id === id);
    if (idx === -1) return;
    accounts.value[idx] = { ...accounts.value[idx], ...patch };
    persistAccounts();
  };
  // Автоматическая загрузка при инициализации хранилища
  loadAccounts();

  return {
    accounts,
    createAccount,
    removeAccount,
    loadAccounts,
    updateAccount,
    persistAccounts,
  };
});
