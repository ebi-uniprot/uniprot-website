import { render, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import CatalyticActivityView, {
  getRheaId,
  isRheaReactionReference,
  RheaReactionVisualizer,
  ReactionDirection,
  ZoomModalContent,
} from '../CatalyticActivityView';

import catalyticActivityUIData from './__mocks__/catalyticActivityUIData';

describe('CatalyticActivityView component', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.warn = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should render catalytic activity', () => {
    const { asFragment } = customRender(
      <CatalyticActivityView
        comments={catalyticActivityUIData}
        title="Catalytic activity"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('should render catalytic activity when comment does not have reactionCrossReferences', () => {
    const comment = catalyticActivityUIData[0];
    const { asFragment } = customRender(
      <CatalyticActivityView comments={[comment]} />
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
  const { physiologicalReactions } = catalyticActivityUIData[0];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render ReactionDirection when one physiologicalReactions is present', () => {
    const { asFragment } = customRender(
      <ReactionDirection
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        physiologicalReactions={physiologicalReactions!.slice(0, 1)}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render ReactionDirection when two physiologicalReactions are present and should be in correct order (forwards then backwards)', () => {
    const { asFragment } = customRender(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      <ReactionDirection physiologicalReactions={physiologicalReactions!} />
    );
    expect(asFragment()).toMatchSnapshot();
    const directions = screen.getAllByTestId('direction-text');
    expect(directions[0].textContent).toBe('forward');
    expect(directions[1].textContent).toBe('backward');
  });

  test('should not render a ReactionDirection when more than two physiologicalReactions are present and to have raised the approriate error in the console', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const { asFragment } = customRender(
      <ReactionDirection
        physiologicalReactions={[
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...physiologicalReactions!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...physiologicalReactions!,
        ]}
      />
    );
    expect(asFragment().childElementCount).toEqual(0);
    // NOTE: should we test writing to the console?
    // eslint-disable-next-line no-console
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
