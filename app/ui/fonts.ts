// @file: /app/ui/fonts.ts
import { Inter, Lusitana } from 'next/font/google';

// це буде основний шрифт 
export const inter = Inter({ subsets: ['latin'] });

// і додатковий шрифт
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});