/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
class Logging {
  static log(...args: any) {
    console.log(args);
  }

  static warn(...args: any) {
    console.warn(args);
  }

  static error(...args: any) {
    console.error(args);
  }

  static debug(...args: any) {
    console.debug(args);
  }
}

export default Logging;
