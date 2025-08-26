import cn from 'classnames';
import { throttle } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';

import {
  getLocationEntryPathFor,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import useDataApi from '../../../shared/hooks/useDataApi';
import { searchableNamespaceLabels } from '../../../shared/types/namespaces';
import apiUrls from '../../config/apiUrls';
import { HelpEntryResponse } from '../../types/apiModel';
import Shortcuts from './Shortcuts';
import styles from './styles/landing.module.scss';

const getHelpEntryPath = getLocationEntryPathFor(Location.HelpEntry);

const fallbackLandingContent = (
  <>
    <li>
      <h3 className="small">UniProt data</h3>
      <ul className="no-bullet">
        <li>
          <Link to={getHelpEntryPath('uniprotkb_manual')}>
            {searchableNamespaceLabels.uniprotkb}
          </Link>
        </li>
        <li>
          <Link to={getHelpEntryPath('proteomes_manual')}>
            {searchableNamespaceLabels.proteomes}
          </Link>
        </li>
        <li>
          <Link to={getHelpEntryPath('uniref')}>
            {searchableNamespaceLabels.uniref}
          </Link>
        </li>
        <li>
          <Link to={getHelpEntryPath('uniparc')}>
            {searchableNamespaceLabels.uniparc}
          </Link>
        </li>
      </ul>
    </li>
    <li>
      <h3 className="small">Get started</h3>
      <ul className="no-bullet">
        <li>
          <Link to={getHelpEntryPath('find_your_protein')}>
            Find your protein
          </Link>
        </li>
        <li>
          <Link to={getHelpEntryPath('explore_uniprotkb_entry')}>
            Explore UniProtKB entry
          </Link>
        </li>
        <li>
          <Link to={getHelpEntryPath('explore_proteomes')}>
            Explore proteomes
          </Link>
        </li>
      </ul>
    </li>
    <li>
      <h3 className="small">Training</h3>
      <ul className="no-bullet">
        <li>
          <ExternalLink url="https://www.ebi.ac.uk/training/online/courses/uniprot-quick-tour">
            Online training
          </ExternalLink>
        </li>
        <li>
          <ExternalLink url="https://www.ebi.ac.uk/training/services/uniprot">
            Courses
          </ExternalLink>
        </li>
      </ul>
    </li>
    <li>
      <h3 className="small">Technical corner</h3>
      <ul className="no-bullet">
        <li>
          <Link to={getHelpEntryPath('programmatic_access')}>
            Programmatic access
          </Link>
        </li>
        <li>
          {/* TODO: this goes to the same place as above but these links are subject to change anyway */}
          <Link to={getHelpEntryPath('programmatic_access')}>UniProt JAPI</Link>
        </li>
      </ul>
    </li>
    <li>
      <h3 className="small">Biocuration</h3>
      <ul className="no-bullet">
        <li>
          <Link to={getHelpEntryPath('biocuration')}>UniProt biocuration</Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.HelpResults],
              search: '?query=*&facets=category:biocuration',
            }}
          >
            Biocuration projects
          </Link>
        </li>
      </ul>
    </li>
    <li>
      <h3 className="small">About us</h3>
      <ul className="no-bullet">
        <li>
          <Link to={getHelpEntryPath('about')}>About UniProt</Link>
        </li>
        <li>
          <Link to={getHelpEntryPath('publications')}>How to cite us</Link>
        </li>
      </ul>
    </li>
  </>
);

type ArticleTitleProps = {
  id: string;
  firstVisible: boolean;
  isVisible: boolean;
};

const ArticleTitle = ({ id, firstVisible, isVisible }: ArticleTitleProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const { data } = useDataApi<HelpEntryResponse>(
    `${apiUrls.entry(id)}?fields=title`
  );

  useEffect(() => {
    if (firstVisible) {
      ref.current?.scrollIntoView({ block: 'center' });
    }
  }, [firstVisible]);

  return (
    <Link
      ref={ref}
      to={getHelpEntryPath(id)}
      className={cn({ [styles['in-view']]: isVisible })}
    >
      {data?.title || id}
    </Link>
  );
};

const headerHeight = 70; // 70px, also defined in franklin -> keep in sync

type InPageArticles = Map<string, boolean>;

const getAllArticles = () => {
  const inPageArticles: InPageArticles = new Map();

  const screenHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;

  for (const element of document.querySelectorAll<HTMLElement>(
    '[data-article-id]'
  )) {
    let { articleId } = element.dataset;
    if (articleId?.includes('#')) {
      [articleId] = articleId.split('#');
    }
    /* istanbul ignore if */
    if (!articleId) {
      continue; // shouldn't happen
    }
    // If this article was already in the page, and visible
    if (inPageArticles.get(articleId)) {
      continue;
    }
    const rect = element.getBoundingClientRect();
    const isVisible =
      rect.top >= headerHeight &&
      rect.right >= 0 &&
      rect.bottom <= screenHeight &&
      rect.left <= screenWidth;
    inPageArticles.set(articleId, isVisible);
    // NOTE: maybe optimisation if breaking the loop as soon as an element is
    // not visible after the previous one was visible. Assumption of elements in
    // order in HTML, and corresponding order in the page
  }

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

  let firstVisibleFound = false;

  return (
    <>
      <Shortcuts />
      <section className={styles.container}>
        <ul className="no-bullet">
          <h2 className="medium">Start here</h2>
          {inPageArticles.size
            ? Array.from(inPageArticles).map(([id, isVisible]) => {
                let firstVisible = false;
                if (!firstVisibleFound && isVisible) {
                  firstVisible = true;
                  firstVisibleFound = true;
                }
                return (
                  <li key={id}>
                    <ArticleTitle
                      id={id}
                      firstVisible={firstVisible}
                      isVisible={isVisible}
                    />
                  </li>
                );
              })
            : fallbackLandingContent}
        </ul>
      </section>
    </>
  );
};

export default Landing;
