export function createKeyboardHandler(handlers: {
	onToggle?: () => void;
	onReset?: () => void;
}): () => void {
	const keyup = (e: KeyboardEvent) => {
		switch (e.key) {
			case ' ':
			case 'p':
				e.preventDefault();
				handlers.onToggle?.();
				break;
			case 'r':
				e.preventDefault();
				handlers.onReset?.();
				break;
		}
	};
	document.addEventListener('keyup', keyup);
	return () => document.removeEventListener('keyup', keyup);
}

export function pad(n: number): string {
	return n.toString().padStart(2, '0');
}

export function formatTime(totalSeconds: number): string {
	const h = Math.floor(totalSeconds / 3600);
	const m = Math.floor((totalSeconds % 3600) / 60);
	const s = totalSeconds % 60;
	return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function parseTimeInput(value: string): { hours: number; minutes: number; seconds: number } {
	const [h, m, s] = value.split(':').map(Number);
	return { hours: h || 0, minutes: m || 0, seconds: s || 0 };
}
