import {EventListener} from './EventListener'
import {
	addEventListenerCallback,
	addEventListenerObject,
	removeEventListenerCallback,
	removeEventListenerObject,
} from './imports'
import {Object} from './Object'

type EventCallback = (/*TODO event: Event*/) => void

export class EventTarget extends Object {
	addEventListener<T>(eventName: string, listener: T): void {
		if (isFunction<EventCallback>(listener)) addEventListenerCallback(this.__ptr__, eventName, listener.index)
		else if (listener instanceof EventListener) addEventListenerObject(this.__ptr__, eventName, listener.__ptr__)
		else ERROR('addEventListener expects an EventCallback or an EventListener as the second argument.')
	}

	removeEventListener<T>(eventName: string, listener: T): void {
		if (isFunction<EventCallback>(listener)) removeEventListenerCallback(this.__ptr__, eventName, listener.index)
		else if (listener instanceof EventListener) removeEventListenerObject(this.__ptr__, eventName, listener.__ptr__)
		else ERROR('removeEventListener expects an EventCallback or an EventListener as the second argument.')
	}
}
