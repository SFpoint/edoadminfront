module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: {
      "^/api": {
        target: "http://10.1.20.39:8080/edo-dev",
        pathRewrite: { "^/api": "" },
        ws: true,
        changeOrigin: true,
      },
      "^/auth": {
        target: "http://10.1.20.39:8080/edo-dev",
        pathRewrite: { "^/auth": "" },
        ws: true,
        changeOrigin: true,
      },
      //
      // '^/rmo': {
      // 	target: 'http://10.1.20.46:8080/admGateway/rmo',
      // 	pathRewrite: {'^/rmo' : ''},
      // 	ws: true,
      // 	changeOrigin: true
      // },
      //
      // '^/fias-search': {
      // 	target: 'http://10.71.0.110:8081/fias-search',
      // 	pathRewrite: {'^/fias-search' : ''},
      // 	ws: true,
      // 	changeOrigin: true
      // }
    },
  },
};
