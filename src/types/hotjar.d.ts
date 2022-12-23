export {};

declare global {
  interface Window {
    hj?: (command: 'event', eventName: string) => void;
  }
}
