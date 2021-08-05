import {
	getHash,
	getHost,
	getHostname,
	getHref,
	getOrigin,
	getPathname,
	getPort,
	getProtocol,
	getSearch,
	reload,
	replace,
	setHash,
	setHost,
	setHostname,
	setHref,
	setPathname,
	setPort,
	setProtocol,
	setSearch,
} from './imports'
import {Object} from './Object'

export class Location extends Object {
	set href(str: string) {
		setHref(this.__ptr__, str)
	}
	get href(): string {
		return getHref(this.__ptr__)
	}

	set protocol(str: string) {
		setProtocol(this.__ptr__, str)
	}
	get protocol(): string {
		return getProtocol(this.__ptr__)
	}

	set host(str: string) {
		setHost(this.__ptr__, str)
	}
	get host(): string {
		return getHost(this.__ptr__)
	}

	set hostname(str: string) {
		setHostname(this.__ptr__, str)
	}
	get hostname(): string {
		return getHostname(this.__ptr__)
	}

	set port(str: string) {
		setPort(this.__ptr__, str)
	}
	get port(): string {
		return getPort(this.__ptr__)
	}

	set pathname(str: string) {
		setPathname(this.__ptr__, str)
	}
	get pathname(): string {
		return getPathname(this.__ptr__)
	}

	set search(str: string) {
		setSearch(this.__ptr__, str)
	}
	get search(): string {
		return getSearch(this.__ptr__)
	}

	set hash(str: string) {
		setHash(this.__ptr__, str)
	}
	get hash(): string {
		return getHash(this.__ptr__)
	}

	get origin(): string {
		return getOrigin(this.__ptr__)
	}

	assign(url: string): void {
		// No need for additional bindings here because this is identical to what happens in the real DOM Location API.
		setHref(this.__ptr__, url)
	}

	reload(): void {
		reload(this.__ptr__)
	}

	replace(url: string): void {
		// No need for additional bindings here because this is identical to what happens in the real DOM Location API.
		replace(this.__ptr__, url)
	}
}
