type Heuristic = {
  // Concurrency values to use as such, not a modifier factor
  concurrency: number;
  // Modifier factor: higher => Less frequent updates, magic numbers
  batteryFactor: 1 | 2 | 4;
  // Modifier factor: higher => Less frequent updates, magic numbers
  connectionFactor: 1 | 2 | 4;
  // Modifier factor: higher => More frequent updates, magic numbers
  dashboardSpeedUpFactor: 1 | 4;
  // Or helper function to combine them together
  compoundFactors: (baseDelay: number) => number;
};

// The field of this object are mutable
export const heuristic: Heuristic = {
  concurrency: 1,
  batteryFactor: 1,
  connectionFactor: 1,
  dashboardSpeedUpFactor: 1,
  compoundFactors(baseDelay) {
    const compoundedDelay =
      (baseDelay * this.connectionFactor * this.batteryFactor) /
      this.dashboardSpeedUpFactor;
    // Make sure to never go below the base delay
    return Math.max(compoundedDelay, baseDelay);
  },
};

if ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency) {
  // EBI JD server is using HTTP 1.1, so keep between 1 and 6 connections
  // Use half of the concurrency available to limit impact on the page
  heuristic.concurrency = Math.min(
    Math.floor(navigator.hardwareConcurrency / 2) || 1,
    6
  );
}

// Not standardised, so we need to extend types
type ExtendedNavigator = Navigator & {
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery
  getBattery: () => Promise<{
    addEventListener: (
      type: 'chargingchange' | 'levelchange',
      listener: EventListener
    ) => void;
    charging?: boolean;
    level?: number;
  }>;
  // https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
  connection: {
    addEventListener: (type: 'change', listener: EventListener) => void;
    saveData?: boolean;
    effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  };
};

if ('getBattery' in navigator && (navigator as ExtendedNavigator).getBattery) {
  (navigator as ExtendedNavigator)
    .getBattery()
    .then((batteryManager) => {
      const setPollingFactor = () => {
        if (batteryManager.charging === true) {
          heuristic.batteryFactor = 1;
        } else if (batteryManager.charging === false) {
          if (!batteryManager.level || batteryManager.level < 0.5) {
            heuristic.batteryFactor = 4;
          } else {
            // if batteryManager.level >= 0.5
            heuristic.batteryFactor = 2;
          }
        } else {
          // if batteryManager.charging === undefined
          heuristic.batteryFactor = 1;
        }
      };
      batteryManager.addEventListener('chargingchange', setPollingFactor);
      batteryManager.addEventListener('levelchange', setPollingFactor);
      setPollingFactor();
    })
    .catch(() => {
      // Assume if there's an error it means there is no battery...
      heuristic.batteryFactor = 1;
    });
}

if ('connection' in navigator && (navigator as ExtendedNavigator).connection) {
  const { connection } = navigator as ExtendedNavigator;
  const setPollingFactor = () => {
    if (connection.saveData) {
      heuristic.connectionFactor = 4;
    } else if (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g'
    ) {
      heuristic.connectionFactor = 4;
    } else if (connection.effectiveType === '3g') {
      heuristic.connectionFactor = 2;
    } else {
      heuristic.connectionFactor = 1;
    }
  };
  connection.addEventListener('change', setPollingFactor);
  setPollingFactor();
}
