import { createStore } from 'vuex'
import Api from '@/api/api'
import { routes } from '../router';
console.log(routes);

let getRoutes = function() {
    let defined = ['/', '/registration', '/login'];
    let arr = routes;
    let res = [];
    arr.forEach(item => {
        if (!defined.includes(item.path)) {
            res.push(item)
        }
    })
    return res;
}

export default createStore({
    state: {
        routes: getRoutes()
    },
    getters: {
        routes: (ctx) => {
            return ctx.routes;
        }

    },
    mutations: {},
    actions: {
        //图形验证码
        userCaptcha() {
            return Api.userCaptcha()
        },
        //校验图形验证码
        userCheckCaptcha(ctx, payload) {
            return Api.userCheckCaptcha(payload)
        },
      
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

        //角色
        getRole(ctx, payload) {
            return Api.getRole(payload);
        },
        createRole(ctx, payload) {
            return Api.createRole(payload);
        },
        updateRole(ctx, payload) {
            return Api.updateRole(payload);
        },
        deleteRole(ctx, payload) {
            return Api.deleteRole(payload);
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
        getClassList(ctx, payload) {
            return Api.getClassList(payload);
        },
        deleteClass(ctx, payload) {
            return Api.deleteClass(payload);
        },
        updateClass(ctx, payload) {
            return Api.updateClass(payload);
        },
        //作业
        createTask(ctx, payload) {
            return Api.createTask(payload);
        },


        //活动
        createActive(ctx, payload) {
            return Api.createActive(payload);
        },
        getActiveList(ctx, payload) {
            return Api.getActiveList(payload);
        },
        deleteActive(ctx, payload) {
            return Api.deleteActive(payload);
        },
        updateActive(ctx, payload) {
            return Api.updateActive(payload);
        },


        //考试
        createExam(ctx, payload) {
            return Api.createExam(payload);
        },
        getExamList(ctx, payload) {
            return Api.getExamList(payload);
        },
        deleteExam(ctx, payload) {
            return Api.deleteExam(payload);
        },
        updateExam(ctx, payload) {
            return Api.updateExam(payload);
        },

        //验证码
        getCaptcha() {
            return Api.getCaptcha();
        },
        checkCaptcha(ctx, payload) {
            return Api.checkCaptcha(payload);
        },

        //签到
        getSignList(ctx, payload) {
            return Api.getSignList(payload);
        },
    },
    modules: {}
})