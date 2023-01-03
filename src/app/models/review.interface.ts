import { SafeUrl } from '@angular/platform-browser';

export interface ReviewInfo {
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
