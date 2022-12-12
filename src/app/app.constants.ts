export enum Path {
  signupPage = 'signup',
  adminPage = 'admin',
  loginPage = 'login',
}

export const STORAGE_NAME = 'userDate';

export enum BlockStatus {
  blocked = 'blocked',
  active = 'active',
}

export const defaultUserName = 'Your Name';

export const displayedColumns: string[] = [
  'check',
  'position',
  'name',
  'email',
  'registration',
  'login',
  'status',
];
