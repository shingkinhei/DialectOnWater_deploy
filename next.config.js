/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const withImages = require("next-images");

module.exports = withImages(); 
module.exports = nextConfig

module.exports = {
  async rewrites (){
    return [
      {
        source: '/api/:path*',
        destination:'http://localhost:3000/:path*'
      }
    ]
  }
}