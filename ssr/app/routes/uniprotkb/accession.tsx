import {
  cleanAccession,
  uppercaseAccession,
} from '../../../../src/app/routes/loaders/composable-helpers';
import type { Route } from './+types/index';

export function loader(args: Route.LoaderArgs) {
  cleanAccession(args);
  uppercaseAccession(args);
}
