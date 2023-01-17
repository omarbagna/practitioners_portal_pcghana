const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (apps) {
	apps.use(
		createProxyMiddleware('/pcghana-api/', {
			target: 'https://goldenministersfellowship.org',
			changeOrigin: true,
		})
	);
};
