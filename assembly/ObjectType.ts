// TODO Put this in a file shared between glue code and AS code. We need to
// convert the glue code to TypeScript first, or compile the shared file to
// plain JS.
export enum ObjectType {
	// 0 is intentionally skipped, do not use 0

	unknown = 1,

	body = 2,
	div = 3,
	span = 4,
	p = 5,
	a = 6,
	script = 7,
	template = 8,
	audio = 9,
	img = 10,
	h1 = 11,
	h2 = 12,
	h3 = 13,
	h4 = 14,
	h5 = 15,
	h6 = 16,

	// Text nodes
	text = 100,

	// Node lists
	htmlCollection = 200,
	nodeListOfNode = 201,
	nodeListOfElement = 202,
}
