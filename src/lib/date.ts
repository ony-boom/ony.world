import type { Locale } from './paraglide/runtime';

export function formatDate(dateString: string, locale: Locale = 'en') {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat(locale, {
		dateStyle: 'long',
		timeStyle: undefined
	}).format(date);
}
