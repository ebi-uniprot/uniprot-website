import { showTooltipAtCoordinates } from '../tooltip';

const tooltip = () => document.querySelector('[role="tooltip"]');

describe('showTooltipAtCoordinates', () => {
  afterEach(() => {
    tooltip()?.remove();
  });

  it('hides the tooltip when the handler is called without an event', () => {
    const hide = showTooltipAtCoordinates(10, 20, '<p>Content</p>');
    expect(tooltip()).not.toBeNull();

    hide();

    expect(tooltip()).toBeNull();
  });

  it('hides the tooltip on a click outside it', () => {
    showTooltipAtCoordinates(10, 20, '<p>Content</p>');

    document.body.click();

    expect(tooltip()).toBeNull();
  });

  it('keeps the tooltip on a click inside it', () => {
    showTooltipAtCoordinates(10, 20, '<p>Content</p>');

    tooltip()?.querySelector('p')?.click();

    expect(tooltip()).not.toBeNull();
  });
});
