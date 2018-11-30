const slsw = require('serverless-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: slsw.lib.options.stage=='prod'?'production':'development',
    target: 'node',
    externals: [
        'mssql', 'mssql/lib/base', 'mssql/package.json',
        'mysql',
        'oracle', 'oracledb',
        'pg', 'pg-query-stream',
        'sqlite3',
        'tedious',
    ],
    optimization: {
        minimize: false,
        minimizer: [
            new UglifyJsPlugin({
                parallel: false,
                uglifyOptions: {
                    mangle: false,
                },
            })
            ,
        ],
    },
    plugins: [
        new CopyWebpackPlugin(['migrations/**',]),
    ],
};