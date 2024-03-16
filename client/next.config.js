module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for file changes every second
      aggregateTimeout: 300, // Delay the rebuild process by 300 milliseconds
    };
    return config;
  },
};
