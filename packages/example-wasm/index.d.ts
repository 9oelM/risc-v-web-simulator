/* eslint-disable */
export interface FibWasm {
  _fib(a: number): number;
}

export declare const FibWasmPromise: Promise<FibWasm>;

export default FibWasmPromise