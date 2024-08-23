import { screen } from '@testing-library/react';
import { ColumnConfiguration } from '../types/columnConfiguration';
import customRender from './customRender';

function testColumnConfiguration<
  Column extends string,
  UIModel extends Record<string, unknown>
>(columnConfiguration: ColumnConfiguration<Column, UIModel>, data: UIModel) {
  test.each(Array.from(columnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = customRender(<>{column.render(data)}</>);
      expect(asFragment()).toMatchSnapshot(key);

      const hasMoreButton =
        screen.queryByTitle('Show more') ||
        screen.queryByTestId('expandable-message');
      if (hasMoreButton) {
        hasMoreButton.click();
        expect(asFragment()).toMatchSnapshot(`${key}-expanded`);
      }
    }
  );
}

export default testColumnConfiguration;
