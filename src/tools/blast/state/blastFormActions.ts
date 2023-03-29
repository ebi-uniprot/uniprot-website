export const updateValue = (id, value: any) => ({
  type: 'update',
  payload: { id, value },
});
