import {
	ChoiceQuestion,
	MultipleChoiceQuestion,
	NumberedChoiceQuestion,
	OpenTextQuestion,
	OpenTextWithOptionsQuestion,
} from "./questions";

describe("Questions", () => {
	describe("OpenTextQuestion", () => {
		it("deve criar uma questão de texto aberto", () => {
			const question = new OpenTextQuestion("Qual é seu nome?");
			expect(question.questionText).toBe("Qual é seu nome?");
		});
	});

	describe("ChoiceQuestion", () => {
		it("deve criar uma questão de escolha única", () => {
			const options = ["Sim", "Não", "Talvez"];
			const question = new ChoiceQuestion("Você concorda?", options);
			expect(question.questionText).toBe("Você concorda?");
			expect(question.options).toEqual(options);
		});
	});

	describe("NumberedChoiceQuestion", () => {
		it("deve criar uma questão de escolha numerada", () => {
			const options = ["A", "B", "C"];
			const question = new NumberedChoiceQuestion(
				"Escolha uma opção:",
				options,
			);
			expect(question.questionText).toBe("Escolha uma opção:");
			expect(question.options).toEqual(options);
		});
	});

	describe("OpenTextWithOptionsQuestion", () => {
		it("deve criar uma questão de texto com opções válidas", () => {
			const options = ["vermelho", "azul", "verde"];
			const question = new OpenTextWithOptionsQuestion(
				"Digite uma cor:",
				options,
			);
			expect(question.questionText).toBe("Digite uma cor:");
			expect(question.options).toEqual(options);
		});
	});

	describe("MultipleChoiceQuestion", () => {
		it("deve criar uma questão de múltipla escolha com valores padrão", () => {
			const options = ["A", "B", "C"];
			const question = new MultipleChoiceQuestion(
				"Escolha as opções:",
				options,
			);
			expect(question.questionText).toBe("Escolha as opções:");
			expect(question.options).toEqual(options);
			expect(question.minSelections).toBe(1);
			expect(question.maxSelections).toBeUndefined();
		});

		it("deve criar uma questão de múltipla escolha com seleção mínima", () => {
			const options = ["A", "B", "C"];
			const question = new MultipleChoiceQuestion(
				"Escolha ao menos duas opções:",
				options,
				2,
			);
			expect(question.questionText).toBe("Escolha ao menos duas opções:");
			expect(question.options).toEqual(options);
			expect(question.minSelections).toBe(2);
			expect(question.maxSelections).toBeUndefined();
		});

		it("deve criar uma questão de múltipla escolha com seleção mínima e máxima", () => {
			const options = ["A", "B", "C", "D"];
			const question = new MultipleChoiceQuestion(
				"Escolha entre 2 e 3 opções:",
				options,
				2,
				3,
			);
			expect(question.questionText).toBe("Escolha entre 2 e 3 opções:");
			expect(question.options).toEqual(options);
			expect(question.minSelections).toBe(2);
			expect(question.maxSelections).toBe(3);
		});
	});
});
