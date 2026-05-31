module.exports = {
  name: "Nomad",
  slug: "digital-nomad-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "digitalnomadapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.nicolasobp.digitalnomadapp",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#1B1B1B",
      foregroundImage: "./assets/images/adaptive-icon.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.nicolasobp.digitalnomadapp",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#1B1B1B",
        dark: {
          backgroundColor: "#1B1B1B",
        },
      },
    ],
    "expo-sqlite",
    "expo-web-browser",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "45da011b-4e2c-4975-8675-0c01fc0e86ca",
    },
  },
  updates: {
    url: "https://u.expo.dev/45da011b-4e2c-4975-8675-0c01fc0e86ca",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
};
