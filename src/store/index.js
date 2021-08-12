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
        catlist(ctx, payload) {
                return Api.catlist(payload)
            },
        catcreate(ctx, payload) {
            return Api.catcreate(payload)
        },
        detail(ctx, payload) {
            return Api.detail(payload)
        },
    },
    modules: {}
})
console.log(Api);