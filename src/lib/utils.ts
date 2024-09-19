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

export const getDifferenceInDays = (date1: Date, date2: Date) => {
  if(date1 > date2) return 0;

  const difference = date2.getTime() - date1.getTime();
  return Math.round(difference / ( 1000 * 3600 * 24 ));
}

export const getRemainingHoursMinsSecs = (date1: Date, date2: Date) => {
  if(date1 > date2) 
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

  // get total seconds between the times
  let delta = Math.abs(date2.getTime() - date1.getTime()) / 1000;

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  
  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  const seconds = Math.floor(delta % 60);

  return {
    days,
    hours,
    minutes,
    seconds
  };
}
