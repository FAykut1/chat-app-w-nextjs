export const extractTime = (date: Date) => {
  return date.toLocaleTimeString(undefined, {
    timeStyle: 'short',
  });
};
