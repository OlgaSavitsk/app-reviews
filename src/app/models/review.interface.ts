import { SafeUrl } from '@angular/platform-browser';

interface IObjectKeys {
  [key: string]: any;
}

export interface ReviewInfo extends IObjectKeys {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  rating: number;
  img: string;
  createdAt: string;
  action?: string;
  userId: string;
  image: File;
  filePath: string;
  fileUrl: SafeUrl;
  score: number;
  like: number;
}
