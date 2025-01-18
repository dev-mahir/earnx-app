module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // The module name used for importing environment variables
        path: '.env', // Path to your .env file
      },
    ],
  ],
};
