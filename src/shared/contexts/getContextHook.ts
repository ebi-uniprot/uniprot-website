import { Context, useContext } from 'react';

import * as logging from '../utils/logging';

const getContextHook =
  <T>(context: Context<T>) =>
  () => {
    const ctx = useContext(context);
    /* istanbul ignore if */
    if (ctx === undefined) {
      logging.error(
        `This hook must be used within the corresponding context provider: "${context.displayName}"`
      );
    }
    return ctx;
  };

export default getContextHook;
