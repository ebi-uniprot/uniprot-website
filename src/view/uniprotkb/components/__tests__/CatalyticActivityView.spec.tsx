import React from 'react';
import { render } from '@testing-library/react';
import CatalyticActivityView, {
  getRheaId,
  isRheaReactionReference,
  RheaReactionVisualizer,
  ReactionDirection,
} from '../CatalyticActivityView';
import catalyticActivityUIDataJson from '../__mocks__/CatalyticActivityUIData.json';

describe('CatalyticActivityView component', () => {
  test('should render catalytic activity', () => {
    const { asFragment } = render(
      <CatalyticActivityView comments={catalyticActivityUIDataJson} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('RheaReactionVisualizer component', () => {
  test('should render RheaReactionVisualizer', () => {
    const { asFragment } = render(
      <RheaReactionVisualizer rheaId={12345} show={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('getRheaId function', () => {
  test('should return id 12345 from RHEA:12345', () => {
    expect(getRheaId('RHEA:12345')).toEqual(12345);
  });
  test('should return null from RHEA-COMP:12345', () => {
    expect(getRheaId('RHEA-COMP:12345')).toEqual(null);
  });
});

describe('isRheaReactReference function', () => {
  test('should return true when database=Rhea and id string is RHEA:12345', () => {
    expect(
      isRheaReactionReference({ databaseType: 'Rhea', id: 'RHEA:12345' })
    ).toEqual(true);
  });
  test('should return true when database=ChEBI and id string is CHEBI:57287', () => {
    expect(
      isRheaReactionReference({ databaseType: 'ChEBI', id: 'CHEBI:57287' })
    ).toEqual(false);
  });
});

describe('ReactionDirection component', () => {
  const { physiologicalReactions } = catalyticActivityUIDataJson[0];
  test('should render ReactionDirection when one physiologicalReactions is present ', () => {
    const { asFragment } = render(
      <ReactionDirection
        physiologicalReactions={physiologicalReactions.slice(0, 1)}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render ReactionDirection when two physiologicalReactions are present and should be in correct order (forwards then backwards) ', () => {
    const { asFragment, getAllByTestId } = render(
      <ReactionDirection physiologicalReactions={physiologicalReactions} />
    );
    expect(asFragment()).toMatchSnapshot();
    const directions = getAllByTestId('direction-text');
    expect(directions[0].textContent).toBe('forward');
    expect(directions[1].textContent).toBe('backward');
  });

  test('should not render a ReactionDirection when more than two physiologicalReactions are present ', () => {
    const { asFragment } = render(
      <ReactionDirection
        physiologicalReactions={[
          ...physiologicalReactions,
          ...physiologicalReactions,
        ]}
      />
    );
    expect(asFragment().childElementCount).toEqual(0);
  });
});
