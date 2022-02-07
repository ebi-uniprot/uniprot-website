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
        <h2 data-article-id="interaction_section">
          {getEntrySectionNameAndId(EntrySection.Interaction).name}
        </h2>
      }
      id={EntrySection.Interaction}
      className={styles['interaction-section']}
      data-entry-section
    >
      {comments && (
        <FreeTextView
          comments={comments}
          title="subunit"
          articleId="subunit_structure"
        />
      )}
      {interactionComment?.[0] && (
        <>
          <h3 data-article-id="binary_interactions">Binary interactions</h3>
          {interactionViewerElement.defined && (
            <interactionViewerElement.name accession={primaryAccession} />
          )}
          <datatableElement.name filter-scroll>
            <table>
              <thead>
                <tr>
                  <th data-filter="type">Type</th>
                  <th data-filter="entry_1">Entry 1</th>
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
                    <td
                      data-filter="type"
                      data-filter-value={
                        interaction.organismDiffer ? 'XENO' : 'BINARY'
                      }
                    >
                      {/* NOTE: Add 'SELF' */}
                      {interaction.organismDiffer ? 'XENO' : 'BINARY'}
                    </td>
                    <td
                      data-filter="entry_1"
                      data-filter-value={
                        interaction.interactantOne.uniProtKBAccession || 'Other'
                      }
                    >
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
