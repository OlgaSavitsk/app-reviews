export enum Path {
  signupPage = 'signup',
  adminPage = 'admin',
  loginPage = 'login',
  mainPage = 'home',
  review = 'review',
}

export const STORAGE_NAME = 'userDate';

export enum BlockStatus {
  blocked = 'blocked',
  active = 'active',
}

export const displayedColumnsUsers: string[] = [
  'check',
  'username',
  'login',
  'createdAt',
  'updatedAt',
  'status',
  'roles',
];

export const displayedColumnsReviews: string[] = [
  'name',
  'title',
  'rating',
  'details',
  'createdAt',
  'action',
];

export enum Language {
  en,
  ru,
  langEn = 'English',
  langRu = 'Russian',
}

export enum ReviewDialogAction {
  addDialogAction = 'Add',
  editDialogAction = 'Edit',
  addAction = 'Add',
  editAction = 'Update',
  dataAddAction = 'Create Review',
  dataEditAction = 'Edit Review',
}

export const defaultFilePath = 'image-1672299937406.png';

export const FILM_CATEGORIES = [
  'feature',
  'series',
  'action',
  'adventure',
  'comedy',
  'drama',
  'horror',
  'musical',
  'biography',
  'sci-fi',
  'triller',
  'family',
  'documentary',
];
