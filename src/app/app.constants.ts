export enum Path {
  signupPage = 'signup',
  adminPage = 'admin',
  loginPage = 'login',
  mainPage = 'home',
  review = 'review',
  detailsPage = 'details',
}

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

export enum SortParam {
  dateParam = 'date',
  scoreParam = 'score',
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

export const MARKS = new Array(10).fill(0).map((_, index) => index + 1);
