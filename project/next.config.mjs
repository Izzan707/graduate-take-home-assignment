/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/project-izzan-react",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/project-izzan-react',
          basePath: false,
          permanent: false
      }
    ]
  },
}

export default nextConfig