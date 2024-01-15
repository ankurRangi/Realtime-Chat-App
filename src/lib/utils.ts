// Anytime we create conditional classes to alter applications, we will call this function

import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(inputs));
}