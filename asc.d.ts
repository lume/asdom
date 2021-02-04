type externref = number;
type bool = any;
type i8 = any;
type i16 = any;
type i32 = any;
type i64 = any;
type f32 = any;
type f64 = any;
type u8 = any;
type u16 = any;
type u32 = any;
type u64 = any;
type usize = any;
declare class StaticArray<T> {
	constructor(x: number)
}

declare function assert<T>(isTrueish: Text, message?: string): Text;
declare function instantiate<T>(...args: any[]): T;
declare function store<T>(size: usize, offset: usize): T;
declare function changetype<T>(value: any): T;
declare function idof<T>(): u32;
declare function nameof<T>(value?: T): string;

declare namespace Mathf {
	const E: number;
	const LN2: number;
	const LN10: number;
	const LOG2E: number;
	const LOG10E: number;
	const PI: number;
	const SQRT1_2: number;
	const SQRT2: number;

	function abs(x: number): number;
	function acos(x: number): number;
	function acosh(x: number): number;
	function asin(x: number): number;
	function asinh(x: number): number;
	function atan(x: number): number;
	function atan2(x: number): number;
	function atanh(x: number): number;
	function cbrt(x: number): number;
	function ceil(x: number): number;
	function clz32(x: number): number;
	function cos(x: number): number;
	function cosh(x: number): number;
	function exp(x: number): number;
	function expm1(x: number): number;
	function floor(x: number): number;
	function fround(x: number): number;
	function hypot(value1: number, value2: number): number;
	function imul(a: number, b: number): number;
	function log(x: number): number;
	function log10(x: number): number;
	function log1p(x: number): number;
	function log2(x: number): number;
	function max(v1: number, v2: number): number;
	function min(v1: number, v2: number): number;
	function pow(base: number, exponent: number): number;
	function random(): number;
	function round(x: number): number;
	function sign(x: number): number;
	function signbit(x: number): bool;
	function sin(x: number): number;
	function sinh(x: number): number;
	function sqrt(x: number): number;
	function tan(x: number): number;
	function tanh(x: number): number;
	function trunc(x: number): number;
}