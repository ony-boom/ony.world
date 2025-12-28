export type ContentType = 'projects' | 'posts';

export const slugFromPath = (path: string) =>
	path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;

export async function loadContent(type: ContentType, slug: string): Promise<App.BlogPost | null>;
export async function loadContent(type: ContentType): Promise<App.BlogPost[]>;
export async function loadContent(
	type: ContentType,
	slug?: string
): Promise<App.BlogPost | App.BlogPost[] | null> {
	const modules = {
		projects: import.meta.glob('/src/content/projects/*.{md,svx,svelte.md}'),
		posts: import.meta.glob('/src/content/posts/*.{md,svx,svelte.md}')
	} as const;

	const selected = modules[type] ?? {};

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
				coverType: metadata?.coverType ?? 'image'
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

export function loadContentBySlug(type: ContentType, slug: string) {
	return loadContent(type, slug);
}
