import cn from 'classnames';
import { type HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { frame, schedule, sleep } from 'timing-functions';

import styles from './styles/in-page-nav.module.scss';

const GRANULARITY = 11;

// Time in ms to keep re-scrolling after initial anchor navigation,
// long enough for lazy-loaded content above to settle.
const SCROLL_SETTLE_MS = 3_000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getScrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? 'auto' : 'smooth';

export type InPageNavSection = {
  id: string;
  label: string;
  disabled?: boolean;
};

type Props = {
  sections: InPageNavSection[];
  rootElement?: string | HTMLElement;
};

/**
 * Scrolls to the target element identified by `id`, focuses it for
 * accessibility, then watches for layout shifts caused by lazy-loaded
 * content. Re-scrolls smoothly (respecting prefers-reduced-motion)
 * whenever the scroll container resizes, and stops if the user manually
 * scrolls or after a settling period.
 *
 * Returns a cleanup function.
 */
const scrollToAndObserve = (
  id: string,
  rootElement?: string | HTMLElement
): (() => void) => {
  const element = document.getElementById(id);
  if (!element) {
    return () => {};
  }

  // Ensure the element is focusable, then scroll and focus
  if (!element.getAttribute('tabindex')) {
    element.setAttribute('tabindex', '-1');
  }
  element.scrollIntoView();
  element.focus({ preventScroll: true });

  // Watch for layout shifts caused by lazy-loaded content
  const scrollContainer =
    typeof rootElement === 'string'
      ? document.querySelector(rootElement)
      : rootElement;

  if (!scrollContainer) {
    return () => {};
  }

  let userHasScrolled = false;

  const onUserScroll = () => {
    userHasScrolled = true;
  };

  // Listen for user-initiated scroll to avoid fighting with the user
  scrollContainer.addEventListener('wheel', onUserScroll, { passive: true });
  scrollContainer.addEventListener('touchmove', onUserScroll, {
    passive: true,
  });

  const observer = new ResizeObserver(() => {
    if (!userHasScrolled) {
      element.scrollIntoView({ behavior: getScrollBehavior() });
    }
  });
  observer.observe(scrollContainer);

  const timeout = setTimeout(() => {
    observer.disconnect();
    scrollContainer.removeEventListener('wheel', onUserScroll);
    scrollContainer.removeEventListener('touchmove', onUserScroll);
  }, SCROLL_SETTLE_MS);

  return () => {
    observer.disconnect();
    clearTimeout(timeout);
    scrollContainer.removeEventListener('wheel', onUserScroll);
    scrollContainer.removeEventListener('touchmove', onUserScroll);
  };
};

const InPageNav = ({
  sections,
  rootElement,
  ...props
}: Props & HTMLAttributes<HTMLUListElement>) => {
  const history = useHistory();

  const [active, setActive] = useState(sections[0].id);

  const marker = useRef<HTMLDivElement>(null);
  const firstMarkerRender = useRef(true);

  // effect to connect user changes in scroll to browser history
  useEffect(() => {
    // get elements to watch from configured sections
    let elements: HTMLElement[] = [];

    // Intersection Observer to watch when sections appear/disappear
    if (!(typeof window === 'undefined' || 'IntersectionObserver' in window)) {
      // 🤷🏽‍♂️ too bad...
      return;
    }

    const visibilityMap = new Map();

    const io = new window.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // update the visibility map
          visibilityMap.set(entry.target, {
            height: entry.intersectionRect.height,
            ratio: entry.intersectionRatio,
          });
        }

        let mostVisible;
        let highestVisibility = 0;
        for (const [element, { height, ratio }] of visibilityMap.entries()) {
          // find the most visible element
          if (highestVisibility < height) {
            highestVisibility = height;
            mostVisible = element;
          }
          // stop at the first element completely visible
          // might happen when you have small sections
          if (ratio === 1) {
            break;
          }
        }

        if (mostVisible) {
          setActive(mostVisible.id);
        }
      },
      {
        threshold: Array.from({ length: GRANULARITY }).map(
          (_, i) => i / (GRANULARITY - 1)
        ),
      }
    );

    // sleep, to give the rest of the page a chance to start loading
    // schedule, to trigger only when the page has finished doing work
    // hopefully by then all the components are loaded
    sleep(250)
      .then(() => schedule(1000))
      .then(() => {
        // get elements to watch from configured sections
        elements = sections
          .map(({ id }) => document.querySelector<HTMLElement>(`#${id}`))
          .filter((x: null | HTMLElement): x is HTMLElement => Boolean(x));

        for (const element of elements) {
          io.observe(element);
          visibilityMap.set(element, 0);
        }
      });

    return () => elements.forEach((element) => io.unobserve(element));
  }, [sections, history]);

  // listen for changes in location hash to move corresponding element into view
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const unlisten = history.listen((location) =>
      frame().then(() => {
        // Clean up any previous scroll observer before starting a new one
        cleanup?.();

        const id = location.hash.replace('#', '');
        if (id) {
          cleanup = scrollToAndObserve(id, rootElement);
        } else if (rootElement) {
          const element =
            typeof rootElement === 'string'
              ? document.querySelector(rootElement)
              : rootElement;
          element?.scrollTo({ top: 0 });
        }
      })
    );
    return () => {
      cleanup?.();
      unlisten();
    };
  }, [history, rootElement]);

  // move element into view on mount, and re-scroll if lazy-loaded content
  // above the target causes it to shift out of view
  useEffect(() => {
    const id = history.location.hash.replace('#', '');
    if (!id) {
      return;
    }

    let cleanup: (() => void) | undefined;

    // sleep, to give the rest of the page a chance to start loading
    // schedule, to trigger only when the page has finished doing work
    // hopefully by then all the components are loaded and in their right space
    sleep(500)
      .then(() => schedule(1000))
      .then(() => {
        cleanup = scrollToAndObserve(id, rootElement);
      });

    return () => cleanup?.();
  }, [history, rootElement]); // history won't change, unlike location

  // move active marker
  useEffect(() => {
    // don't display an active marker if browser support is bad
    if (
      !(
        marker.current &&
        'animate' in marker.current &&
        (typeof window === 'undefined' || 'IntersectionObserver' in window)
      )
    ) {
      return;
    }

    const target = marker.current?.parentElement?.querySelector(
      `.${styles.active}`
    );
    if (!target) {
      return;
    }

    // get measurements
    const containerRect =
      marker.current?.parentElement?.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const currentMarkerRec = marker.current.getBoundingClientRect();

    if (!containerRect) {
      return;
    }

    marker.current.style.display = 'block';
    marker.current.animate(
      {
        transform: [
          `translateY(${currentMarkerRec.y - containerRect.y}px) scaleY(${
            currentMarkerRec.height
          })`,
          `translateY(${targetRect.y - containerRect.y}px) scaleY(${
            targetRect.height
          })`,
        ],
      },
      {
        duration: firstMarkerRender.current ? 0 : 250,
        // easing: 'cubic-bezier(.5,0,.35,1.25)', // overshoot
        easing: 'linear',
        fill: 'both',
      }
    );
    firstMarkerRender.current = false;
  }, [active]);

  return (
    <ul className={styles['in-page-nav']} {...props}>
      <div ref={marker} className={styles.marker} />
      {sections.map(({ id, label, disabled }) => (
        <li key={id} className={cn({ [styles.disabled]: disabled })}>
          <Link
            to={`#${id}`}
            className={cn({ [styles.active]: active === id })}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default InPageNav;
