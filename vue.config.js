module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.39:7001', //填写服务端的接口地址；
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
