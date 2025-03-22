import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getWeatherColor(value, type) {
  if (type === "wind") {
    if (value > 15) return "text-destructive"
    if (value > 10) return "text-yellow-500"
    return "text-green-500"
  } else {
    if (value > 60) return "text-destructive"
    if (value > 30) return "text-yellow-500"
    return "text-green-500"
  }
}