// @ts-ignore
@external('asDOM_Audio', 'initAudio')
export declare function initAudio(src: string, id: usize): void
// @ts-ignore
@external('asDOM_Audio', 'pauseAudio')
export declare function pauseAudio(id: usize): void
// @ts-ignore
@external('asDOM_Audio', 'playAudio')
export declare function playAudio(id: usize): void

import { HTMLElement } from "../Element/Element";

export class HTMLAudioElement extends HTMLElement {
    constructor(src: string | null = null) {
        super()
        if (src) initAudio(src, this.__ptr__)
    }
    play(): void {
        playAudio(this.__ptr__)
    }
    pause(): void {
        pauseAudio(this.__ptr__)
    }
    set autoplay(toggle: boolean) {
        this.play()
    }
    get autoplay(): boolean {
        if (this.autoplay) return true
        return false
    }
}

export class Audio extends HTMLAudioElement {}