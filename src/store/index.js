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
            return Api.deleteArticle(payload);
        },
        updateArticle(ctx, payload) {
            return Api.updateArticle(payload);
        },

        //用户
        userLogin(ctx, payload) {
            return Api.userLogin(payload);
        },
        userRegister(ctx, payload) {
            return Api.userRegister(payload);
        },
        getUserInfo(ctx, payload) {
            return Api.getUserInfo(payload);
        },
        updateUser(ctx, payload) {
            return Api.updateUser(payload);
        },

    },
    modules: {}
})
console.log(Api);