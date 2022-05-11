/* eslint-disable */
type Pointer = {}
export interface KiteWasm {
  _run_kite_once(program_code: Pointer, memory_state: Pointer, reg_state: Pointer): number;
  allocate(a: any, b: any, c: any): Pointer;
  _free(...params: any): any;
  intArrayFromString(s: string): any;
  _get_exception_message(exceptionPtr: Pointer): number;
  ALLOC_NORMAL: 0;
  UTF8ToString(...params: any): string;
}

export declare const KiteWasmPromise: Promise<KiteWasm>;

export default KiteWasmPromise