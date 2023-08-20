module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@services': './src/services',
            '@routes': './src/routes',
            '@dtos': './src/dtos',
            '@theme': './src/theme',
            '@schemas': './src/schemas',
          },
        },
      ],
    ],
  };
};
