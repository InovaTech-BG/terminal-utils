import { TerminalBase } from "../terminal-base";
import { Message } from "./message";

export class MessageProcessor extends TerminalBase {
	public write(message: string | Message): void {
		if (message instanceof Message) {
			super.write(message.toString());
		} else {
			super.write(message);
		}
	}

	public writeln(message: string | Message): void {
		if (message instanceof Message) {
			const formattedMessage = message.toString();
			super.write(`${formattedMessage}\n`);
		} else {
			super.writeln(message);
		}
	}

	public errorWrite(message: string | Message): void {
		if (message instanceof Message) {
			super.errorWrite(message.toString());
		} else {
			super.errorWrite(message);
		}
	}

	public errorWriteln(message: string | Message): void {
		if (message instanceof Message) {
			const formattedMessage = message.toString();
			super.errorWrite(`${formattedMessage}\n`);
		} else {
			super.errorWriteln(message);
		}
	}
}
