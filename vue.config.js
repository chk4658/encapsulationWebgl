const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  runtimeCompiler: true,

  pages: {
    index: {
      entry: "src/main.js",
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/", // path in local development env
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // 后台接口地址
        ws: true, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          // 重写路径
          "^/api": "",
        },
      },
    },
  },
  chainWebpack: (config) => {
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("svg-sprite-loader").loader("svg-sprite-loader").options({
      symbolId: "icon-[name]",
    });
    config.output.filename("assets/js/[name].[hash].js").chunkFilename("assets/js/[name].[hash].js").end();

    // add ts-loader
    config.module
      .rule("ts")
      .test(/\.tsx?$/)
      .exclude.add(resolve("node_modules"))
      .end()
      .use("cache-loader")
      .loader("cache-loader")
      .options({
        cacheDirectory: resolve("node_modules/.cache/ts-loader"),
      })
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("ts-loader")
      .loader("ts-loader")
      .options({
        transpileOnly: false, // 关闭类型检查，即只进行转译(类型检查交给webpack插件(fork-ts-checker-webpack-plugin)在另一个进程中进行,这就是所谓的多进程方案,如果设置transpileOnly为false, 则编译和类型检查全部由ts-loader来做, 这就是单进程方案.显然多进程方案速度更快)
        // appendTsSuffixTo: ["\\.vue$"],
        happyPackMode: false,
      })
      .end();
  },
};
