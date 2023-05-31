module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_PREFIX_DOMAIN_URL
    : '/',
}