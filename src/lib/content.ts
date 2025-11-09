import type { Locale } from './paraglide/runtime';

export type ContentType = 'projects' | 'posts';

export const slugFromPath = (path: string) =>
	path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;

export async function loadContent(
	type: ContentType,
	locale: Locale,
	slug: string
): Promise<App.BlogPost | null>;
export async function loadContent(type: ContentType, locale?: Locale): Promise<App.BlogPost[]>;
export async function loadContent(
	type: ContentType,
	locale: Locale = 'en',
	slug?: string
): Promise<App.BlogPost | App.BlogPost[] | null> {
	const modules = {
		projects: {
			en: import.meta.glob('/src/content/projects/en/*.{md,svx,svelte.md}'),
			fr: import.meta.glob('/src/content/projects/fr/*.{md,svx,svelte.md}')
		},
		posts: {
			en: import.meta.glob('/src/content/posts/en/*.{md,svx,svelte.md}'),
			fr: import.meta.glob('/src/content/posts/fr/*.{md,svx,svelte.md}')
		}
	} as const;

	const selected = modules[type]?.[locale] ?? {};

	const loadItem = async (path: string, resolver: App.MdsvexResolver): Promise<App.BlogPost> => {
		const post = await resolver();
		const metadata = (post as unknown as App.MdsvexFile).metadata;
		const slug = slugFromPath(path);

		return {
			Component: post.default,
			metadata: {
				...metadata,
				slug,
				path,
				coverType: metadata.coverType ?? 'image'
			}
		} as App.BlogPost;
	};

	if (slug) {
		const entry = Object.entries(selected).find(([path]) => slugFromPath(path) === slug);
		if (!entry) return null;

		const [path, resolver] = entry;
		return await loadItem(path, resolver as App.MdsvexResolver);
	}

	const contentPromises = Object.entries(selected).map(([path, resolver]) =>
		loadItem(path, resolver as App.MdsvexResolver)
	);

	const content = await Promise.all(contentPromises);

	return content
		.filter((c) => c.metadata.published)
		.toSorted((a, b) => (new Date(a.metadata.date) > new Date(b.metadata.date) ? -1 : 1));
}

export async function loadContentBySlug(type: ContentType, slug: string, locale: Locale = 'en') {
	return loadContent(type, locale, slug);
}
