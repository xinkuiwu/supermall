module.exports ={
    configureWebpack: {
        resolve: {
            alias: {
                // 默认已经有@对应src
                // '@': 'src',
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'view': '@/view',

            }
        }
    }
}