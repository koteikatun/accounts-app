export type AccountType = "LDAP" | "Локальная";

export type LabelTag = { text: string };

export interface Account {
  id: string;
  labels: LabelTag[];
  rawLabels?: string;
  type: AccountType;
  login: string;
  password: string | null;
}
