// const nextConfig = {
//   experimental: {
//     esmExternals: "loose", // <-- add this
//     serverComponentsExternalPackages: ["mongoose"] // <-- and this
//   },
//   // and the following to enable top-level await support for Webpack
//   webpack: (config) => {
//     config.experiments = {
//       topLevelAwait: true
//     };
//     return config;
//   },
// }

// module.exports = nextConfig;

// next.config.js
// module.exports = {
//   async rewrites() {
//       return [
//         {
//           source: '/api/:path*',
//           destination: 'https://google.com',
//         },
//       ]
//     },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig