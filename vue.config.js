module.exports = {
    chainWebpack: config => {
      // Pug loader
      config.module
        .rule('pug')
        .test(/\.pug$/)
        .use('pug-plain-loader')
          .loader('pug-plain-loader')
          .end()
        // sass loadeer

        .rule('scss')
        .test(/\.scss$/)
        .use('sass-loader')
          .loader('sass-loader')
          .end()

      // css loader
        .rule('css')
        .test(/\.css$/i)
        .use('css-loader')
          .loader('css-loader')
          .end()
        
    },
    runtimeCompiler: true
  }
  