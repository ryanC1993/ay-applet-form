const common = {
    stats: 'normal',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                },
            },
        ]
    },
    resolve: {
        extensions: ["*", "js", "jsx", ".ts", ".tsx"]
    },
};

module.exports = common;