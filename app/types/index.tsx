// types.ts

export interface Country {
  id: number;
  country: string;
  states: string[];
}

export interface RegisterFormValues {
  appName: string;
  country: string;
  state: string;
}
