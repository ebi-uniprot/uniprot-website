import React, { FC, useRef, useEffect } from 'react';
import { Card } from 'franklin-sites';
import { html, TemplateResult } from 'lit-html';
import ProtvistaDatatable from 'protvista-datatable';
import InteractionViewer from 'interaction-viewer';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FreeTextView from './components/FreeTextView';
import XRefView from './components/XRefView';
import {
  CommentType,
  FreeTextComment,
  InteractionComment,
  Interaction,
} from '../../model/types/CommentTypes';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import { loadWebComponent } from '../../utils/utils';
import {
  getIntActQueryUrl,
  getIntActQueryForAccessionUrl,
} from '../../utils/externalUrls';

loadWebComponent('interaction-viewer', InteractionViewer);
loadWebComponent('protvista-datatable', ProtvistaDatatable);

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
  columns?: {
    [name: string]: {
      label: string;
      resolver: (
        d: Interaction
      ) => string | number | TemplateResult | TemplateResult[];
    };
  };
}

const InteractionSection: FC<{
  data: UIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  const datatableContainer = useRef<HTMLInteractionDatatable>(null);
  useEffect(() => {
    const interactionComment = data.commentsData.get(
      CommentType.INTERACTION
    ) as InteractionComment[];
    if (
      datatableContainer &&
      datatableContainer.current &&
      interactionComment[0]
    ) {
      // eslint-disable-next-line no-param-reassign
      datatableContainer.current.data = interactionComment[0].interactions;
      // eslint-disable-next-line no-param-reassign
      datatableContainer.current.columns = getInteractionColumns(
        primaryAccession
      );
    }
  });

  if (!hasContent(data)) {
    return null;
  }
  const comments = data.commentsData.get(
    CommentType.SUBUNIT
  ) as FreeTextComment[];

  return (
    <div id={EntrySection.Interaction}>
      <Card title={EntrySection.Interaction}>
        {comments && (
          <FreeTextView
            comments={comments}
            title={CommentType.SUBUNIT.toLowerCase()}
          />
        )}
        <interaction-viewer accession={primaryAccession} />
        <protvista-datatable ref={datatableContainer} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default InteractionSection;
