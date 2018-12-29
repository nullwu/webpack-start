const path = require('path')
const webpack = require('webpack');  //热更新需要用到
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'main.[hash:4].js',
    path: path.resolve('./build')
  },
  //   optimization:{
  //     splitChunks:{
  // 				chunks:"initial",
  // 				name:'common'
  // 		}

  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/,
        exclude: /node_modules/,
        // options: {
        //      这一块可以放到.babelrc去配置
        //   "presets": ["react", "env", "stage-0"],
        //   "plugins": ["transform-runtime"]
        // }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "url-loader",
        },
        // options: {  //最近这个地方老报错
        // 	limit: 25000,  //小于这个数转为base64
        // },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader', options: {
              // modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',      // 默认是localhost
    historyApiFallback: true,   // 所有路径都会执行html，刷新不会404
    open: true,            //自动打开浏览器
    progress: true,         //启动服务器的显示进度
    // contentBase: './build',  //这里到底啥意思,写不写都没事啊
    port: 3000, //默认的端口是8080
    hot: true               // 注意，不用配置都会自动刷新的，自动刷新不等于热更新。而这个hot是热更新的第一步配置，但仅仅这样是不行的，需要做其他的配置。
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),  //热更新
    new CleanWebpackPlugin(['./build']),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      // chunkFilename: "[id].css"  //这特么是个啥，带不带没区别啊
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true,
    })

  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      '@': resolve('src')
    }
  },



}

// "babel-loader"用最新版本8+的要出事,暂时锁定在7版本

// 刚需
// "webpack": "^4.26.0",
// "webpack-cli": "^3.1.2",

// 开发服务器
// "webpack-dev-server": "^3.1.10"


//关于babel
// babel-loader  刚需
// babel-core  babel操作的api核心模块
// babel-polyfill 
    //Babel默认只转换新的JavaScript句法,而不转换新的API
    // Array.from,Set、Maps、Promise,等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码
    // Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill
//babel-plugin-transform-runtime    
   // 能够支持asypnc和部分babel-polyfill支持的东西, 但是Set 就不支持
   //  并且它的主要目的并不在此，因此这两个插件都需要加
  //  参考：https://blog.csdn.net/chiuwingyan/article/details/80777016

//babel-preset-env
  // 她包含了babel-preset-es 和 babel-preset-stag-4
  //所以我们需要安装env和preset-stage-0
// babel-preset-react
  //  顾名思义，用来解析react的

//babelrc 专门用来配置babel的
    // {
    //   "presets": ["react","env", "stage-0"]  ,
    //   "plugins": [ "transform-runtime"]
    // }
  //  当然我们也可以直接在本页面配置
      //  module: {
      //   rules: [
      //     {
      //       test: /\.js$/,
      //       use: 'babel-loader',
      //       include: /src/,
      //       exclude: /node_modules/,
      //       options: {

      //         //    这一块可以放到.babelrc去配置
      //         // "presets": ["react", "env", "stage-0"],
      //         // "plugins": ["transform-runtime"]

      //       }
      // ***相当于将options的内容搬至.babelrc*****//



      // clean-webpack-plugin  打包之前先清理


      //html-webpack-plugin 打包好的html会自动引入js，css等，我们只需要配置template即可


      // css-loader,style-loader,mini-css-extract-plugin

      // css-loader和后两个任意一个配合使用,和style-loader打包后是把样式插入行内,更多的我们是想要单独拆分css,所以一般使用后者
      // {
      //   test: /\.scss$/,
      //   use: [
      //     { loader: MiniCssExtractPlugin.loader },
      //     {
      //       loader: 'css-loader', options: {
      //         // modules: true
      //       }
      //     },
      //     {
      //       loader: 'sass-loader'     如果不用sass,就不不要这个,从后向前解析,顺序不能改变
      //     }
      //   ]
      // }

      // url-loader 解析图片svg等


      // 关于热更新
      // let webpack = require('webpack');
      // module.exports = {
      //     plugins: [
      //         new webpack.HotModuleReplacementPlugin()
      //     ],
      //     devServer: {
      //         contentBase: './BUILD',
      //         hot: true,
      //         port: 3000
      //     }
      // }
      // 在入口文件中
      // if (module.hot) {

      //   module.hot.accept();
      // }
