export const msToTimeString = (ms: number) => {
	const seconds = Math.floor((ms / 1000) % 60),
		minutes = Math.floor((ms / (1000 * 60)) % 60);
	// milliseconds = Math.floor((ms % 1000) / 100);
	// hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

	return [minutes, seconds].map(t => t.toString().padStart(2, '0')).join(':');
};
