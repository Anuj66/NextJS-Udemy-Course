const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_database: "post",
      },
    };
  }

  return {
    env: {
      mongodb_database: "post",
    },
  };
};