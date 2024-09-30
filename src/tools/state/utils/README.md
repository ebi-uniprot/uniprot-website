# Scheduler

The `scheduler` utility module contains a wrapper class that takes a runner function. The runner function is an async function that does whatever it needs to do, and determine when it should be run again. This value in ms is returned by the runner.

The scheduler class will schedule a run of that function either by being called externally with the `schedule` method, or internally based on the estimate mentioned before.

The way to break the loop is to pass an estimate of `+Infinity`

The scheduling logic will wait for the browser to be idle (with `requestIdleCallback`) to avoid competing for resources if something heavy is happening at the same time. Then it will wait for a frame to be rerender by the browser (with `requestAnimationFrame`) as a trick to pause the loop if the browser is not rendering (background tab or minimised window). Then it will run the runner.

To avoid issue with multiple loops running at the same time there are 2 cases:

- The scheduled logic has already started: ignore the new schedule call
- The logic has been scheduled but isn't running yet: cancel and re-schedule. It is the way to override a previous scheduled run if we want to adjust the previously set time.

# Heuristic

The `heuristic` utility module contains a mutable object with different factors to influence the scheduling of job polling tasks.

## `concurrency`

Based on the browser's `navigator.hardwareConcurrency` API, it holds the concurrency level at which the job polling can be done, assuming it's a low-priority task so taking a maximum of half the resources, and trying not to max out the number of connections the browser can have to a specific origin. Holds a value between 1 and 6.

## `batteryFactor`

Based on the browser's `BatteryManager` API, it holds a slowdown factor depending on the computer battery level or charging state.
Holds a value between 1 and 4.

## `connectionFactor`

Based on the browser's `navigator.connection` API, it holds a slowdown factor depending on the computer detected speed connection or user preference regarding data saving.
Holds a value between 1 and 4.

## `dashboardSpeedUpFactor`

Based on the fact the dashboard is set as visible or not, it holds a speedup factor that will force the polls to happen more often when the dashboard is visible with the assumption that the user will want more frequent updates.
Holds a value between 1 and 4.

## `compoundFactors(baseDelay: number) => number`

Will return a new delay based off the defined `baseDelay`, never below it, and compounding the 3 factors above.
