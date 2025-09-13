// src/types/index.ts

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type Theme = 'blue' | 'dark' | 'dynamic';

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Addresses {
  home: Address;
  work: Address;
  other: Address | null;
}

export interface ProfilePayload {
  info: UserInfo;
  theme: Theme;
  addresses: {
    home: Address;
    work: Address | null;
    other: Address | null;
  };
}