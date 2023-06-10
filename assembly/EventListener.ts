import {JSObject} from './JSObject'

export class EventListener extends JSObject {
	/** Subclasses should implement this. */
	handleEvent(): void {}
}
