const { mergeWithRules } = require('webpack-merge');
const common = require('./webpack.common.js');

const ifdefLoaderOptions = {
    LOGGING: false,
    "ifdef-verbose": true,                 // add this for verbose output
    "ifdef-triple-slash": true,            // add this to use double slash comment instead of default triple slash
    "ifdef-fill-with-blanks": true,        // add this to remove code with blank spaces instead of "//" comments
    "ifdef-uncomment-prefix": "// #code "  // add this to uncomment code starting with "// #code "
};

smartMerge = mergeWithRules({
    
    module: {
        rules: 'prepend'
    }
    
});

module.exports = (env) => {
    webPackConfig = smartMerge(common(env), {
        module: {
            rules: [
                {
                    test: /\.js?$/, 
                    exclude: /node_modules/, 
                    use: [
                        { loader: "ifdef-loader", options: ifdefLoaderOptions } 
                    ]
                }
            ]
        },
    });
    
    return webPackConfig;
};
