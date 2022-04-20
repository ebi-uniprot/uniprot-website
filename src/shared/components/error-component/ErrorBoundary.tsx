import { Component, ErrorInfo, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';

import ErrorComponent from './ErrorComponent';

import * as logging from '../../utils/logging';

type ErrorBoundaryProps = RouteComponentProps & {
  children: ReactNode;
  fallback?: ReactNode;
};
type ErrorBoundaryState = { error?: Error; location?: Location };

/**
 * Use this ErrorBoundary to wrap any unit of components which might, for any
 * reason, fail to render or throw.
 * Provide a fallback message if you need to display a specific message instead
 * of the default one.
 * Provide `null` as a fallback to simply hide the error.
 * Will try to rerender on location change.
 */

const chunkError = /chunk/i;
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = { fallback: <ErrorComponent /> };

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { location: props.location };
  }

  static getDerivedStateFromError(error: Error) {
    // before keeping the error in the state
    try {
      if (!sessionStorage.getItem('reloaded') && chunkError.test(error.name)) {
        sessionStorage.setItem('reloaded', 'true');
        window.location.reload();
      }
    } catch {
      /* */
    }
    setTimeout(() => {
      try {
        sessionStorage.removeItem('reloaded');
      } catch {
        /*
         */
      }
    }, 1000);
    return { error };
  }

  static getDerivedStateFromProps(
    nextProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState
  ) {
    if (
      nextProps.location.pathname === prevState.location?.pathname &&
      nextProps.location.search === prevState.location?.search
    ) {
      // if same pathname and querystring, don't do anything
      return null;
    }
    // otherwise, reset error, and keep new location in state
    return { error: null, location: nextProps.location };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Don't log if we're going to try to reload to fix the issue
    if (
      sessionStorage.getItem('reloaded') ||
      !chunkError.test(this.state.error?.name || '')
    ) {
      logging.error(error, {
        extra: { errorInfo },
        tags: { origin: 'error-boundary' },
      });
    }
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
