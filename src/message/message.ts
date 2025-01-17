import {
	bgBlack,
	bgBlue,
	bgBrightBlack,
	bgBrightBlue,
	bgBrightCyan,
	bgBrightGreen,
	bgBrightMagenta,
	bgBrightRed,
	bgBrightWhite,
	bgBrightYellow,
	bgColor,
	bgCyan,
	bgGreen,
	bgMagenta,
	bgRed,
	bgWhite,
	bgYellow,
} from "./bg-colors";
import { Color } from "./colors";
import {
	black,
	blue,
	brightBlack,
	brightBlue,
	brightCyan,
	brightGreen,
	brightMagenta,
	brightRed,
	brightWhite,
	brightYellow,
	cyan,
	fgColor,
	green,
	magenta,
	red,
	white,
	yellow,
} from "./fg-colors";
import {
	bold,
	conceal,
	crossedOut,
	font,
	italic,
	light,
	rBlink,
	reset,
	reverse,
	sBlink,
	underline,
} from "./styles";

export class Message {
	private message = "";
	private styleStack: string[] = [];

	constructor(initialMessage?: string) {
		this.message = initialMessage ?? "";
	}

	public toString(): string {
		return this.getStyledMessage();
	}

	public get content(): string {
		return this.getStyledMessage();
	}

	public get length(): number {
		return this.message.length;
	}

	private getStyledMessage(): string {
		const styles = this.styleStack.join("");
		return styles + this.message + reset();
	}

	public append(message: string): void;
	public append(message: Message): void;
	public append(message: string | Message): void {
		this.message = this.message.concat(
			message instanceof Message ? message.toString() : message,
		);
	}

	public prepend(message: string): void;
	public prepend(message: Message): void;
	public prepend(message: string | Message): void {
		this.message =
			message instanceof Message
				? message.toString().concat(this.message)
				: message.concat(this.message);
	}

	public clear(): void {
		this.message = "";
		this.styleStack = [];
	}

	public equals(message: string): boolean;
	public equals(message: Message): boolean;
	public equals(message: string | Message): boolean {
		return (
			this.message ===
			(message instanceof Message ? message.toString() : message)
		);
	}

	public includes(message: string): boolean;
	public includes(message: Message): boolean;
	public includes(message: string | Message): boolean {
		return this.message.includes(
			message instanceof Message ? message.toString() : message,
		);
	}

	public replace(search: string, replace: string): void;
	public replace(search: Message, replace: Message): void;
	public replace(search: string | Message, replace: string | Message): void {
		this.message = this.message.replace(
			search instanceof Message ? search.toString() : search,
			replace instanceof Message ? replace.toString() : replace,
		);
	}

	public split(separator: string): string[];
	public split(separator: Message): string[];
	public split(separator: string | Message): string[] {
		return this.message.split(
			separator instanceof Message ? separator.toString() : separator,
		);
	}

	public trim(): void {
		this.message = this.message.trim();
	}

	public trimEnd(): void {
		this.message = this.message.trimEnd();
	}

	public trimStart(): void {
		this.message = this.message.trimStart();
	}

	public toLowerCase(): void {
		this.message = this.message.toLowerCase();
	}

	public toUpperCase(): void {
		this.message = this.message.toUpperCase();
	}

	public toLocaleLowerCase(): void {
		this.message = this.message.toLocaleLowerCase();
	}

	public toLocaleUpperCase(): void {
		this.message = this.message.toLocaleUpperCase();
	}

	public charAt(index: number): string {
		return this.message.charAt(index);
	}

	public charCodeAt(index: number): number {
		return this.message.charCodeAt(index);
	}

	public concat(message: string): string;
	public concat(message: Message): string;
	public concat(message: string | Message): string {
		return this.message.concat(
			message instanceof Message ? message.toString() : message,
		);
	}

	public indexOf(search: string, fromIndex?: number): number;
	public indexOf(search: Message, fromIndex?: number): number;
	public indexOf(search: string | Message, fromIndex?: number): number {
		return this.message.indexOf(
			search instanceof Message ? search.toString() : search,
			fromIndex,
		);
	}

	public lastIndexOf(search: string, fromIndex?: number): number;
	public lastIndexOf(search: Message, fromIndex?: number): number;
	public lastIndexOf(search: string | Message, fromIndex?: number): number {
		return this.message.lastIndexOf(
			search instanceof Message ? search.toString() : search,
			fromIndex,
		);
	}

	public localeCompare(compareString: string): number;
	public localeCompare(compareString: Message): number;
	public localeCompare(compareString: string | Message): number {
		return this.message.localeCompare(
			compareString instanceof Message
				? compareString.toString()
				: compareString,
		);
	}

	public match(regexp: RegExp): RegExpMatchArray | null {
		return this.message.match(regexp);
	}

	public repeat(count: number): string {
		return this.message.repeat(count);
	}

	public search(regexp: RegExp): number {
		return this.message.search(regexp);
	}

	public slice(start?: number, end?: number): string {
		return this.message.slice(start, end);
	}

	public substr(from: number, length?: number): string {
		return this.message.substr(from, length);
	}

	public substring(start: number, end?: number): string {
		return this.message.substring(start, end);
	}

	public valueOf(): string {
		return this.message;
	}

	public colorizeFg(color: Color): void {
		if (typeof color === "string") {
			switch (color) {
				case "black":
					this.styleStack.push(black());
					break;
				case "red":
					this.styleStack.push(red());
					break;
				case "green":
					this.styleStack.push(green());
					break;
				case "yellow":
					this.styleStack.push(yellow());
					break;
				case "blue":
					this.styleStack.push(blue());
					break;
				case "magenta":
					this.styleStack.push(magenta());
					break;
				case "cyan":
					this.styleStack.push(cyan());
					break;
				case "white":
					this.styleStack.push(white());
					break;
				case "brightBlack":
					this.styleStack.push(brightBlack());
					break;
				case "brightRed":
					this.styleStack.push(brightRed());
					break;
				case "brightGreen":
					this.styleStack.push(brightGreen());
					break;
				case "brightYellow":
					this.styleStack.push(brightYellow());
					break;
				case "brightBlue":
					this.styleStack.push(brightBlue());
					break;
				case "brightMagenta":
					this.styleStack.push(brightMagenta());
					break;
				case "brightCyan":
					this.styleStack.push(brightCyan());
					break;
				case "brightWhite":
					this.styleStack.push(brightWhite());
					break;
				default:
					break;
			}
		} else {
			this.styleStack.push(fgColor(color));
		}
	}

	public colorizeBg(color: Color): void {
		if (typeof color === "string") {
			switch (color) {
				case "black":
					this.styleStack.push(bgBlack());
					break;
				case "red":
					this.styleStack.push(bgRed());
					break;
				case "green":
					this.styleStack.push(bgGreen());
					break;
				case "yellow":
					this.styleStack.push(bgYellow());
					break;
				case "blue":
					this.styleStack.push(bgBlue());
					break;
				case "magenta":
					this.styleStack.push(bgMagenta());
					break;
				case "cyan":
					this.styleStack.push(bgCyan());
					break;
				case "white":
					this.styleStack.push(bgWhite());
					break;
				case "brightBlack":
					this.styleStack.push(bgBrightBlack());
					break;
				case "brightRed":
					this.styleStack.push(bgBrightRed());
					break;
				case "brightGreen":
					this.styleStack.push(bgBrightGreen());
					break;
				case "brightYellow":
					this.styleStack.push(bgBrightYellow());
					break;
				case "brightBlue":
					this.styleStack.push(bgBrightBlue());
					break;
				case "brightMagenta":
					this.styleStack.push(bgBrightMagenta());
					break;
				case "brightCyan":
					this.styleStack.push(bgBrightCyan());
					break;
				case "brightWhite":
					this.styleStack.push(bgBrightWhite());
					break;
				default:
					break;
			}
		} else {
			this.styleStack.push(bgColor(color));
		}
	}

	public applyBold(): void {
		this.styleStack.push(bold());
	}

	public applyLight(): void {
		this.styleStack.push(light());
	}

	public applyItalic(): void {
		this.styleStack.push(italic());
	}

	public applyUnderline(): void {
		this.styleStack.push(underline());
	}

	public applySBlink(): void {
		this.styleStack.push(sBlink());
	}

	public applyRBlink(): void {
		this.styleStack.push(rBlink());
	}

	public applyReverse(): void {
		this.styleStack.push(reverse());
	}

	public applyConceal(): void {
		this.styleStack.push(conceal());
	}

	public applyCrossedOut(): void {
		this.styleStack.push(crossedOut());
	}

	public applyFont(fontNumber: number): void {
		this.styleStack.push(font(fontNumber));
	}
}
