import { getLocale } from './paraglide/runtime';

type FormatDateOptions = {
	showDay?: boolean;
	dateStyle?: Intl.DateTimeFormatOptions['dateStyle'];
	timeStyle?: Intl.DateTimeFormatOptions['timeStyle'];
};

export function formatDate(dateLike: string | Date, options: FormatDateOptions = {}) {
	const locale = getLocale();
	const date = typeof dateLike === 'string' ? new Date(dateLike) : dateLike;

	const { showDay = true, dateStyle = 'long', timeStyle } = options;

	if (!showDay) {
		const intlOptions: Intl.DateTimeFormatOptions = {
			month: 'long',
			year: 'numeric',
			timeStyle
		};

		return new Intl.DateTimeFormat(locale, intlOptions).format(date);
	}

	const intlOptions: Intl.DateTimeFormatOptions = {
		dateStyle,
		timeStyle
	};

	return new Intl.DateTimeFormat(locale, intlOptions).format(date);
}
