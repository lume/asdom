import {Object} from './Object'

export abstract class EventListener extends Object {
	handleEvent(): void {}
}
