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
        getTopicAnswer(ctx, payload) {
            return Api.getTopicAnswer(payload)
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
        getArticleCount(ctx, payload) {
            return Api.getArticleCount(payload);
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
        usersList(ctx, payload) {
            return Api.usersList(payload);
        },
        createRole(ctx, payload) {
            return Api.createRole(payload);
        },

        //消息
        sendMessage(ctx, payload) {
            return Api.sendMessage(payload);
        },
        getMessageList(ctx, payload) {
            return Api.getMessageList(payload);
        },
        deleteMessage(ctx, payload) {
            return Api.deleteMessage(payload);
        },
        getMessageDetail(ctx, payload) {
            return Api.getMessageDetail(payload);
        },

        //班级
        createClass(ctx, payload) {
            return Api.createClass(payload);
        },

        //作业
        createTask(ctx, payload) {
            return Api.createTask(payload);
        },

    },
    modules: {}
})
console.log(Api);