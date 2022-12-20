const { VueLoaderPlugin } = require('vue-loader')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


// mudule의 .vue 파일은 정규식표현을 통해, vue-loader가 해설 할 수 있도록 작성한다. 
// style 부분이 해석할 수 있도록, 처음로 vue-stlye-loader
// new VueLoaderPlugin(),로 플로그인 연결하는 부분

module.exports = (env, options) => {
  console.log(env, options)
  return {
    // import시 확장자 없이 import 할 수 있도록
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        '~': `${__dirname}/src` // 경로 별칭 설정
      }
    },
    entry: './src/main.js',// 시작 지점 설정
    output: {
      // path: `${__dirname}/dist`,
      // filename: '[name].js',
      publicPath: '/',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: `
                  @use "sass:color";
                  @use "sass:list";
                  @use "sass:map";
                  @use "sass:math";
                  @use "sass:meta";
                  @use "sass:selector";
                  @use "sass:string";
                  @import "~/scss/_variables";
                `
              }
            }
          ]
        },
        // https://webpack.kr/guides/asset-modules/
        {
          test: /\.(png|jpe?g|svg|gif|webp)/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlPlugin({
        template: './src/index.html'
      }),
      new CopyPlugin({
        patterns: [
          { from: 'static' }
        ]
      })
    ],
    devServer: {
      // port: 8080,
      historyApiFallback: true
    }
  }
}
