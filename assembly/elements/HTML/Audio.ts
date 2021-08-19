import {initAudio, playAudio, pauseAudio, setAutoplay, getAutoplay} from '../../imports'
import {HTMLElement} from './HTMLElement'

export class HTMLAudioElement extends HTMLElement {
	constructor(src: string | null = null) {
		super()
		if (src) initAudio(this, src)
	}
	play(): void {
		playAudio(this)
	}
	pause(): void {
		pauseAudio(this)
	}
	set autoplay(toggle: boolean) {
		setAutoplay(this, toggle)
	}
	get autoplay(): boolean {
		return getAutoplay(this) ? true : false
	}
}

export class Audio extends HTMLAudioElement {}
