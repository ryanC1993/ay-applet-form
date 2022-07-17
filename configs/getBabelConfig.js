const getBabelConfig = ({ modules = 'auto' } = {}) => {
    return {
        presets: [
            '@babel/preset-typescript',
            [
                '@babel/preset-env',
                {
                    modules,
                },
            ],
            '@babel/preset-react',
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    useESModules: modules === false,
                },
            ],
        ],
    }
}

module.exports = getBabelConfig
