import { Component, type ReactNode } from 'react';

/** Optional background features must never unmount the visible page. */
export default class OptionalFeatureBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}