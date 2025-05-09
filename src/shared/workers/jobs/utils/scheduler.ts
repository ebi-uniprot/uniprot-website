export class Scheduler {
  // Function that will be run by the scheduler and return an estimate of when
  // to run it again
  #runner: () => Promise<number>;

  // Reference to the timeout for the last scheduled run
  #currentSchedule: number | undefined;

  // Reference to know when the async runner is currently running
  #currentlyRunning: boolean;

  constructor(runner: () => Promise<number>) {
    this.#runner = runner;
    this.#currentlyRunning = false;
  }

  schedule(delay: number) {
    if (this.#currentSchedule) {
      // Clear any possible previously scheduled run
      clearTimeout(this.#currentSchedule);
    }
    if (
      // If the runner is currently running, no need to schedule more runs
      this.#currentlyRunning ||
      // If this has been scheduled for never
      delay === +Infinity
    ) {
      // ...then stop everything
      return;
    }

    this.#currentSchedule = setTimeout(async () => {
      this.#currentlyRunning = true;
      // Run and wait for it to finish and return an estimate time to run again
      const nextDelay = await this.#runner();
      this.#currentlyRunning = false;
      // Recursively call the scheduler to run the runner again in <x> ms
      this.schedule(nextDelay);
    }, delay) as unknown as number;
    // TODO: fix this type
  }
}
