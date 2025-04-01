const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

/**
 * metro.config.js
 */

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      // Remove "cjs" from assetExts (if present) so that they are treated as source files
      assetExts: assetExts.filter(ext => ext !== 'cjs'),
      // Add cjs, ts, and tsx to sourceExts so that Metro processes them
      sourceExts: [...sourceExts, 'cjs', 'ts', 'tsx'],
    },
  };
})();

