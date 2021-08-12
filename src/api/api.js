import axios from 'axios';
import { postConfig } from './config'


axios.interceptors.request.use(function(config) {
    config.headers.authorization = sessionStorage.getItem('token');
    return config;
})

axios.interceptors.response.use(function(response) {
    if (response.data.status == 401) {
        location.href = '/'
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
    //登录
    // signin: (params) => {
    //     return axios.post('/user/login', params, postConfig)
    // },

    createTopic: (params) => {
        return axios.post('/topic/create', params, postConfig)
    },
    getCategoryList: (params) => {
        return axios.post('/category/list', params, postConfig)
    },
    createCategory: (params) => {
        return axios.post('/category/create', params, postConfig)
    },
    deleteCategory: (params) => {
        return axios.post('/category/delete', params, postConfig)
    },
    getTopicList: (params) => {
        return axios.post('/topic/list', params, postConfig)
    },
    getArticleDetail: (params) => {
        return axios.post('/article/detail', params, postConfig)
    },
    updateCategory: (params) => {
        return axios.post('/category/update', params, postConfig)
    },

}