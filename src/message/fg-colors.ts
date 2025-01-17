import { InvalidColorRangeError } from "../errors/invalid-color-range.error";
import { RGB } from "./colors";

export function black() {
	return "\x1b[30m";
}

export function red() {
	return "\x1b[31m";
}

export function green() {
	return "\x1b[32m";
}

export function yellow() {
	return "\x1b[33m";
}

export function blue() {
	return "\x1b[34m";
}

export function magenta() {
	return "\x1b[35m";
}

export function cyan() {
	return "\x1b[36m";
}

export function white() {
	return "\x1b[37m";
}

export function brightBlack() {
	return "\x1b[90m";
}

export function brightRed() {
	return "\x1b[91m";
}

export function brightGreen() {
	return "\x1b[92m";
}

export function brightYellow() {
	return "\x1b[93m";
}

export function brightBlue() {
	return "\x1b[94m";
}

export function brightMagenta() {
	return "\x1b[95m";
}

export function brightCyan() {
	return "\x1b[96m";
}

export function brightWhite() {
	return "\x1b[97m";
}

export function fgColor(color: number): string;
export function fgColor(color: RGB): string;
export function fgColor(color: number | RGB): string {
	let colorCode = "";

	if (typeof color === "number") {
		if (color < 0 || color > 255) {
			throw new InvalidColorRangeError(color);
		}
		colorCode = `5;${color}`;
	} else {
		const { r, g, b } = color;
		const error = new InvalidColorRangeError({
			r,
			g,
			b,
		});
		if (r < 0 || r > 255) {
			error.markR();
		}
		if (g < 0 || g > 255) {
			error.markG();
		}
		if (b < 0 || b > 255) {
			error.markB();
		}
		if (error.isRGB) {
			throw error;
		}
		colorCode = `2;${r};${g};${b}`;
	}

	return `\x1b[38;${colorCode}m`;
}

export function defaultColor() {
	return "\x1b[39m";
}
