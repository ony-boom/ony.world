/**
 * One motion policy for the whole site: morph only where the browser can, and never
 * against someone who asked for less of it. Both callers — the lightbox and the accent
 * switch — fall back to an instant change, so this is a capability test, not a feature gate.
 */
export function canMorph() {
	return (
		'startViewTransition' in document && !matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}
