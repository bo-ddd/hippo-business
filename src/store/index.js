import { createStore } from 'vuex'
import Api from '@/api/api'
export default createStore({
    state: {},
    mutations: {},
    actions: {
        //题
        createTopic(ctx, payload) {
            return Api.createTopic(payload)
        },
        getTopicList(ctx, payload) {
            return Api.getTopicList(payload)
        },
        updateTopic(ctx, payload) {
            return Api.updateTopic(payload)
        },
        deleteTopic(ctx, payload) {
            return Api.deleteTopic(payload)
        },


        //类目
        getCategoryList(ctx, payload) {
            return Api.getCategoryList(payload)
        },
        createCategory(ctx, payload) {
            return Api.createCategory(payload)
        },
        deleteCategory(ctx, payload) {
            return Api.deleteCategory(payload)
        },
        updateCategory(ctx, payload) {
            return Api.updateCategory(payload);
        },

        //文章
        getArticleDetail(ctx, payload) {
            return Api.getArticleDetail(payload);
        },
        createArticle(ctx, payload) {
            return Api.createArticle(payload);
        },
        getArticleList(ctx, payload) {
            return Api.getArticleList(payload);
        },
        deleteArticle(ctx, payload) {
            return Api.getArticleList(payload);
        },

        //用户
        userLogin(ctx, payload) {
            return Api.getArticleList(payload);
        },
        userRegister(ctx, payload) {
            return Api.getArticleList(payload);
        },
        getUserInfo(ctx, payload) {
            return Api.getArticleList(payload);
        },
        updateUser(ctx, payload) {
            return Api.getArticleList(payload);
        },

    },
    modules: {}
})
console.log(Api);