import React, { FC, Fragment } from 'react';
import Comment from '../../../model/types/Comment';

enum InteractionType {
  SELF = 'SELF',
  XENO = 'XENO',
  BINARY = 'BINARY',
  // Are there others?
}

type Interaction = {
  firstInteractor: string;
  numberOfExperiments: number;
  secondInteractor: string;
  type: InteractionType;
  geneName?: string;
  uniProtAccession?: string;
};

export type InteractionComment = {
  commentType: Comment;
  interactions: Interaction[];
};

const InteractionView: FC<{}> = () => <Fragment />;

export default InteractionView;
