const rewire = require('rewire');
const path = require('path');

// Pointing to file which we want to re-wire — this is original build script
const defaults = rewire('react-scripts/scripts/build.js');

// Getting configuration from original build script
let config = defaults.__get__('config');

// If we want to move build result into a different folder, we can do that!
// Please note: that should be an absolute path!
//config.output.path = path.join(path.dirname(__dirname), 'build/js');

// If we want to rename resulting bundle file to not have hashes, we can do that!
config.output.filename = 'js/toolinit.js';

// do same for css
const miniCssExtractPlugin = config.plugins.find(element => element.constructor.name === "MiniCssExtractPlugin");
miniCssExtractPlugin.options.filename = "style/csf-gddtool-v4.css"

// And the last thing: disabling splitting
config.optimization.splitChunks = {
    cacheGroups: {
        default: false,
    },
};
config.optimization.runtimeChunk = false;
