import axios from 'axios';
import { postConfig } from './config'


axios.interceptors.request.use(function(config) {
    config.headers.authorization = sessionStorage.getItem('token');
    return config;
})

axios.interceptors.response.use(function(response) {
    if (response.data.status == 401) {
        location.href = '/login'
        console.log(response.data);
    }
    // console.log(postConfig)
    return response.data;
}, function(error) {
    console.log('get error:', error)
    return {
        code: -1,
        msg: '网络异常'
    }
});

//接口定义的方式；
export default {


    //题的开始
    /**
     * @description  增加题
     * @params {type[String],title[String],options[Array],result[String],categoryId[Number]}  options:[{key:'A',value:'A的答案'}]
     * */
    createTopic: (params) => {
        return axios.post('/topic/create', params, postConfig)
    },

    /**
     * @description  获取题列表
     * @params {id,categoryId,pageNum,pageSize} 可选 id:题id  categoryId:题目类型  pageNum:第几页数据  pageSize:每页条数
     * */
    getTopicList: (params) => {
        return axios.post('/topic/list', params, postConfig)
    },
    /**
     * @description  获取题答案
     * @params {ids} 可选 ids:题id 
     * */
    getTopicAnswer: (params) => {
        return axios.post('/topic/answer', params, postConfig)
    },
    /**
     * @description  编辑题
     * @params {id,type,title,options,result,categoryId}
     * */
    updateTopic: (params) => {
        return axios.post('/topic/update', params, postConfig)
    },

    /**
     * @description  删除题
     * @params {id}
     * */
    deleteTopic: (params) => {
        return axios.post('/topic/delete', params, postConfig)
    },

    //题的结束


    //类目的开始
    /**
     * @description  获取类目列表
     * @params {type[String]} type: 类目类型 1：试题 2：文章；
     * */
    getCategoryList: (params) => {
        return axios.post('/category/list', params, postConfig)
    },

    /**
     * @description  增加类目
     * @params {type[String],key} type: 类目类型 1：试题 2：文章； key:类目文本
     * */
    createCategory: (params) => {
        return axios.post('/category/create', params, postConfig)
    },

    /**
     * @description  删除类目
     * @params {type[String],id} type: 类目类型 1：试题 2：文章； key:类目标识
     * */
    deleteCategory: (params) => {
        return axios.post('/category/delete', params, postConfig)
    },

    /**
     * @description  更新类目接口
     * @params {type[String],id[String],key[String],iconUrl[String]}
     * */
    updateCategory: (params) => {
        return axios.post('/category/update', params, postConfig)
    },
    //类目的结束



    //文章的开始
    /**
     * @description  获取文章详情
     * @params {id}  id:文章ID
     * */
    getArticleDetail: (params) => {
        return axios.post('/article/detail', params, postConfig)
    },

    /**
     * @description  增加文章
     * @params {title[String],article:[String],categoryId:[String]}
     * */
    createArticle: (params) => {
        return axios.post('/article/create', params, postConfig)
    },


    /**
     * @description  获取文章列表
     * @params {categoryId:[String],pageNum:[String],pageSize:[String]}  categoryId:非必填 文章类型  pageNum:非必填 第几页  pageSize:非必填 获取几条数据 默认为10
     * */
    getArticleList: (params) => {
        return axios.post('/article/list', params, postConfig)
    },


    /**
     * @description 删除
     * @params {id}  id:必传
     * */
    deleteArticle: (params) => {
        return axios.post('/article/delete', params, postConfig)
    },

    /**
     * @description  修改文章
     * @params {title[String],article:[String],categoryId:[String]}
     * */
    updateArticle: (params) => {
        return axios.post('/article/update', params, postConfig)
    },

    /**
     * @description  获取文章/试题数量
     * */
    getArticleCount: (params) => {
        return axios.post('/category/count', params, postConfig)
    },
    //文章的结束



    //用户的接口开始
    /**
     * @description  用户登录接口
     * @params {username:[String],password:[String]} 
     * */
    userLogin(params) {
        return axios.post('/user/login', params, postConfig)
    },

    /**
     * @description  用户注册接口
     * @params {username:[String],password:[String]} 
     * */
    userRegister(params) {
        return axios.post('/user/register', params, postConfig)
    },

    /**
     * @description  用户信息接口
     * @params 没有参数 
     * */
    getUserInfo(params) {
        return axios.post('/user/info', params, postConfig)
    },

    /**
     * @description  修改用户信息接口
     * @params {avatorId,avatorName,phoneNumber,mail,password}
     * */
    updateUser(params) {
        return axios.post('/user/update', params, postConfig)
    },

    /**
     * @description  获取用户列表信息接口
     * @params {uuid,avatorName[String],classId[Number],,userId[Number],username[String],identity[Number],pageNum,pageSize}    
     *         avatorName:非必填,网名;     classId:非必填,班级ID;     userId:非必填,用户ID;     username:非必填,用户名;      identity:非必填,身份ID;   pageNum:非必填,第几页,默认1;     pageSize:非必填,获取几条数据,默认为10;
     * */
    usersList(params) {
        return axios.post('/user/list', params, postConfig)
    },
    //用户接口结束


    //角色信息接口开始
    /**
     * @description  获取角色信息接口
     * @params 无
     * */
    getRole(params) {
        return axios.post('/role/list', params, postConfig)
    },

    /**
     * @description  增加角色信息接口
     * @params name[Stringg]  name:角色名
     * */
    createRole(params) {
        return axios.post('/role/create', params, postConfig)
    },

    /**
     * @description  更改角色信息接口
     * @params id[Number] name[Stringg]     id : 角色ID;  name:角色名
     * */
    updateRole(params) {
        return axios.post('/role/update', params, postConfig)
    },

    /**
     * @description  删除角色信息接口
     * @params  id[Number]      id : 角色ID;
     * */
    deleteRole(params) {
        return axios.post('/role/delete', params, postConfig)
    },
    //角色信息接口结束


    //消息接口开始
    /**
     * @description  新增消息
     * */
    sendMessage(params) {
        return axios.post('/message/send', params, postConfig)
    },

    /**
     * @description  获取信息列表
     * */
    getMessageList(params) {
        return axios.post('/message/list', params, postConfig)
    },

    /**
     * @description  删除信息
     * */
    deleteMessage(params) {
        return axios.post('/message/delete', params, postConfig)
    },

    /**
     * @description  消息详情
     * */
    getMessageDetail(params) {
        return axios.post('/message/detail', params, postConfig)
    },
    //信息结束

    //班级开始
    /**
     * @description  创建班级
     * @params {name,admin} 
     * */
    createClass(params) {
        return axios.post('/class/create', params, postConfig)
    },

    /**
     * @description  班级列表
     * @params {pageNum,pageSize} 
     * */
    getClassList(params) {
        return axios.post('/class/list', params, postConfig)
    },

    /**
     * @description  删除班级
     * @params {id} 
     * */
    deleteClass(params) {
        return axios.post('/class/delete', params, postConfig)
    },


    /**
     * @description  修改班级
     * @params {id,name,admin} 
     * */
    updateClass(params) {
        return axios.post('/class/update', params, postConfig)
    },
    //班级结束


    //作业
    /**
     * @description  创建作业
     * @params {content,endTime} 
     * */
    createTask(params) {
        return axios.post('/task/create', params, postConfig)
    },

    //作业结束

    //活动
    /**
     * @description  创建活动
     * */
    createActive(params) {
        return axios.post('/active/create', params, postConfig)
    },
    /**
     * @description  获取活动列表
     * */
    getActiveList(params) {
        return axios.post('/active/list', params, postConfig)
    },
    /**
     * @description  删除活动
     * */
    deleteActive(params) {
        return axios.post('/active/delete', params, postConfig)
    },
    /**
     * @description  修改活动
     * */
    updateActive(params) {
        return axios.post('/active/update', params, postConfig)
    },


    //活动结束


    //考试
    /**
     * @description  创建试题
     * @params {classId,categoryId,startTime,endTime,count}
     * */
    createExam(params) {
        return axios.post('/exam/create', params, postConfig)
    },



    //考试结束
}