
const config = require('config')
const path = require('path')
const fs = require('fs-extra')

const nodeExternals = require('webpack-node-externals')

const tmpPath = path.resolve(__dirname, 'tmp')
const distPath = path.resolve(__dirname, 'dist')


// ===========================================
//      PATHS
// ----------------------------------------

try {
    fs.mkdirSync(tmpPath)
} catch (err) {
    // console.warn(err)
}

try {
    fs.emptyDirSync(tmpPath)
    fs.emptyDirSync(distPath)
} catch (err) {
    console.warn(err)
}


// ===========================================
//      CONFIG
// ----------------------------------------

const configFilePath = path.resolve(distPath, 'config.json')

fs.writeFileSync(configFilePath, JSON.stringify(config, null, 4))


// ===========================================
//      BABEL
// ----------------------------------------

let babelConfig = fs.readFileSync('./.babelrc', 'utf8')

babelConfig = babelConfig.replace(/^\/.*$/gmi, '').trim()

const babelOptions = JSON.parse(babelConfig)


// ===========================================
//      WEBPACK
// ----------------------------------------

module.exports = {
    entry: {
        main: './index.js',
    },

    // entry: './index.js',

    target: 'node',

    // extensions: ['.js', '.json'],

    externals: [
        nodeExternals(),
    ],

    output: {
        libraryTarget: 'commonjs',
        path: distPath,
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions,
                },
            },
        ],
    },

    optimization: {
        minimize: false,
    },

    devtool: 'source-map',
}
