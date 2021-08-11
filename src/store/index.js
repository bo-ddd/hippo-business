import { createStore } from 'vuex'
import Api from '@/api/api'
export default createStore({
    state: {},
    mutations: {},
    actions: {
        /**
         * @description 用户登录
         * @param username  用户名
         * @param password 密码
         */
        // signin(ctx, payload) {
        //     return Api.signin(payload)
        // },
    },
    modules: {}
})
console.log(Api);