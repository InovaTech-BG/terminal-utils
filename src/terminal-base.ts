export interface TerminalOptions {
	input?: NodeJS.ReadableStream;
	output?: NodeJS.WritableStream;
	error?: NodeJS.WritableStream;
	encoding?: NodeJS.BufferEncoding;
}

export class TerminalBase {
	protected input: NodeJS.ReadableStream;
	protected output: NodeJS.WritableStream;
	protected error: NodeJS.WritableStream;
	protected encoding: NodeJS.BufferEncoding;

	constructor(options: TerminalOptions = {}) {
		this.input = options.input || process.stdin;
		this.output = options.output || process.stdout;
		this.error = options.error || process.stderr;
		this.encoding = options.encoding || "utf-8";

		this.input.setEncoding(this.encoding);
	}

	public write(message: string): void {
		this.output.write(message);
	}

	public writeln(message: string): void {
		this.output.write(`${message}\n`);
	}

	public errorWrite(message: string): void {
		this.error.write(message);
	}

	public errorWriteln(message: string): void {
		this.error.write(`${message}\n`);
	}

	public async prompt(question: string): Promise<string> {
		this.write(question);

		return new Promise((resolve) => {
			let data = "";

			const onData = (chunk: Buffer | string) => {
				data += chunk;
				if (data.includes("\n")) {
					this.input.removeListener("data", onData);
					resolve(data.trim());
				}
			};

			this.input.on("data", onData);
		});
	}

	public clear(): void {
		this.output.write("\x1b[2J\x1b[0;0H");
	}
}
