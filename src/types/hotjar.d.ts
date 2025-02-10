export {};

interface HJ {
  (command: 'event', eventName: string): void;
  (
    command: 'identify',
    userId: string | null,
    attributes: Record<string, string | number | boolean>
  ): void;
}

declare global {
  interface Window {
    hj?: HJ;
    // Below added by logic in inlined script in index.ejs
    gdpr?: boolean;
  }
}
