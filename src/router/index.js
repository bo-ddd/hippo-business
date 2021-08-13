import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/loginregisration/Login.vue'
import Registration from '../views/loginregisration/Registration.vue'

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
        },
        {
            path: '/article',
            name: 'Article',
            component: () =>
                import ('../views/articlefile/Article.vue'),
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