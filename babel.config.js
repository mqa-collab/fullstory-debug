module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "@fullstory/react-native",
      [ "@fullstory/babel-plugin-annotate-react", {
        native: true
      }]
    ]
  };
};
