const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: isProduction ? 'dist' : '/',
  indexPath: isProduction ? '../index.html' : 'index/html',
};
