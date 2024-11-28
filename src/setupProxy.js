/* eslint-disable @typescript-eslint/no-explicit-any */

//Table Original
const table1 = "https://tableofmanythings-8000.restdb.io";


// //Table de Emergencia 1
// const table1 = "https://tableofmorethings-edae.restdb.io";


// //Table de Emergencia 2 - Yara
// const table1 = "https://tableofevemorethings-abb1.restdb.io";


//Table de Emergencia 3 - Yara
// const table1 = "https://tableofinfinitthings-8b98.restdb.io";


const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: table1,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api from the request path
      },
    })
  );
};
