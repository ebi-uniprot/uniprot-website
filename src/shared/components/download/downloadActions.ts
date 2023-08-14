import { action } from 'typesafe-actions';
import { Column } from '../../config/columns';

export const UPDATE_SELECTED_COLUMNS = 'UPDATE_SELECTED_COLUMNS' as const;

export const updateSelectedColumns = (columns: Column[]) =>
  action(UPDATE_SELECTED_COLUMNS, { columns });
