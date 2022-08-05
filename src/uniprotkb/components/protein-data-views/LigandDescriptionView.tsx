import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { RichText } from './FreeTextView';
import ExternalLink from '../../../shared/components/ExternalLink';

import { LocationToPath, Location } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

// For Ligand and LigandPart context refer to:
// https://github.com/ebi-uniprot/uniprot-manual/blob/main/release-notes/2022-08-03-release.md#structuring-of-binding-site-annotations

// A good example with well populated Ligand fields is Q9ZGI5
export type Ligand = {
  name: string;
  id?: string;
  label?: string;
  note?: string;
};

export type LigandPart = {
  name?: string;
  id?: string;
  label?: string;
  note?: string;
};

type LigandViewProps = {
  ligand: Ligand | LigandPart;
};
const LigandView = ({ ligand }: LigandViewProps) => {
  const id = ligand.id?.replace('ChEBI:', '');
  return (
    <>
      <RichText>{ligand.name}</RichText>
      {ligand?.label && ` ${ligand?.label}`}
      {id && (
        <>
          {' ('}
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=ft_binding:"${id}"`,
            }}
          >
            UniProtKB
          </Link>
          {' | '}
          <ExternalLink url={externalUrls.ChEBI(id)}>ChEBI</ExternalLink>
          {') '}
        </>
      )}
      <RichText>{ligand?.note}</RichText>
    </>
  );
};

type Props = {
  ligand: Ligand;
  ligandPart?: LigandPart;
  description?: ReactNode;
};

const LigandDescriptionView = ({ ligand, ligandPart, description }: Props) => (
  <>
    {ligandPart && (
      <>
        <LigandView ligand={ligandPart} key="ligandPart" />
        {' of '}
      </>
    )}
    {ligand && <LigandView ligand={ligand} key="ligand" />}
    {description && (
      <>
        {'; '}
        {typeof description === 'string' ? (
          <RichText>{description}</RichText>
        ) : (
          description
        )}
      </>
    )}
  </>
);

export default LigandDescriptionView;
