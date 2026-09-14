const path = require('path');

const withImages = require('next-images');
const withFonts = require('next-fonts');

const withTM = require('next-transpile-modules')(['react-native-vector-icons'], {
    devIndicators: {
        autoPrerender: false
    }
});

configuration = withTM(
    withImages(
        withFonts({
            experimental: {
                externalDir: true
            },

            images: {},
            trailingSlash: true,
            reactStrictMode: false,
            webpack: (config, options) => {
                config.resolve.alias = {
                    ...(config.resolve.alias || {}),

                    'react-native$': 'react-native-web'
                };
                config.resolve.extensions = [
                    '.web.js',
                    '.web.ts',
                    '.web.tsx',
                    ...config.resolve.extensions
                ];

                if (options.isServer) {
                    config.externals = ['react', 'react-native-web', ...config.externals];
                }
                config.resolve.alias['react'] = path.resolve(
                    __dirname,
                    '.',
                    'node_modules',
                    'react'
                );

                config.resolve.alias['react-native-web'] = path.resolve(
                    __dirname,
                    '.',
                    'node_modules',
                    'react-native-web'
                );

                config.module.rules.push({
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'application/octet-stream'
                            }
                        }
                    ],
                    include: path.resolve(__dirname, 'node_modules/react-native-vector-icons')
                });

                config.module.rules.push({
                    test: /\.svg$/,
                    use: ['@svgr/webpack']
                });

                return config;
            },
            typescript: {
                ignoreBuildErrors: true
            },
            eslint: {
                ignoreDuringBuilds: true
            }
        })
    )
);

module.exports = configuration;
