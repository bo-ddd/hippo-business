module.exports = {
    devServer: {
        //原理：将axios中匹配到的包含 http://192.168.1.18:7001的接口转换成本地同源接口，
        //将匹配到的 /api 替换 成 "";  
        //比如： http://192.168.1.18:7001/api/user/info
        //替换结果为 localhost:8080/user/info
        proxy: {
            '/api': {
                target: 'http://192.168.1.39:7001',  //填写服务端的接口地址；
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
