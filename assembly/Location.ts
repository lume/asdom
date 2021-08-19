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
		setHref(this, str)
	}
	get href(): string {
		return getHref(this)
	}

	set protocol(str: string) {
		setProtocol(this, str)
	}
	get protocol(): string {
		return getProtocol(this)
	}

	set host(str: string) {
		setHost(this, str)
	}
	get host(): string {
		return getHost(this)
	}

	set hostname(str: string) {
		setHostname(this, str)
	}
	get hostname(): string {
		return getHostname(this)
	}

	set port(str: string) {
		setPort(this, str)
	}
	get port(): string {
		return getPort(this)
	}

	set pathname(str: string) {
		setPathname(this, str)
	}
	get pathname(): string {
		return getPathname(this)
	}

	set search(str: string) {
		setSearch(this, str)
	}
	get search(): string {
		return getSearch(this)
	}

	set hash(str: string) {
		setHash(this, str)
	}
	get hash(): string {
		return getHash(this)
	}

	get origin(): string {
		return getOrigin(this)
	}

	assign(url: string): void {
		// No need for additional bindings here because this is identical to what happens in the real DOM Location API.
		setHref(this, url)
	}

	reload(): void {
		reload(this)
	}

	replace(url: string): void {
		// No need for additional bindings here because this is identical to what happens in the real DOM Location API.
		replace(this, url)
	}
}
