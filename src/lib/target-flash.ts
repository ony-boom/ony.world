export function initTargetFlash() {
	const flash = (id: string) => {
		const el = document.getElementById(id);
		if (!el) return;
		el.classList.remove('target-flash');
		void el.offsetWidth;
		el.classList.add('target-flash');
	};

	const onClick = (e: MouseEvent) => {
		const link = (e.target as HTMLElement)?.closest?.('a[href*="#"]');
		if (!(link instanceof HTMLAnchorElement)) return;
		const url = new URL(link.href, location.href);
		if (url.pathname !== location.pathname || !url.hash) return;
		const id = decodeURIComponent(url.hash.slice(1));
		requestAnimationFrame(() => flash(id));
	};

	const onHashChange = () => {
		if (location.hash) flash(decodeURIComponent(location.hash.slice(1)));
	};

	document.addEventListener('click', onClick);
	window.addEventListener('hashchange', onHashChange);

	if (location.hash) {
		requestAnimationFrame(() => flash(decodeURIComponent(location.hash.slice(1))));
	}

	return () => {
		document.removeEventListener('click', onClick);
		window.removeEventListener('hashchange', onHashChange);
	};
}
