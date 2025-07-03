const APP_NAME_SUFFIX = process.env.APP_NAME_SUFFIX || '';
const APP_IDENTIFIER_SUFFIX = process.env.APP_IDENTIFIER_SUFFIX || '';

export default ({ config }) => ({
  ...config,
  name: config.name + APP_NAME_SUFFIX,
  ios: {
    ...config.ios,
    bundleIdentifier: config.ios.bundleIdentifier + APP_IDENTIFIER_SUFFIX,
  },
  android: {
    ...config.android,
    package: config.android.package + APP_IDENTIFIER_SUFFIX,
  },
});
