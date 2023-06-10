import {EventListener} from './EventListener'
import {
	addEventListenerCallback,
	addEventListenerObject,
	removeEventListenerCallback,
	removeEventListenerObject,
} from './imports'
import {JSObject} from './JSObject'

export type EventCallback = (/*TODO event: Event*/) => void

export class EventTarget extends JSObject {
	addEventListener<T>(eventName: string, listener: T): void {
		// TODO how to check the function matches EventCallback?
		if (isFunction<T>(listener)) addEventListenerCallback(this, eventName, listener.index)
		else if (listener instanceof EventListener) addEventListenerObject(this, eventName, listener)
		else ERROR('addEventListener expects an EventCallback or an EventListener as the second argument.')
	}

	removeEventListener<T>(eventName: string, listener: T): void {
		// TODO how to check the function matches EventCallback?
		if (isFunction<T>(listener)) removeEventListenerCallback(this, eventName, listener.index)
		else if (listener instanceof EventListener) removeEventListenerObject(this, eventName, listener)
		else ERROR('removeEventListener expects an EventCallback or an EventListener as the second argument.')
	}
}
