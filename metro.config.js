const { getDefaultConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
module.exports = async () => {
    const defaultConfig = await getDefaultConfig();

    defaultConfig.transformer.babelTransformerPath = require.resolve(
        'react-native-svg-transformer'
    );

    defaultConfig.resolver.assetExts = [
        ...defaultConfig.resolver.assetExts,
        'svg', // Add svg file extension to the asset types
    ];

    return defaultConfig;
};