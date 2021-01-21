module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: 8080,
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        logLevel: "debug",
        pathRewrite: { "^/api/": "/api/" },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/scss/_variables.scss";
          `,
      },
    },
  },
};
