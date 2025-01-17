export function reset() {
	return "\x1b[0m";
}

export function bold() {
	return "\x1b[1m";
}

export function light() {
	return "\x1b[2m";
}

export function italic() {
	return "\x1b[3m";
}

export function underline() {
	return "\x1b[4m";
}

export function sBlink() {
	return "\x1b[5m";
}

export function rBlink() {
	return "\x1b[6m";
}

export function reverse() {
	return "\x1b[5m";
}

export function conceal() {
	return "\x1b[5m";
}

export function crossedOut() {
	return "\x1b[5m";
}

export function font(font: number) {
	return `\x1b[${font + 10}m`;
}
