/** @type {import('next').NextConfig} */
const nextConfig = {
  //allow all images   
  images: {        
    domains: ['*','**'],
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '**.com',
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com',
        port: "",
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        port: "",
      },
    ]
  },
}

module.exports = nextConfig
