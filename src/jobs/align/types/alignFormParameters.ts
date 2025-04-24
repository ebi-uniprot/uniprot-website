import { ServerParameters } from './alignServerParameters';

export type FormParameters = {
  sequence: ServerParameters['sequence'];
  order: ServerParameters['order'];
  iterations: ServerParameters['iterations'];
};
