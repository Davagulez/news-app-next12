/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'ichef.bbci.co.uk',
      's.yimg.com',
      'images.wsj.net',
      'media.zenfs.com',
      'image.cnbcfm.com',
      'cdn.motor1.com',
      'www.reuters.com',
      "media.cnn.com",
      "www.adn.com",
      'ychef.files.bbci.co.uk',
      "images.mktw.net",
      "blog.tipranks.com",
      "i.abcnewsfe.com",
      "editorial.fxstreet.com",
      "blogger.googleusercontent.com",
      "kutv.com"
    ]
  }
}

module.exports = nextConfig
