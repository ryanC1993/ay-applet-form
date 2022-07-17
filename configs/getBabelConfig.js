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
    }
}

module.exports = getBabelConfig
