import { UIModel } from '../../../../adapters/sectionConverter';
import { DatabaseCategory } from '../../../../types/databaseRefs';

const mock: UIModel = {
  commentsData: new Map(),
  keywordData: [],
  featuresData: [],
  xrefData: [
    {
      category: DatabaseCategory.INTERACTION,
      databases: [
        {
          database: 'ComplexPortal',
          xrefs: [
            {
              database: 'ComplexPortal',
              id: 'CPX-1062',
              properties: {
                EntryName: 'Amyloid-beta protein 40/42 complex',
              },
            },
            {
              database: 'ComplexPortal',
              id: 'CPX-1069',
              properties: {
                EntryName: 'Amyloid-beta protein 40 complex',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const dataWithNoXref: UIModel = {
  commentsData: new Map(),
  keywordData: [],
  featuresData: [],
  xrefData: [],
};

export default mock;
