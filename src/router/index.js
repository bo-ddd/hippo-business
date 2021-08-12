import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
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
    }, {
        path: '/viewtestquestions',
        name: 'Viewtestquestions',
        component: () =>
            import ('../views/topiccatalogue/Viewtestquestions.vue'),
    }]
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router