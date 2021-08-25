import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/userCenter/Login.vue'
import Registration from '../views/userCenter/Registration.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
            path: '/',
            name: 'Testquestions',
            component: () =>
                import ('../views/category/Testquestions.vue'),
        }, {
            path: '/article',
            name: 'Article',
            component: () =>
                import ('../views/category/Article.vue'),
        }, {
            path: '/establish',
            name: 'Establish',
            component: () =>
                import ('../views/topiccatalogue/Establish.vue'),
        }, {
            path: '/listpage',
            name: 'Listpage',
            component: () =>
                import ('../views/topiccatalogue/Listpage.vue'),
        }, {
            path: '/rolemanagement',
            name: 'Rolemanagement',
            component: () =>
                import ('../views/articlefile/Rolemanagement.vue'),
        }, {
            path: '/writearticle',
            name: 'Writearticle',
            component: () =>
                import ('../views/articlefile/Writearticle.vue'),
        },
        {
            path: '/mainarticle',
            name: 'Mainarticle',
            component: () =>
                import ('../views/articlefile/Mainarticle.vue'),
        }, {
            path: '/viewtestquestions',
            name: 'Viewtestquestions',
            component: () =>
                import ('../views/topiccatalogue/Viewtestquestions.vue'),
        },
        {
            path: '/articleDetail',
            name: 'ArticleDetail',
            component: () =>
                import ('../views/articlefile/ArticleDetail.vue'),
        },
        {
            path: '/updateArticle',
            name: 'UpdateArticle',
            component: () =>
                import ('../views/articlefile/UpdateArticle.vue'),
        },
        {
            path: '/systemnews',
            name: 'Systemnews',
            component: () =>
                import ('../views/news/Systemnews.vue'),
        },
        {
            path: '/increasenews',
            name: 'Increasenews',
            component: () =>
                import ('../views/news/Increasenews.vue'),
        },
        {
            path: '/classmanage',
            name: 'Classmanage',
            component: () =>
                import ('../views/jurisdiction/Classmanage.vue'),
        }, {
            path: '/usersList',
            name: 'UsersList',
            component: () =>
                import ('../views/articlefile/UsersList.vue'),
        }, {
            path: '/datastatistics',
            name: 'Datastatistics',
            component: () =>
                import ('../views/statistics/Datastatistics.vue'),
        },
    ],
}, {
    path: '/login',
    name: 'Login',
    component: Login,
}, {
    path: '/registration',
    name: 'Registration',
    component: Registration,
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router