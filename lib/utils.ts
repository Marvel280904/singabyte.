import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fungsi utilitas untuk menggabungkan class Tailwind
 * clsx: Mengizinkan conditional logic (misal: isMobile && "p-4")
 * twMerge: Memastikan tidak ada konflik class (misal: "bg-red-500" akan menimpa "bg-blue-500" jika digabung)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}