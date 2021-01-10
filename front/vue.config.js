module.exports = {
    runtimeCompiler: true,
    devServer: {
        port: 8080,
        proxy: {
          "/api/": {
            target: "http://localhost:3000",
            changeOrigin: true,
            logLevel: 'debug'
          },
          "/users": {
            target: "http://localhost:3000/users",
            changeOrigin: true,
            logLevel: 'debug'
          },
          "/users/": {
            target: "http://localhost:3000/users/",
            changeOrigin: true,
            logLevel: 'debug'
          }
        }
      }
}