import React, { FC } from 'react';
import { uniq } from 'lodash';
import { Loader, Publication, DataList } from 'franklin-sites';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';

const EntryPublications: FC<{
  accession: string;
  data: LiteratureForProteinAPI[] | null;
  total: number;
  handleLoadMoreItems: () => void;
}> = ({ accession, data, total, handleLoadMoreItems }) => {
  if (!data || data.length === 0) {
    return <Loader />;
  }

  return (
    <section>
      <div style={{ height: '80vh' }}>
        <h2>Publications for {accession}</h2>
        {/* The height css will be removed after Franklin DataList is updated */}
        <DataList
          idKey="id"
          data={data}
          dataRenderer={({
            reference,
            publicationSource,
            statistics,
            categories,
          }: LiteratureForProteinAPI) => {
            const {
              citation,
              referencePositions,
              referenceComments,
            } = reference;

            const pubMedXref =
              citation.citationCrossReferences &&
              citation.citationCrossReferences.find(
                xref => xref.database === 'PubMed'
              );

            const doiXref =
              citation.citationCrossReferences &&
              citation.citationCrossReferences.find(
                xref => xref.database === 'DOI'
              );

            const pubmedId = pubMedXref && pubMedXref.id;

            const journalInfo = {
              journal: citation.journal,
              volume: citation.volume,
              firstPage: citation.firstPage,
              lastPage: citation.lastPage,
              publicationDate: citation.publicationDate,
              doiId: doiXref && doiXref.id,
            };

            const infoListData = [
              {
                title: 'Cited for',
                content: referencePositions,
              },
              {
                title: 'Tissue',
                content: referenceComments && (
                  <ul className="no-bullet">
                    {referenceComments.map(comment => (
                      <li key={comment.value}>{comment.value}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: 'Categories',
                content: categories && (
                  <ul className="no-bullet">
                    {uniq(categories).map(category => (
                      <li key={category}>{category}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: 'Source',
                content: publicationSource,
              },
            ];
            return (
              reference && (
                <Publication
                  {...citation}
                  abstract={citation.literatureAbstract}
                  infoData={infoListData}
                  statistics={statistics}
                  pubmedId={pubmedId}
                  journalInfo={journalInfo}
                />
              )
            );
          }}
          onLoadMoreItems={handleLoadMoreItems}
          hasMoreData={total > data.length}
        />
      </div>
    </section>
  );
};

export default EntryPublications;
