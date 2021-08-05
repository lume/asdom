// @ts-check

/**
 * @param {import('./index').Asdom} asdom
 * @param {number} factory
 * @param {number} attributes
 */
export function createAsdomCustomElementClass(asdom, factory, attributes) {
	return class AsdomCustomElement extends HTMLElement {
		__asRef = -1

		static get observedAttributes() {
			return asdom.stringArray(attributes)
		}

		__pinned = false

		__pin() {
			if (this.__pinned) return
			this.__pinned = true
			asdom.__pin(this.__asRef)
		}

		__unpin() {
			if (!this.__pinned) return
			this.__pinned = false
			asdom.__unpin(this.__asRef)
		}

		constructor() {
			super()

			this.__asRef = asdom.fn(factory)()

			// Because the element can be long lived while the AS
			// user does not reference it (f.e. it is sitting in a
			// DOM tree somewhere), we need to keep the AS-side
			// object alive so the user's AS-side state will stay
			// intact (otherwise the AS-side interface would be
			// ephemeral and on each access of the JS-side
			// element a new AS-side instance would be created
			// with new AS-side state, destroying the AS user's
			// logic). Non-custom elements don't have state on
			// the AS-side, so their AS-side interfaces are
			// ephemeral (created only when needed).
			this.__pin()

			asdom.__refs.set(this.__asRef, this)
		}

		connectedCallback() {
			// Because the element can be long lived while the AS
			// user does not reference it (f.e. it is sitting in a
			// DOM tree somewhere), we need to keep the AS-side
			// object alive so the user's AS-side state will stay
			// intact (otherwise the AS-side interface would be
			// ephemeral and on each access of the JS-side
			// element a new AS-side instance would be created
			// with new AS-side state, destroying the AS user's
			// logic). Non-custom elements don't have state on
			// the AS-side, so their AS-side interfaces are
			// ephemeral (created only when needed).
			this.__pin()

			asdom.__asdom_connectedCallback(this.__asRef)
		}

		disconnectedCallback() {
			asdom.__asdom_disconnectedCallback(this.__asRef)

			// If the element is no longer in the DOM and therefore
			// not held onto by the JS-side (assuming the app is
			// written purely in AS and no JS code is holding
			// the element), then we should unpin it in case
			// the AS user will let go of the object, so the
			// AS-side instance will be collected.
			this.__unpin()
		}

		adoptedCallback() {
			asdom.__asdom_adoptedCallback(this.__asRef)
		}

		attributeChangedCallback(name, oldVal, newVal) {
			asdom.__asdom_attributeChangedCallback(
				this.__asRef,
				asdom.__newString(name),
				asdom.__newString(oldVal),
				asdom.__newString(newVal),
			)
		}
	}
}
