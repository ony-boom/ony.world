import { m } from '$lib/paraglide/messages';

export type Experience = {
	dates:
		| {
				from: Date;
				to: Date;
		  }
		| 'now';
	title: string;
	place?: {
		link: string;
		name: string;
	};
	description?: string;
};

export const experiences: Experience[] = [
	{
		dates: 'now',
		title: m.exp_nowTitle(),
		description: m.exp_nowDesc()
	},
	{
		dates: {
			from: new Date('2023-04-01'),
			to: new Date('2025-07-28')
		},
		title: m.exp_bocasayTitle(),
		place: {
			name: 'BOCASAY',
			link: 'https://www.bocasay.com'
		}
	},
	{
		dates: {
			from: new Date('2022-08-14'),
			to: new Date('2023-04-01')
		},
		title: m.exp_interTitle(),
		place: {
			name: 'BOCASAY',
			link: 'https://www.bocasay.com'
		}
	}
];
