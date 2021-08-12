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
        create(ctx, payload) {
            return Api.create(payload)
        },
        catlist(ctx, payload) {
            return Api.catlist(payload)
        },
        catcreate(ctx, payload) {
            return Api.catcreate(payload)
        },
        catdelete(ctx, payload) {
            return Api.catdelete(payload)
        },
        topiclist(ctx, payload) {
            return Api.topiclist(payload)
        },
        detail(ctx, payload) {
            return Api.detail(payload)
        },
        catupdate(ctx,payload){
             return Api.catupdate(payload)
        }
    },
    modules: {}
})
console.log(Api);