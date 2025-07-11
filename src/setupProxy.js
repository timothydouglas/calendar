import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
  app.use(
    ['/Calendar', '/AvailableDate', '/me'],
    createProxyMiddleware({
      target: process.env.REACT_APP_API_TARGET,
      changeOrigin: true,
      pathRewrite: {
        '^/Calendar': process.env.REACT_APP_API_URL + '/Calendar',
        '^/AvailableDate': process.env.REACT_APP_API_URL + '/AvailableDate',
        '^/me': process.env.REACT_APP_API_URL + '/me'
      }
    })
  );
  app.use(
    ['/locations/*', '/workUnits/*'],
    createProxyMiddleware({
      target: process.env.REACT_APP_REFERENCE_API_TARGET,
      changeOrigin: true,
      pathRewrite: {
        '^/locations': process.env.REACT_APP_REFERENCE_API_URL + '/locations',
        '^/workUnits': process.env.REACT_APP_REFERENCE_API_URL + '/workUnits'
      }
    })
  );
};
