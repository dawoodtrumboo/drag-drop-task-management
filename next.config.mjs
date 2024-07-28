/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/tasks",
          permanent: true,
        },
     
      ];
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false, // Optional: disable SVGO optimization
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig;