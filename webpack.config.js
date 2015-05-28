module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'
            },
            {test: /\.js[x]?$/, loaders: ['jsx?harmony&stripTypes', 'flowcheck'], exclude: /node_modules/}
        ]
    }
};


