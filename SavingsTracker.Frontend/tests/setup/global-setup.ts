export const setup = () => {
  // Pin time zone so that we can test dates with offsets
  process.env.TZ = "UTC";
};
