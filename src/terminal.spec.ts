import { Message } from "./message/message";
import { reset } from "./message/styles";
import { Terminal } from "./terminal";

describe("Terminal", () => {
	let terminal: Terminal;
	let outputData: string;
	let errorData: string;

	beforeEach(() => {
		outputData = "";
		errorData = "";
		terminal = new Terminal({
			output: {
				write: (message: string) => {
					outputData += message;
				},
			} as NodeJS.WritableStream,
			error: {
				write: (message: string) => {
					errorData += message;
				},
			} as NodeJS.WritableStream,
		});
	});

	it("deve escrever uma mensagem no output", () => {
		const message = new Message("Hello, Terminal!");
		terminal.write(message.toString());
		expect(outputData).toBe(`Hello, Terminal!${reset()}`);
	});

	it("deve escrever uma mensagem com nova linha no output", () => {
		const message = new Message("Hello, Terminal!");
		terminal.writeln(message.toString());
		expect(outputData).toBe(`Hello, Terminal!${reset()}\n`);
	});

	it("deve escrever uma mensagem no error", () => {
		const message = new Message("Error occurred!");
		terminal.errorWrite(message.toString());
		expect(errorData).toBe(`Error occurred!${reset()}`);
	});

	it("deve escrever uma mensagem com nova linha no error", () => {
		const message = new Message("Error occurred!");
		terminal.errorWriteln(message.toString());
		expect(errorData).toBe(`Error occurred!${reset()}\n`);
	});
});
