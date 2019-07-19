const nodeExternals = require('webpack-node-externals');

module.exports = {
    webpack: (config, options, webpack) => {
      // Perform customizations to config
      // Important: return the modified config
  
      // changes the name of the entry point from index -> main.js
      config.target = 'node';
      config.externals = [nodeExternals()];
      return config;
    }
  }