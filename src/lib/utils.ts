import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const interpolateText = (text: string, interpolations: { [key: string]: string }) => {
  let interpolatedText = text;
  for (const key in interpolations) {
    if (Object.prototype.hasOwnProperty.call(interpolations, key)) {
      const value = interpolations[key];
      interpolatedText = text.replace(new RegExp(`%${key}%`), value);     
    }
  }

  return interpolatedText;
}