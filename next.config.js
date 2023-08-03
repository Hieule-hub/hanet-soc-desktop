// const withAntdLess = require('next-plugin-antd-less');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true'
// });

// const nextConfig = withAntdLess({
//     // optional: you can modify antd less variables directly here
//     // modifyVars: { '@primary-color': '#04f' },
//     // Or better still you can specify a path to a file
//     // lessVarsFilePath: './src/styles/index.less',
//     // optional
//     lessVarsFilePathAppendToEndOfContent: false,
//     // optional https://github.com/webpack-contrib/css-loader#object
//     cssLoaderOptions: {
//         modules: {
//             mode: 'local',
//             auto: true,
//             exportGlobals: true,
//             localIdentName: '[path][name]__[local]--[hash:base64:5]',
//             // localIdentContext: path.resolve(__dirname, 'src'),
//             localIdentHashSalt: 'my-custom-hash',
//             namedExport: true,
//             exportLocalsConvention: 'camelCase',
//             exportOnlyLocals: false
//         }
//     },

//     // for Next.js ONLY
//     nextjs: {
//         localIdentNameFollowDev: true // default false, for easy to debug on PROD mode
//     },

//     // Other Config Here...

//     webpack(config) {
//         return config;
//     },

//     reactStrictMode: true,
//     images: {
//         unoptimized: true,
//         domains: ['via.placeholder.com']
//     }
// });
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    images: {
        unoptimized: true,
        // domains: ['via.placeholder.com']
    }
};

module.exports = nextConfig;
