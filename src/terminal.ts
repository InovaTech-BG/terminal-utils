import { Message } from "./message/message";
import { MessageProcessor } from "./message/message-processor";
import { Question } from "./question/question";
import { QuestionProcessor } from "./question/question-processor";
import {
	ChoiceQuestion,
	MultipleChoiceQuestion,
	NumberedChoiceQuestion,
	OpenTextQuestion,
	OpenTextWithOptionsQuestion,
} from "./question/question-processor";
import { TerminalBase, TerminalOptions } from "./terminal-base";

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
	public async askOpenText(question: Question): Promise<string> {
		return this.questionProcessor.ask(
			new OpenTextQuestion(question.questionText),
		);
	}

	public async askChoice(question: Question): Promise<string> {
		return this.questionProcessor.ask(
			new ChoiceQuestion(question.questionText, question.options || []),
		);
	}

	public async askNumberedChoice(question: Question): Promise<string> {
		return this.questionProcessor.ask(
			new NumberedChoiceQuestion(question.questionText, question.options || []),
		);
	}

	public async askOpenTextWithOptions(question: Question): Promise<string> {
		return this.questionProcessor.ask(
			new OpenTextWithOptionsQuestion(
				question.questionText,
				question.options || [],
			),
		);
	}

	public async askMultipleChoice(question: Question): Promise<string[]> {
		return this.questionProcessor.ask(
			new MultipleChoiceQuestion(
				question.questionText,
				question.options || [],
				question.minSelections,
				question.maxSelections,
			),
		);
	}
}
