import { useRef, useEffect } from 'react';
import { Card, Loader } from 'franklin-sites';
import { html, TemplateResult } from 'lit-html';

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

import {
  FreeTextComment,
  InteractionComment,
  Interaction,
} from '../../types/commentTypes';
import { UIModel } from '../../adapters/sectionConverter';

const getInteractionColumns = (primaryAccession: string) => ({
  title: {
    label: 'Type',
    resolver: (d: Interaction) => d.type,
  },
  entry1: {
    label: 'Entry 1',
    resolver: (d: Interaction) =>
      html`
        <a href="/uniprotkb/${d.interactantOne.uniProtkbAccession}"
          >${d.interactantOne.uniProtkbAccession}</a
        >
        ${d.interactantOne.geneName} ${d.interactantOne.chainId}
      `,
  },
  entry2: {
    label: 'Entry 2',
    resolver: (d: Interaction) =>
      html`
        <a href="/uniprotkb/${d.interactantTwo.uniProtkbAccession}"
          >${d.interactantTwo.uniProtkbAccession}</a
        >
        ${d.interactantTwo.geneName} ${d.interactantTwo.chainId}
      `,
  },
  experiments: {
    label: 'Number of experiments',
    resolver: (d: Interaction) => d.numberOfExperiments,
  },
  intact: {
    label: 'Intact',
    resolver: (d: Interaction) =>
      html`
        <a
          href=${d.interactantOne.uniProtkbAccession
            ? getIntActQueryUrl(
                d.interactantOne.intActId,
                d.interactantTwo.intActId
              )
            : getIntActQueryForAccessionUrl(primaryAccession)}
          target="_blank"
          >${d.interactantOne.intActId}, ${d.interactantTwo.intActId}</a
        >
      `,
  },
  // NOTES SEEM TO BE MISSING FROM THE RESPONSE
  // notes: {
  //   label: 'Notes',
  //   resolver: (d:Interaction) => d.
  // }
});

interface HTMLInteractionDatatable extends HTMLElement {
  data?: Interaction[];
  columns?: Record<
    string,
    {
      label: string;
      resolver: (
        d: Interaction
      ) => undefined | string | number | TemplateResult | TemplateResult[];
    }
  >;
}

type Props = {
  data: UIModel;
  primaryAccession: string;
};

const InteractionSection = ({ data, primaryAccession }: Props) => {
  const datatableContainer = useRef<HTMLInteractionDatatable>(null);
  const datatableDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-track" */ 'protvista-datatable'),
    'protvista-datatable'
  );

  useEffect(() => {
    const interactionComment = data.commentsData.get(
      'INTERACTION'
    ) as InteractionComment[];
    if (
      datatableContainer.current &&
      datatableDefined &&
      interactionComment &&
      interactionComment[0]
    ) {
      // eslint-disable-next-line no-param-reassign
      datatableContainer.current.data = interactionComment[0].interactions;
      // eslint-disable-next-line no-param-reassign
      datatableContainer.current.columns = getInteractionColumns(
        primaryAccession
      );
    }
  }, [datatableDefined, data.commentsData, primaryAccession]);

  const interactionViewerDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-track" */ 'interaction-viewer'),
    'interaction-viewer'
  );

  if (!hasContent(data)) {
    return null;
  }
  const comments = data.commentsData.get('SUBUNIT') as FreeTextComment[];

  if (!(datatableDefined && interactionViewerDefined)) {
    return <Loader />;
  }

  return (
    <Card
      header={
        <h2>{getEntrySectionNameAndId(EntrySection.Interaction).name}</h2>
      }
      id={EntrySection.Interaction}
      data-entry-section
    >
      {comments && <FreeTextView comments={comments} title="subunit" />}
      <interaction-viewer accession={primaryAccession} />
      <protvista-datatable ref={datatableContainer} filter-scroll />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default InteractionSection;
