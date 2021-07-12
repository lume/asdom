import {initAudio, playAudio, pauseAudio, setAutoplay, getAutoplay} from '../../imports'
import {HTMLElement} from './HTMLElement'

export class HTMLAudioElement extends HTMLElement {
	constructor(src: string | null = null) {
		super()
		if (src) initAudio(this.__ptr__, src)
	}
	play(): void {
		playAudio(this.__ptr__)
	}
	pause(): void {
		pauseAudio(this.__ptr__)
	}
	set autoplay(toggle: boolean) {
		setAutoplay(this.__ptr__, toggle)
	}
	get autoplay(): boolean {
		return getAutoplay(this.__ptr__) ? true : false
	}
}

export class Audio extends HTMLAudioElement {}
