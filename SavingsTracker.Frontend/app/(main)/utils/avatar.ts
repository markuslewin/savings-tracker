export const getInitial = (fullName: string) => {
  const results = /\w+/.exec(fullName);
  if (results === null) return "";
  return results[0][0].toUpperCase();
};
