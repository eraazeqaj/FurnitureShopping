import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },

  env:{
    MONGODB_URL: "mongorestore --uri mongodb+srv://dev-api:<rzP0pQcw7RiPS53m>@dreamliving.oo6ql2q.mongodb.net ", 
  },
}

export default nextConfig
