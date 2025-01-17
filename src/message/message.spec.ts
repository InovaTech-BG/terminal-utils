import { bgBlue, bgYellow } from "./bg-colors";
import { green, red } from "./fg-colors";
import { Message } from "./message";
import { bold, italic, reset, underline } from "./styles";

describe("Message", () => {
	it("should initialize with an empty message", () => {
		const message = new Message();
		expect(message.toString()).toBe(`${reset()}`);
	});

	it("should initialize with a given message", () => {
		const message = new Message("Hello");
		expect(message.toString()).toBe(`Hello${reset()}`);
	});

	it("should append a string to the message", () => {
		const message = new Message("Hello");
		message.append(" World");
		expect(message.toString()).toBe(`Hello World${reset()}`);
	});

	it("should prepend a string to the message", () => {
		const message = new Message("World");
		message.prepend("Hello ");
		expect(message.toString()).toBe(`Hello World${reset()}`);
	});

	it("should clear the message", () => {
		const message = new Message("Hello");
		message.clear();
		expect(message.toString()).toBe(`${reset()}`);
	});

	it("should check if the message equals a string", () => {
		const message = new Message("Hello");
		expect(message.equals("Hello")).toBe(true);
		expect(message.equals("World")).toBe(false);
	});

	it("should check if the message includes a string", () => {
		const message = new Message("Hello World");
		expect(message.includes("World")).toBe(true);
		expect(message.includes("world")).toBe(false);
	});

	it("should replace a string in the message", () => {
		const message = new Message("Hello World");
		message.replace("World", "Universe");
		expect(message.toString()).toBe(`Hello Universe${reset()}`);
	});

	it("should split the message by a separator", () => {
		const message = new Message("Hello World");
		const parts = message.split(" ");
		expect(parts).toEqual(["Hello", "World"]);
	});

	it("should trim the message", () => {
		const message = new Message("  Hello World  ");
		message.trim();
		expect(message.toString()).toBe(`Hello World${reset()}`);
	});

	it("should convert the message to lower case", () => {
		const message = new Message("Hello World");
		message.toLowerCase();
		expect(message.toString()).toBe(`hello world${reset()}`);
	});

	it("should convert the message to upper case", () => {
		const message = new Message("Hello World");
		message.toUpperCase();
		expect(message.toString()).toBe(`HELLO WORLD${reset()}`);
	});

	it("should apply bold style", () => {
		const message = new Message("Hello");
		message.applyBold();
		expect(message.toString()).toContain(`${bold()}Hello${reset()}`);
	});

	it("should apply italic style", () => {
		const message = new Message("Hello");
		message.applyItalic();
		expect(message.toString()).toContain(`${italic()}Hello${reset()}`);
	});

	it("should apply underline style", () => {
		const message = new Message("Hello");
		message.applyUnderline();
		expect(message.toString()).toContain(`${underline()}Hello${reset()}`);
	});

	it("should apply multiple styles", () => {
		const message = new Message("Hello");
		message.applyBold();
		message.applyItalic();
		expect(message.toString()).toContain(`${bold()}${italic()}Hello${reset()}`);
	});

	it("should apply foreground color", () => {
		const message = new Message("Hello");
		message.colorizeFg("red");
		expect(message.toString()).toContain(`${red()}Hello${reset()}`);
	});

	it("should apply background color", () => {
		const message = new Message("Hello");
		message.colorizeBg("blue");
		expect(message.toString()).toContain(`${bgBlue()}Hello${reset()}`);
	});

	it("should apply multiple colors and styles", () => {
		const message = new Message("Hello");
		message.colorizeFg("green");
		message.colorizeBg("yellow");
		message.applyUnderline();
		expect(message.toString()).toContain(
			`${green()}${bgYellow()}${underline()}Hello${reset()}`,
		);
	});
});
