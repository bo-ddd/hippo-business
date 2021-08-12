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
        createTopic(ctx, payload) {
            return Api.createTopic(payload)
        },
        getCategoryList(ctx, payload) {
            return Api.getCategoryList(payload)
        },
        createCategory(ctx, payload) {
            return Api.createCategory(payload)
        },
        deleteCategory(ctx, payload) {
            return Api.deleteCategory(payload)
        },
        getTopicList(ctx, payload) {
            return Api.getTopicList(payload)
        },
        getArticleDetail(ctx, payload) {
            return Api.getArticleDetail(payload)
        },
        updateCategory(ctx, payload) {
            return Api.updateCategory(payload)
        }
    },
    modules: {}
})
console.log(Api);