module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "presets": ["@babel/preset-flow"],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // The module name used for importing environment variables
        path: '.env', // Path to your .env file
      },
    ],
  ],
};
