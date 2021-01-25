import { act, render } from '@testing-library/react';
import CatalyticActivityView, {
  getRheaId,
  isRheaReactionReference,
  RheaReactionVisualizer,
  ReactionDirection,
  ZoomModalContent,
} from '../CatalyticActivityView';
import catalyticActivityUIDataJson from './__mocks__/catalyticActivityUIData.json';
import { removeProperty } from '../../../../shared/utils/utils';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

describe('CatalyticActivityView component', () => {
  test('should render catalytic activity', () => {
    const { asFragment } = renderWithRedux(
      <CatalyticActivityView
        comments={catalyticActivityUIDataJson}
        title="Catalytic activity"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('should render catalytic activity when comment does not have reactionCrossReferences', () => {
    const comment = catalyticActivityUIDataJson[0];
    const commentWithoutReactionReferences = {
      ...comment,
      reaction: removeProperty(comment.reaction, 'reactionCrossReferences'),
    };
    const { asFragment } = renderWithRedux(
      <CatalyticActivityView comments={[commentWithoutReactionReferences]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('RheaReactionVisualizer component', () => {
  test('should render RheaReactionVisualizer', async () => {
    await act(async () => {
      const { asFragment } = render(
        <RheaReactionVisualizer rheaId={12345} show={false} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
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
      isRheaReactionReference({ database: 'Rhea', id: 'RHEA:12345' })
    ).toEqual(true);
  });
  test('should return true when database=ChEBI and id string is CHEBI:57287', () => {
    expect(
      isRheaReactionReference({ database: 'ChEBI', id: 'CHEBI:57287' })
    ).toEqual(false);
  });
});

describe('ReactionDirection component', () => {
  const { physiologicalReactions } = catalyticActivityUIDataJson[0];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render ReactionDirection when one physiologicalReactions is present', () => {
    const { asFragment } = renderWithRedux(
      <ReactionDirection
        physiologicalReactions={physiologicalReactions.slice(0, 1)}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render ReactionDirection when two physiologicalReactions are present and should be in correct order (forwards then backwards)', () => {
    const { asFragment, getAllByTestId } = renderWithRedux(
      <ReactionDirection physiologicalReactions={physiologicalReactions} />
    );
    expect(asFragment()).toMatchSnapshot();
    const directions = getAllByTestId('direction-text');
    expect(directions[0].textContent).toBe('forward');
    expect(directions[1].textContent).toBe('backward');
  });

  test('should not render a ReactionDirection when more than two physiologicalReactions are present and to have raised the approriate error in the console', () => {
    console.error = jest.fn();
    const { asFragment } = renderWithRedux(
      <ReactionDirection
        physiologicalReactions={[
          ...physiologicalReactions,
          ...physiologicalReactions,
        ]}
      />
    );
    expect(asFragment().childElementCount).toEqual(0);
    expect(console.error).toHaveBeenCalledWith(
      'More than two physiological reactions encountered when rendering catalytic activity'
    );
  });
});

describe('ZoomModalContent component', () => {
  test('should render', () => {
    const { asFragment } = render(
      <ZoomModalContent imgURL="https://image.png" chebi="chebi:12345" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
