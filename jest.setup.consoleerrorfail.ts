/* "Fail on console error" util */
// Jest stops when a console error is shown in order to fix it
const { error } = console;
// eslint-disable-next-line no-console
console.error = (message, ...rest) => {
  error.apply(console, [message, ...rest]); // keep default behaviour
  throw message instanceof Error ? message : new Error(message);
};
