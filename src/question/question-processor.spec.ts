import { Readable, Writable } from "node:stream";
import { QuestionProcessor } from "./question-processor";
import {
	ChoiceQuestion,
	MultipleChoiceQuestion,
	NumberedChoiceQuestion,
	OpenTextQuestion,
	OpenTextWithOptionsQuestion,
} from "./questions";

describe("QuestionProcessor", () => {
	let questionProcessor: QuestionProcessor;
	let mockInput: Readable;
	let mockOutput: Writable;
	let outputData: string[];
	let inputCallback: (data: string) => void;

	beforeEach(() => {
		outputData = [];
		mockOutput = new Writable({
			write(chunk, encoding, callback) {
				outputData.push(chunk.toString());
				callback();
			},
		});

		mockInput = new Readable({
			read() {},
		});

		questionProcessor = new QuestionProcessor({
			input: mockInput,
			output: mockOutput,
		});

		// Armazena o callback para simular entrada do usuário
		mockInput.on("data", (data) => {
			if (inputCallback) {
				inputCallback(data.toString());
			}
		});
	});

	describe("ask - OpenTextQuestion", () => {
		it("deve retornar a resposta do usuário para uma pergunta aberta", async () => {
			const question = new OpenTextQuestion("Qual é seu nome?");
			const responsePromise = questionProcessor.ask(question);

			// Simula entrada do usuário
			mockInput.push("João\n");

			const response = await responsePromise;
			expect(response).toBe("João");
			expect(outputData).toContain("Qual é seu nome?\n");
			expect(outputData).toContain("> ");
		});
	});

	describe("ask - ChoiceQuestion", () => {
		it("deve permitir selecionar uma opção usando as setas", async () => {
			const question = new ChoiceQuestion("Escolha uma opção:", [
				"A",
				"B",
				"C",
			]);
			const responsePromise = questionProcessor.ask(question);

			// Simula seta para baixo e enter
			mockInput.push("\u001B\u005B\u0042"); // Seta para baixo
			mockInput.push("\r"); // Enter

			const response = await responsePromise;
			expect(response).toBe("B");
			expect(outputData.join("")).toContain("> B");
		});
	});

	describe("ask - NumberedChoiceQuestion", () => {
		it("deve permitir selecionar uma opção usando números", async () => {
			const question = new NumberedChoiceQuestion("Escolha uma opção:", [
				"A",
				"B",
				"C",
			]);
			const responsePromise = questionProcessor.ask(question);

			// Simula usuário escolhendo opção 2
			mockInput.push("2\n");

			const response = await responsePromise;
			expect(response).toBe("B");
			expect(outputData.join("")).toContain("2. B");
		});

		it("deve solicitar nova entrada para opção inválida", async () => {
			const question = new NumberedChoiceQuestion("Escolha uma opção:", [
				"A",
				"B",
				"C",
			]);
			const responsePromise = questionProcessor.ask(question);

			// Simula usuário escolhendo opção inválida e depois válida
			mockInput.push("4\n"); // Inválida
			setTimeout(() => mockInput.push("1\n"), 100); // Válida

			const response = await responsePromise;
			expect(response).toBe("A");
			expect(outputData.join("")).toContain("Invalid option");
		});
	});

	describe("ask - OpenTextWithOptionsQuestion", () => {
		it("deve aceitar uma resposta que corresponda às opções", async () => {
			const question = new OpenTextWithOptionsQuestion("Digite uma cor:", [
				"vermelho",
				"azul",
				"verde",
			]);
			const responsePromise = questionProcessor.ask(question);

			mockInput.push("azul\n");

			const response = await responsePromise;
			expect(response).toBe("azul");
		});

		it("deve solicitar nova entrada para opção não listada", async () => {
			const question = new OpenTextWithOptionsQuestion("Digite uma cor:", [
				"vermelho",
				"azul",
				"verde",
			]);
			const responsePromise = questionProcessor.ask(question);

			mockInput.push("amarelo\n"); // Inválida
			setTimeout(() => mockInput.push("verde\n"), 100); // Válida

			const response = await responsePromise;
			expect(response).toBe("verde");
			expect(outputData.join("")).toContain("Invalid option");
		});
	});

	describe("ask - MultipleChoiceQuestion", () => {
		it("deve permitir selecionar múltiplas opções", async () => {
			const question = new MultipleChoiceQuestion(
				"Escolha as cores:",
				["vermelho", "azul", "verde"],
				1,
				2,
			);
			const responsePromise = questionProcessor.ask(question);

			// Simula seleção de duas opções
			mockInput.push(" "); // Seleciona primeira opção
			mockInput.push("\u001B\u005B\u0042"); // Seta para baixo
			mockInput.push(" "); // Seleciona segunda opção
			mockInput.push("\r"); // Confirma

			const response = await responsePromise;
			expect(response).toEqual(["vermelho", "azul"]);
			expect(outputData.join("")).toContain("[x]");
		});

		it("deve respeitar o número mínimo de seleções", async () => {
			const question = new MultipleChoiceQuestion(
				"Escolha as cores:",
				["vermelho", "azul", "verde"],
				2,
			);
			const responsePromise = questionProcessor.ask(question);

			// Tenta confirmar com apenas uma seleção
			mockInput.push(" "); // Seleciona primeira opção
			mockInput.push("\r"); // Tenta confirmar (deve falhar)
			setTimeout(() => {
				mockInput.push("\u001B\u005B\u0042"); // Seta para baixo
				mockInput.push(" "); // Seleciona segunda opção
				mockInput.push("\r"); // Confirma
			}, 100);

			const response = await responsePromise;
			expect(response.length).toBe(2);
			expect(outputData.join("")).toContain("Please select at least 2 options");
		});
	});
});
