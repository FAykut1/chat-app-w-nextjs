export const extractTime = (date: number) => {
  return new Date(date).toLocaleTimeString(undefined, {
    timeStyle: 'short',
  });
};
