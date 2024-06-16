# Binding Patterns and cases

Notes on different types of binding patterns used in asdom with regards to how
it gets or creates references in JS and associates them with AS-side
references, and how it does some optimizations.

- SET-OF-POSSIBLE-TYPES-NEW-REF - AS calls JS API without knowing what type of
  object it will create
  - It may be nullable
  - AS needs to know the type of object to create after the JS call completes,
    so glue code sends back an enum value specifying the type of mirror
    object to create.
  - AS side sends back the new mirror object ID for JS to map to the JS instance.
  - An example of this is `document.querySelector('.foo')` which may return a
    different object each time, or null. We do not know ahead of time which
    object it is going to return.
- PREDEFINED-TYPE-ALWAYS-SAME-REF - AS calls a JS API but knows ahead of time
  what type of object will be created, so we can skip extra boundary crossing
  by pre-making the object, then passing the ID to JS to make the mapping.
  - On the AS side we can cache the value to avoid crossing to JS every time if
    we know the value won't change after the initial call to JS (where each
    call on the JS-side would return the same object ID each time).
  - An example of this is the `Node.children` method which, for a given node,
    always returns the same object.
- PREDEFINED-TYPE-ALWAYS-NEW-REF - Similar to the previous pattern, the AS side
  might know the type of object ahead of time, but the API returns a new object
  each time. In this case, we don't use a cache variable, and just return a new
  object on each call.
  - An example of this is `CanvasRenderingContext2D.getImageData()` which
    always return a new `ImageData` object.
- If we know a predefined set of strings can be passed between AS and JS, we
  don't need to waste CPU passing strings, but just passing an enum
  representing the string values.
  - An example of this is in `HTMLCanvasElement.getContext(type)` where we know
    the allowed string values for `type`.
- Some classes on the JS side are objects with no properties or methods. In
  these cases, we can skip making AS-side mirror objects, and just use ID
  numbers instead.
  - For example, for WebGL, we can use `type WebGLShader = i32` instead of
    `class WebGLShader` because the user will never need to use properties or
    methods, and will only pass the "instances" around to other APIs (just
    passing i32's). In these cases, there are only JS-side objects that are
    matched to the passed ID numbers.
