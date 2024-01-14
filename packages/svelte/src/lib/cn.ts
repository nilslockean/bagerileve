import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

// Helper utility that makes it easier to handle class name manipulation in Tailwind,
// ensuring that class names are appropriately merged.
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
