import { Message } from "./message/message";
import { MessageProcessor } from "./message/message-processor";
import { QuestionProcessor } from "./question/question-processor";
import {
	ChoiceQuestion,
	MultipleChoiceQuestion,
	NumberedChoiceQuestion,
	OpenTextQuestion,
	OpenTextWithOptionsQuestion,
} from "./question/questions";
import { TerminalBase, TerminalOptions } from "./terminal-base";

export interface QuestionInput {
	questionText: string;
	options?: string[];
	minSelections?: number;
	maxSelections?: number;
}

export class Terminal extends TerminalBase {
	private messageProcessor: MessageProcessor;
	private questionProcessor: QuestionProcessor;

	constructor(options: TerminalOptions = {}) {
		super(options);
		this.messageProcessor = new MessageProcessor(options);
		this.questionProcessor = new QuestionProcessor(options);
	}

	// Message methods
	public write(message: string | Message): void {
		this.messageProcessor.write(message);
	}

	public writeln(message: string | Message): void {
		this.messageProcessor.writeln(message);
	}

	public errorWrite(message: string | Message): void {
		this.messageProcessor.errorWrite(message);
	}

	public errorWriteln(message: string | Message): void {
		this.messageProcessor.errorWriteln(message);
	}

	// Question methods
	public async askOpenText(question: QuestionInput): Promise<string> {
		return this.questionProcessor.ask(
			new OpenTextQuestion(question.questionText),
		);
	}

	public async askChoice(question: QuestionInput): Promise<string> {
		if (!question.options?.length) {
			throw new Error("Options are required for choice questions");
		}
		return this.questionProcessor.ask(
			new ChoiceQuestion(question.questionText, question.options),
		);
	}

	public async askNumberedChoice(question: QuestionInput): Promise<string> {
		if (!question.options?.length) {
			throw new Error("Options are required for numbered choice questions");
		}
		return this.questionProcessor.ask(
			new NumberedChoiceQuestion(question.questionText, question.options),
		);
	}

	public async askOpenTextWithOptions(
		question: QuestionInput,
	): Promise<string> {
		if (!question.options?.length) {
			throw new Error(
				"Options are required for open text with options questions",
			);
		}
		return this.questionProcessor.ask(
			new OpenTextWithOptionsQuestion(question.questionText, question.options),
		);
	}

	public async askMultipleChoice(question: QuestionInput): Promise<string[]> {
		if (!question.options?.length) {
			throw new Error("Options are required for multiple choice questions");
		}
		const multipleChoiceQuestion = new MultipleChoiceQuestion(
			question.questionText,
			question.options,
			question.minSelections,
			question.maxSelections,
		);
		const result = await this.questionProcessor.ask(multipleChoiceQuestion);
		if (!Array.isArray(result)) {
			throw new Error("Expected array result from multiple choice question");
		}
		return result;
	}
}
