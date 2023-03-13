interface IObjectKey {
  [key: string]: string;
}

export interface FormError extends IObjectKey {
  name: string;
  login: string;
  password: string;
}
