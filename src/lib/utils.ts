import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function timePassed(date: Date): string {
	const now = new Date();
	const diff = Math.abs(now.getTime() - date.getTime());

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (days > 0) return `${days}g`;

	const hours = Math.floor(diff / (1000 * 60 * 60));
	if (hours > 0) return `${hours}s`;

	const minutes = Math.floor(diff / (1000 * 60));
	if (minutes > 0) return `${minutes}d`;

	return "Şimdi";
}
