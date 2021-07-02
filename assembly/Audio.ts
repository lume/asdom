// @ts-ignore
@external('asDOM_Audio', 'initAudio')
export declare function initAudio(src: string, id: usize): void
// @ts-ignore
@external('asDOM_Audio', 'pauseAudio')
export declare function pauseAudio(id: usize): void
// @ts-ignore
@external('asDOM_Audio', 'playAudio')
export declare function playAudio(id: usize): void

// @ts-ignore
@external('asDOM_Audio', 'getAutoplay')
export declare function getAutoplay(id: usize): u32
// @ts-ignore
@external('asDOM_Audio', 'setAutoplay')
export declare function setAutoplay(toggle: u32, id: usize): void

import { HTMLElement } from "./Element";

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
        setAutoplay(toggle ? 1 : 0, this.__ptr__)
    }
    get autoplay(): boolean {
        return getAutoplay(this.__ptr__) ? true : false
    }
}

export class Audio extends HTMLAudioElement {}
