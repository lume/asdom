import {EventListener} from './EventListener'
import {
	addEventListenerCallback,
	addEventListenerObject,
	removeEventListenerCallback,
	removeEventListenerObject,
} from './imports'
import {Object} from './Object'

export type EventCallback = (/*TODO event: Event*/) => void

export class EventTarget extends Object {
	addEventListener<T>(eventName: string, listener: T): void {
		// TODO how to check the function matches EventCallback?
		if (isFunction<T>(listener)) addEventListenerCallback(this.__ptr__, eventName, listener.index)
		else if (listener instanceof EventListener) addEventListenerObject(this.__ptr__, eventName, listener.__ptr__)
		else ERROR('addEventListener expects an EventCallback or an EventListener as the second argument.')
	}

	removeEventListener<T>(eventName: string, listener: T): void {
		// TODO how to check the function matches EventCallback?
		if (isFunction<T>(listener)) removeEventListenerCallback(this.__ptr__, eventName, listener.index)
		else if (listener instanceof EventListener) removeEventListenerObject(this.__ptr__, eventName, listener.__ptr__)
		else ERROR('removeEventListener expects an EventCallback or an EventListener as the second argument.')
	}
}
