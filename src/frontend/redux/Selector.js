export const createErrorMessageSelector = (actions) => (state) =>
  actions.map((action) => state.error[action])
      .find((action) => action) || []