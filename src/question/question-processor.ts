import { TerminalBase } from "../terminal-base";
import {
	ChoiceQuestion,
	MultipleChoiceQuestion,
	NumberedChoiceQuestion,
	OpenTextQuestion,
	OpenTextWithOptionsQuestion,
	Question,
} from "./questions";

export class QuestionProcessor extends TerminalBase {
	public async ask(question: OpenTextQuestion): Promise<string>;
	public async ask(question: ChoiceQuestion): Promise<string>;
	public async ask(question: NumberedChoiceQuestion): Promise<string>;
	public async ask(question: OpenTextWithOptionsQuestion): Promise<string>;
	public async ask(question: MultipleChoiceQuestion): Promise<string[]>;
	public async ask(question: Question): Promise<string | string[]> {
		if (question instanceof OpenTextQuestion) {
			return this.processOpenText(question);
		}
		if (question instanceof ChoiceQuestion) {
			return this.processChoice(question);
		}
		if (question instanceof NumberedChoiceQuestion) {
			return this.processNumberedChoice(question);
		}
		if (question instanceof OpenTextWithOptionsQuestion) {
			return this.processOpenTextWithOptions(question);
		}
		if (question instanceof MultipleChoiceQuestion) {
			return this.processMultipleChoice(question);
		}
		throw new Error("Tipo de questão não suportado");
	}

	private async processOpenText(question: OpenTextQuestion): Promise<string> {
		this.writeln(question.questionText);
		return await this.prompt("> ");
	}

	private async processChoice(question: ChoiceQuestion): Promise<string> {
		let selectedIndex = 0;
		const renderOptions = () => {
			this.clear();
			this.writeln(question.questionText);
			question.options.forEach((option, index) => {
				if (index === selectedIndex) {
					this.writeln(`> ${option}`);
				} else {
					this.writeln(`  ${option}`);
				}
			});
		};

		renderOptions();

		return new Promise((resolve) => {
			const onKeyPress = (key: string) => {
				if (key === "\u001B\u005B\u0041") {
					// up arrow
					selectedIndex =
						selectedIndex > 0 ? selectedIndex - 1 : question.options.length - 1;
				} else if (key === "\u001B\u005B\u0042") {
					// down arrow
					selectedIndex =
						selectedIndex < question.options.length - 1 ? selectedIndex + 1 : 0;
				} else if (key === "\r") {
					// enter
					this.input.removeListener("data", onKeyPress);
					resolve(question.options[selectedIndex]);
				}
				renderOptions();
			};

			this.input.on("data", onKeyPress);
		});
	}

	private async processNumberedChoice(
		question: NumberedChoiceQuestion,
	): Promise<string> {
		this.writeln(question.questionText);
		question.options.forEach((option, index) => {
			this.writeln(`${index + 1}. ${option}`);
		});

		return new Promise((resolve) => {
			const onResponse = async (response: string) => {
				const index = Number.parseInt(response.trim(), 10) - 1;
				if (index >= 0 && index < question.options.length) {
					this.input.removeListener("data", onResponse);
					resolve(question.options[index]);
				} else {
					this.writeln("Invalid option. Please try again.");
					const newResponse = await this.prompt("> ");
					onResponse(newResponse);
				}
			};

			this.prompt("> ").then(onResponse);
		});
	}

	private async processOpenTextWithOptions(
		question: OpenTextWithOptionsQuestion,
	): Promise<string> {
		this.writeln(question.questionText);
		return new Promise((resolve) => {
			const onResponse = async (response: string) => {
				const trimmedResponse = response.trim();
				if (question.options.includes(trimmedResponse)) {
					this.input.removeListener("data", onResponse);
					resolve(trimmedResponse);
				} else {
					this.writeln("Invalid option. Please try again.");
					const newResponse = await this.prompt("> ");
					onResponse(newResponse);
				}
			};

			this.prompt("> ").then(onResponse);
		});
	}

	private async processMultipleChoice(
		question: MultipleChoiceQuestion,
	): Promise<string[]> {
		const selectedIndices = new Set<number>();
		let currentIndex = 0;

		const renderOptions = () => {
			this.clear();
			this.writeln(question.questionText);
			question.options.forEach((option, index) => {
				const isSelected = selectedIndices.has(index);
				const prefix = index === currentIndex ? ">" : " ";
				const selectionMark = isSelected ? "[x]" : "[ ]";
				this.writeln(`${prefix} ${selectionMark} ${option}`);
			});
		};

		renderOptions();

		return new Promise((resolve) => {
			const onKeyPress = (key: string) => {
				if (key === "\u001B\u005B\u0041") {
					// up arrow
					currentIndex =
						currentIndex > 0 ? currentIndex - 1 : question.options.length - 1;
				} else if (key === "\u001B\u005B\u0042") {
					// down arrow
					currentIndex =
						currentIndex < question.options.length - 1 ? currentIndex + 1 : 0;
				} else if (key === " ") {
					// space
					if (selectedIndices.has(currentIndex)) {
						selectedIndices.delete(currentIndex);
					} else if (
						selectedIndices.size <
						(question.maxSelections || question.options.length)
					) {
						selectedIndices.add(currentIndex);
					}
				} else if (key === "\r") {
					// enter
					if (selectedIndices.size >= question.minSelections) {
						this.input.removeListener("data", onKeyPress);
						resolve(
							Array.from(selectedIndices).map(
								(index) => question.options[index],
							),
						);
					} else {
						this.writeln(
							`Please select at least ${question.minSelections} options.`,
						);
					}
				}
				renderOptions();
			};

			this.input.on("data", onKeyPress);
		});
	}
}
