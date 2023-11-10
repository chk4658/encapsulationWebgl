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
    chainWebpack: (config) => {
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
