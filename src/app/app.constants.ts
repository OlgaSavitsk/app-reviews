export enum Path {
  signupPage = 'signup',
  adminPage = 'admin',
  loginPage = 'login',
  mainPage = 'home'
}

export const STORAGE_NAME = 'userDate';

export enum BlockStatus {
  blocked = 'blocked',
  active = 'active',
}

export const displayedColumns: string[] = [
  'check',
  'position',
  'name',
  'email',
  'registration',
  'login',
  'status',
];

export enum Language {
  en,
  ru,
  langEn = 'English',
  langRu = 'Russian', 
}
