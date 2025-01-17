import { Message } from "./message";

export function createMessage(message: string): Message {
	return new Message(message);
}
