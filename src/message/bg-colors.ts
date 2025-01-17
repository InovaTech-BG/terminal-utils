import { InvalidColorRangeError } from "../errors/invalid-color-range.error";
import { RGB } from "./colors";

export function bgBlack() {
	return "\x1b[40m";
}

export function bgRed() {
	return "\x1b[41m";
}

export function bgGreen() {
	return "\x1b[42m";
}

export function bgYellow() {
	return "\x1b[43m";
}

export function bgBlue() {
	return "\x1b[44m";
}

export function bgMagenta() {
	return "\x1b[45m";
}

export function bgCyan() {
	return "\x1b[46m";
}

export function bgWhite() {
	return "\x1b[47m";
}

export function bgBrightBlack() {
	return "\x1b[100m";
}

export function bgBrightRed() {
	return "\x1b[101m";
}

export function bgBrightGreen() {
	return "\x1b[102m";
}

export function bgBrightYellow() {
	return "\x1b[103m";
}

export function bgBrightBlue() {
	return "\x1b[104m";
}

export function bgBrightMagenta() {
	return "\x1b[105m";
}

export function bgBrightCyan() {
	return "\x1b[106m";
}

export function bgBrightWhite() {
	return "\x1b[107m";
}

export function bgColor(color: number): string;
export function bgColor(color: RGB): string;
export function bgColor(color: number | RGB): string {
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

	return `\x1b[48;${colorCode}m`;
}

export function defaultBgColor() {
	return "\x1b[49m";
}
