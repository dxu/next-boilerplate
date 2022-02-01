/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // see https://github.com/near/near-explorer/pull/873, there's an issue
  // with circular imports, happens when using apollo
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig
