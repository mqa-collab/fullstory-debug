const config = {
  expo: {
    name: 'Fullstory-debug',
    slug: 'Fullstory-debug',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/source-icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.xxxxxxxxxxxxxxxxxxxxxxxx.fullstorydebug',
    },
    plugins: [
      [
        '@fullstory/react-native',
        {
          version: '1.58.0',
          org: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        }
      ]
    ]
  },

};

export default config;
