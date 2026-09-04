import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Accent = 'amber' | 'mint' | 'iris' | 'ash';

// Order is the cycle order: pressing the switch walks this list and wraps. Mostly hues,
// but ash drains the chroma instead; either way what an accent means lives in app.css as
// :root[data-accent='…'], so adding one means editing both.
const ACCENTS: Accent[] = ['amber', 'mint', 'iris', 'ash'];

const isAccent = (value: unknown): value is Accent => ACCENTS.includes(value as Accent);

// theme-init.js stamps the root before first paint from whatever localStorage holds, so
// validating a possibly-stale value is this side's job.
export const accent = writable<Accent>(
	browser && isAccent(window.accent) ? window.accent : ACCENTS[0]
);

export function nextAccent(current: Accent): Accent {
	return ACCENTS[(ACCENTS.indexOf(current) + 1) % ACCENTS.length];
}

export function initAccent() {
	if (!browser) return;

	// subscribe fires immediately with the value theme-init.js already applied; writing it
	// straight back would re-stamp the root and re-hit localStorage for nothing.
	let primed = false;
	return accent.subscribe((value) => {
		if (primed) window.updateAccent(value);
		primed = true;
	});
}
