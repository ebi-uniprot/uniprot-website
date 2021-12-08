import { Link } from 'react-router-dom';
import { Card, ExternalLink } from 'franklin-sites';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import FreeTextView from '../protein-data-views/FreeTextView';
import XRefView from '../protein-data-views/XRefView';

import { hasContent } from '../../../shared/utils/utils';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import {
  getIntActQueryUrl,
  getIntActQueryForAccessionUrl,
} from '../../../shared/config/externalUrls';

import { FreeTextComment, InteractionComment } from '../../types/commentTypes';
import { UIModel } from '../../adapters/sectionConverter';
import { getEntryPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';

import styles from './styles/interaction-section.module.scss';

type Props = {
  data: UIModel;
  primaryAccession: string;
};

const InteractionSection = ({ data, primaryAccession }: Props) => {
  const interactionComment = data.commentsData.get('INTERACTION') as
    | InteractionComment[]
    | undefined;

  const datatableElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const interactionViewerElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "interaction-viewer" */ 'interaction-viewer'),
    'interaction-viewer'
  );

  if (!hasContent(data)) {
    return null;
  }
  const comments = data.commentsData.get('SUBUNIT') as
    | FreeTextComment[]
    | undefined;

  return (
    <Card
      header={
        <h2>{getEntrySectionNameAndId(EntrySection.Interaction).name}</h2>
      }
      id={EntrySection.Interaction}
      className={styles['interaction-section']}
      data-entry-section
    >
      {comments && <FreeTextView comments={comments} title="subunit" />}
      {interactionComment?.[0] && (
        <>
          {interactionViewerElement.defined && (
            <interactionViewerElement.name accession={primaryAccession} />
          )}
          <datatableElement.name filter-scroll>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Entry 1</th>
                  <th>Entry 2</th>
                  <th>Number of experiments</th>
                  <th>Intact</th>
                </tr>
              </thead>
              <tbody>
                {interactionComment[0].interactions.map((interaction) => (
                  <tr
                    key={`${interaction.interactantOne.intActId}${interaction.interactantTwo.intActId}`}
                  >
                    <td>
                      {/* NOTE: Add 'SELF' */}
                      {interaction.organismDiffer ? 'XENO' : 'BINARY'}
                    </td>
                    <td>
                      {interaction.interactantOne.uniProtKBAccession ? (
                        <Link
                          to={getEntryPath(
                            Namespace.uniprotkb,
                            interaction.interactantOne.uniProtKBAccession
                          )}
                        >
                          {interaction.interactantOne.geneName}{' '}
                          {interaction.interactantOne.chainId}{' '}
                          {interaction.interactantOne.uniProtKBAccession}
                        </Link>
                      ) : (
                        <>
                          {interaction.interactantOne.geneName}{' '}
                          {interaction.interactantOne.chainId}{' '}
                          {interaction.interactantOne.uniProtKBAccession}
                        </>
                      )}
                    </td>
                    <td>
                      {interaction.interactantTwo.uniProtKBAccession ? (
                        <Link
                          to={getEntryPath(
                            Namespace.uniprotkb,
                            interaction.interactantTwo.uniProtKBAccession
                          )}
                        >
                          {interaction.interactantTwo.geneName}{' '}
                          {interaction.interactantTwo.chainId}{' '}
                          {interaction.interactantTwo.uniProtKBAccession}
                        </Link>
                      ) : (
                        <>
                          {interaction.interactantTwo.geneName}{' '}
                          {interaction.interactantTwo.chainId}{' '}
                          {interaction.interactantTwo.uniProtKBAccession}
                        </>
                      )}
                    </td>
                    <td>{interaction.numberOfExperiments}</td>
                    <td>
                      <ExternalLink
                        url={
                          interaction.interactantOne.uniProtKBAccession
                            ? getIntActQueryUrl(
                                interaction.interactantOne.intActId,
                                interaction.interactantTwo.intActId
                              )
                            : getIntActQueryForAccessionUrl(primaryAccession)
                        }
                      >
                        {interaction.interactantOne.intActId},{' '}
                        {interaction.interactantTwo.intActId}
                      </ExternalLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </datatableElement.name>
        </>
      )}

      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default InteractionSection;
