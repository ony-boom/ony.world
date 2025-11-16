export type Experiences = {
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

export const experiences: Experiences[] = [
	{
		dates: 'now',
		title: ''
	}
];
