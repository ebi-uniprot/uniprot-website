declare module 'pako' {
  export function inflate(data: Uint8Array | ArrayBuffer): Uint8Array;
}
