export type Experience = {
	role: string;
	company: string;
	/** Optional link to the company. */
	url?: string;
	/** Start year, e.g. "2022". */
	from: string;
	/** End year, or "now" for current. */
	to: string;
	/** Optional, e.g. "Remote", "US". */
	location?: string;
};

// Edit this list to update the Experience section on the home page.
// Order it most-recent first. These are placeholders — replace with your own.
export const experience: Experience[] = [
	{
		role: 'FullStack Developer',
		company: 'Fluentech',
		url: 'https://www.fluentech-group.com',
		from: '',
		to: 'now',
		location: 'Madagascar'
	},
	{
		role: 'Freelance Frontend/Mobile Developer',
		company: 'eGOKIA',
		from: '2025',
		to: 'now',
		location: 'Remote'
	},
	{
		role: 'FullStack Developer',
		company: 'Deepdev',
		from: '2025',
		to: '2026',
		location: 'Madagascar'
	},
	{
		role: 'Frontend Developer',
		company: 'BOCASAY',
		url: 'https://www.bocasay.com/',
		from: '2022',
		to: '2025',
		location: 'Madagascar'
	}
];
