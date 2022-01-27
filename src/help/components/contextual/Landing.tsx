import { useEffect, useState, useMemo } from 'react';
import { throttle } from 'lodash-es';

const headerHeight = 70; // 70px, also defined in _settings.scss -> keep in sync

type InPageArticles = Map<string, boolean>;

const getAllArticles = () => {
  console.time('getting articles');
  const inPageArticles: InPageArticles = new Map();

  const screenHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;

  for (const element of document.querySelectorAll<HTMLElement>(
    '[data-article-id]'
  )) {
    const { articleId } = element.dataset;
    /* istanbul ignore if */
    if (!articleId) {
      // eslint-disable-next-line no-continue
      continue; // shouldn't happen
    }
    // If this article was already in the page, and visible
    if (inPageArticles.get(articleId)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const rect = element.getBoundingClientRect();
    const isVisible =
      rect.top >= headerHeight &&
      rect.left >= headerHeight &&
      rect.bottom <= screenHeight &&
      rect.right <= screenWidth;
    inPageArticles.set(articleId, isVisible);
    // NOTE: maybe optimisation if breaking the loop as soon as an element is
    // not visible after the previous one was visible. Assumption of elements in
    // order in HTML, and corresponding order in the page
  }

  console.timeEnd('getting articles');
  return inPageArticles;
};

const Landing = () => {
  const [inPageArticles, setInPageArticles] = useState<InPageArticles>(
    new Map()
  );

  const updateContent = useMemo(
    () =>
      throttle(() => {
        setInPageArticles(getAllArticles());
      }, 500),
    []
  );

  useEffect(() => {
    updateContent();

    const mutationObserver = new MutationObserver(() => {
      updateContent();
    });

    const reactRoot = document.getElementById('root');
    if (reactRoot) {
      mutationObserver.observe(reactRoot, { childList: true, subtree: true });
    }

    window.addEventListener('scroll', updateContent, { passive: true });
    window.addEventListener('resize', updateContent, { passive: true });

    return () => {
      mutationObserver.disconnect();

      window.removeEventListener('scroll', updateContent);
      window.removeEventListener('resize', updateContent);

      updateContent.cancel();
    };
  }, [updateContent]);

  return (
    <section>
      <h2 className="small">Start here</h2>
      <ul className="no-bullet">
        {Array.from(inPageArticles).map(([id, isVisible]) => (
          <li key={id}>
            {id} {isVisible ? '👀' : '🙈'}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Landing;
