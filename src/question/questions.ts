export abstract class Question {
	constructor(public readonly questionText: string) {}
}

export class OpenTextQuestion extends Question {}

export class ChoiceQuestion extends Question {
	constructor(
		questionText: string,
		public readonly options: string[],
	) {
		super(questionText);
	}
}

export class NumberedChoiceQuestion extends Question {
	constructor(
		questionText: string,
		public readonly options: string[],
	) {
		super(questionText);
	}
}

export class OpenTextWithOptionsQuestion extends Question {
	constructor(
		questionText: string,
		public readonly options: string[],
	) {
		super(questionText);
	}
}

export class MultipleChoiceQuestion extends Question {
	constructor(
		questionText: string,
		public readonly options: string[],
		public readonly minSelections: number = 1,
		public readonly maxSelections?: number,
	) {
		super(questionText);
	}
}
