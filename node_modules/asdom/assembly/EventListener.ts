import {Object} from './Object'

export class EventListener extends Object {
	/** Subclasses should implement this. */
	handleEvent(): void {}
}
