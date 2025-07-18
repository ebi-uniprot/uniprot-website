export type PredictionMethods<T extends string> = {
  internal: boolean;
  obsolete: boolean;
  name?: T;
  notInternalOrObsolete: boolean;
  displayText?: string;
};
