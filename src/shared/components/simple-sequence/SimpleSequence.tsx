import { LongNumber, Sequence } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import { reUniParc, reUniRefAccession } from '../../../uniprotkb/utils/regexes';
import apiUrls from '../../config/apiUrls/apiUrls';
import { useMediumScreen } from '../../hooks/useMatchMedia';
import helper from '../../styles/helper.module.scss';
import { Namespace } from '../../types/namespaces';
import { Sequence as SequenceType } from '../../types/sequence';
import { sendGtagEventCopyFastaClick } from '../../utils/gtagEvents';
import AddToBasketButton from '../action-buttons/AddToBasket';

const sequenceTools: Partial<Record<Namespace, string[]>> = {
  uniparc: ['ProtParam', 'Compute pI/Mw', 'PeptideMass', 'PeptideCutter'],
  uniref: [],
};

const SimpleSequence = ({
  accession,
  sequence,
}: {
  accession: string;
  sequence: SequenceType;
}) => {
  const mediumScreen = useMediumScreen();
  const history = useHistory();

  let namespace = Namespace.uniprotkb;
  if (reUniParc.test(accession)) {
    namespace = Namespace.uniparc;
  } else if (reUniRefAccession.test(accession)) {
    namespace = Namespace.uniref;
  }
  const infoData = [
    {
      title: 'Length',
      content: sequence.length,
    },
    {
      title: 'Mass (Da)',
      content: <LongNumber>{sequence.molWeight}</LongNumber>,
    },
    {
      title: <span data-article-id="checksum">MD5 Checksum</span>,
      content: <span className={helper['break-anywhere']}>{sequence.md5}</span>,
    },
  ];

  return (
    <Sequence
      sequence={sequence.value}
      infoData={infoData}
      isCollapsible={
        mediumScreen ? sequence.length > 200 : sequence.length > 400
      }
      accession={accession}
      onBlastClick={() =>
        history.push(LocationToPath[Location.Blast], {
          parameters: { sequence: sequence.value },
        })
      }
      downloadUrl={apiUrls.entry.sequenceFasta(accession, namespace)}
      addToBasketButton={
        <AddToBasketButton
          selectedEntries={accession}
          // Not sure why a key is needed, but otherwise gets the React key
          // warnings messages and children are rendered as array...
          key="add-to-basket"
        />
      }
      onCopy={() => sendGtagEventCopyFastaClick(accession)}
      sequenceTools={sequenceTools[namespace]}
    />
  );
};

export default SimpleSequence;
