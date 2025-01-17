import { Writable } from "node:stream";
import { Message } from "./message";
import { MessageProcessor } from "./message-processor";

describe("MessageProcessor", () => {
	let messageProcessor: MessageProcessor;
	let mockOutput: Writable;
	let mockError: Writable;
	let outputData: string[];
	let errorData: string[];

	beforeEach(() => {
		outputData = [];
		errorData = [];

		mockOutput = new Writable({
			write(chunk, encoding, callback) {
				outputData.push(chunk.toString());
				callback();
			},
		});

		mockError = new Writable({
			write(chunk, encoding, callback) {
				errorData.push(chunk.toString());
				callback();
			},
		});

		messageProcessor = new MessageProcessor({
			output: mockOutput,
			error: mockError,
		});
	});

	describe("write", () => {
		it("deve escrever uma string simples", () => {
			messageProcessor.write("teste");
			expect(outputData).toEqual(["teste"]);
		});

		it("deve escrever uma mensagem formatada", () => {
			const message = new Message("teste");
			message.colorizeFg("red");
			messageProcessor.write(message);
			expect(outputData[0]).toContain("teste");
			expect(outputData[0].includes("\u001b[")).toBe(true);
			expect(outputData[0].includes("m")).toBe(true);
		});
	});

	describe("writeln", () => {
		it("deve escrever uma string com quebra de linha", () => {
			messageProcessor.writeln("teste");
			expect(outputData).toEqual(["teste\n"]);
		});

		it("deve escrever uma mensagem formatada com quebra de linha", () => {
			const message = new Message("teste");
			message.colorizeFg("blue");
			messageProcessor.writeln(message);
			expect(outputData[0]).toContain("teste\n");
			expect(outputData[0].includes("\u001b[")).toBe(true);
			expect(outputData[0].includes("m")).toBe(true);
		});
	});

	describe("errorWrite", () => {
		it("deve escrever uma string no stream de erro", () => {
			messageProcessor.errorWrite("erro");
			expect(errorData).toEqual(["erro"]);
		});

		it("deve escrever uma mensagem formatada no stream de erro", () => {
			const message = new Message("erro");
			message.colorizeFg("red");
			messageProcessor.errorWrite(message);
			expect(errorData[0]).toContain("erro");
			expect(errorData[0].includes("\u001b[")).toBe(true);
			expect(errorData[0].includes("m")).toBe(true);
		});
	});

	describe("errorWriteln", () => {
		it("deve escrever uma string com quebra de linha no stream de erro", () => {
			messageProcessor.errorWriteln("erro");
			expect(errorData).toEqual(["erro\n"]);
		});

		it("deve escrever uma mensagem formatada com quebra de linha no stream de erro", () => {
			const message = new Message("erro");
			message.colorizeFg("red");
			messageProcessor.errorWriteln(message);
			expect(errorData[0]).toContain("erro\n");
			expect(errorData[0].includes("\u001b[")).toBe(true);
			expect(errorData[0].includes("m")).toBe(true);
		});
	});
});
