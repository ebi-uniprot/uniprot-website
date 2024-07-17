import { Header } from 'franklin-sites';
import cn from 'classnames';

import styles from './styles/documentation-header.module.scss';

const HeaderContent = () => (
  <h1 className={cn(styles['main-content'], 'big')}>
    UniProt API Documentation
  </h1>
);

// TODO: do we want this for the documentation?
// const organizationSchema: WithContext<Organization> = {
//   '@context': 'https://schema.org',
//   '@type': 'Organization',
//   url: 'https://www.uniprot.org',
//   logo: ['https://www.uniprot.org/android-chrome-512x512.png', Logo],
//   name: 'UniProt',
//   description,
//   sameAs: Object.values(socialUrls),
//   contactPoint: {
//     '@type': 'ContactPoint',
//     url: 'https://www.uniprot.org/contact',
//   },
// };

const DocumentationHeader = () => {
  // useStructuredData(organizationSchema);
  return (
    <Header
      // TODO: add search when API supports this
      // search={<SearchContainer/>}
      homepageLink={
        // Linking to www.uniprot.org as the documentation URL will be different
        <a href="https://www.uniprot.org">
          <div className={styles.logo} aria-label="UniProt API Documentation" />
        </a>
      }
    >
      <HeaderContent />
    </Header>
  );
};
export default DocumentationHeader;
