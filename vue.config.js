const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_API, // 域名
        ws: true, // 是否启用websockets
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('components',resolve('./src/components'))
    .set('img', resolve('./src/assets/images'))
    .set('styles', resolve('./src/styles'))
    //set第一个参数：设置的别名，第二个参数：设置的路径　　
  },
  css: {
    loaderOptions: {
    	// 给 sass-loader 传递选项
    	sass: {
    		// @/ 是 src/ 的别名
        // 所以这里假设你有 `src/styles/variables.scss` 这个文件
    	// 	prependData: `@import "@/styles/variables.scss";`
    	}
    }
  }


}
