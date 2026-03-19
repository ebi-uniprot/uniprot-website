declare module 'pako' {
  export function inflate(data: Uint8Array | ArrayBuffer): Uint8Array;
  export function deflate(data: Uint8Array | string): Uint8Array;
}
