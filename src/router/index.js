import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/userCenter/Login.vue'
import Registration from '../views/userCenter/Registration.vue'

export const routes = [{
        path: '/',
        name: '/',
        redirect: '/statistics/datastatistics',
        meta: {
            title: '',
        },
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: Home,
        meta: {
            title: '数据统计'
        },
        children: [{
            path: '/statistics/datastatistics',
            name: 'Datastatistics',
            component: () =>
                import ('../views/statistics/Datastatistics.vue'),
            meta: {
                title: '数据统计'
            },
        }]
    },
    {
        path: '/category',
        name: 'Category',
        component: Home,
        meta: {
            title: '类目管理'
        },
        children: [{
                path: '/category/testquestions',
                name: 'Testquestions',
                component: () =>
                    import ('../views/category/Testquestions.vue'),
                meta: {
                    title: '试题'
                }
            },
            {
                path: '/category/article',
                name: 'Article',
                component: () =>
                    import ('../views/category/Article.vue'),
                meta: {
                    title: '文章'
                }
            },
        ]
    },
    {
        path: '/topic',
        name: 'Topic',
        component: Home,
        meta: {
            title: '试题'
        },
        children: [{
                path: '/topic/establish',
                name: 'Establish',
                component: () =>
                    import ('../views/topic/Establish.vue'),
                meta: {
                    title: '创建'
                }
            },
            {
                path: '/topic/listpage',
                name: 'Listpage',
                component: () =>
                    import ('../views/topic/Listpage.vue'),
                meta: {
                    title: '列表',
                }
            },
            {
                path: 'viewtestquestions',
                name: 'Viewtestquestions',
                component: () =>
                    import ('../views/topic/Viewtestquestions.vue'),
                meta: {
                    title: '',
                }
            }
        ]
    },
    {
        path: '/articlefile',
        name: 'Articlefile',
        component: Home,
        meta: {
            title: '文章'
        },
        children: [{
                path: '/articlefile/writearticle',
                name: 'Writearticle',
                component: () =>
                    import ('../views/articlefile/Writearticle.vue'),
                meta: {
                    title: '写文章'
                }
            }, {
                path: '/articlefile/mainarticle',
                name: 'Mainarticle',
                component: () =>
                    import ('../views/articlefile/Mainarticle.vue'),
                meta: {
                    title: '文章列表'
                }
            }, {
                path: '/articlefile/articleDetail',
                name: 'ArticleDetail',
                component: () =>
                    import ('../views/articlefile/ArticleDetail.vue'),
                meta: {
                    title: '',
                }
            },
            {
                path: '/articlefile/updateArticle',
                name: 'UpdateArticle',
                component: () =>
                    import ('../views/articlefile/UpdateArticle.vue'),
                meta: {
                    title: '',
                }
            }
        ]
    },
    {
        path: '/role',
        name: 'Role',
        component: Home,
        meta: {
            title: '角色管理'
        },
        children: [{
                path: '/role/rolemanagement',
                name: 'Rolemanagement',
                component: () =>
                    import ('../views/role/Rolemanagement.vue'),
                meta: {
                    title: '创建角色'
                }
            },
            {
                path: '/role/usersList',
                name: 'UsersList',
                component: () =>
                    import ('../views/role/UsersList.vue'),
                meta: {
                    title: '用户列表'
                }
            },
        ]
    },
    {
        path: '/news',
        name: 'News',
        component: Home,
        meta: {
            title: '消息管理'
        },
        children: [{
            path: '/news/increasenews',
            name: 'Increasenews',
            component: () =>
                import ('../views/news/Increasenews.vue'),
            meta: {
                title: '添加消息'
            }
        }, {
            path: '/news/systemnews',
            name: 'Systemnews',
            component: () =>
                import ('../views/news/Systemnews.vue'),
            meta: {
                title: '系统消息管理'
            }
        }]
    },
    {
        path: '/classroom',
        name: 'Classroom',
        component: Home,
        meta: {
            title: '班级管理'
        },
        children: [{
            path: '/classroom/increaseclass',
            name: 'Increaseclass',
            component: () =>
                import ('../views/classroom/Increaseclass.vue'),
            meta: {
                title: '管理班级'
            }
        }]
    },

    {
        path: '/task',
        name: 'Task',
        component: Home,
        meta: {
            title: '作业管理'
        },
        children: [{
                path: '/task/releasetask',
                name: 'Releasetask',
                component: () =>
                    import ('../views/task/Releasetask.vue'),
                meta: {
                    title: '发布作业'
                }
            },
            {
                path: '/task/correcttask',
                name: 'Correcttask',
                component: () =>
                    import ('../views/task/Correcttask.vue'),
                meta: {
                    title: '批改作业'
                }
            },
            {
                path: '/task/modifytask',
                name: 'Modifytask',
                component: () =>
                    import ('../views/task/Modifytask.vue'),
                meta: {
                    title: '修改作业'
                }
            },
            {
                path: '/task/querytask',
                name: 'Querytask',
                component: () =>
                    import ('../views/task/Querytask.vue'),
                meta: {
                    title: '查询作业'
                }
            },

        ]
    },
    {
        path: '/jurisdiction',
        name: 'Jurisdiction',
        component: Home,
        meta: {
            title: '我的权限'
        },
        children: [{
            path: '/jurisdiction/routemanage',
            name: 'Routemanage',
            component: () =>
                import ('../views/jurisdiction/Routemanage.vue'),
            meta: {
                title: '路由管理'
            }
        }]
    },
    {
        path: '/exam',
        name: 'Exam',
        component: Home,
        meta: {
            title: '考试管理'
        },
        children: [{
                path: '/exam/createpaper',
                name: 'Createpaper',
                component: () =>
                    import ('../views/exam/Createpaper.vue'),
                meta: {
                    title: '创建考试'
                }
            }, {
                path: '/exam/examrecord',
                name: 'Examrecord',
                component: () =>
                    import ('../views/exam/Examrecord.vue'),
                meta: {
                    title: '考试记录'
                }
            },
            {
                path: '/exam/paperlist',
                name: 'Paperlist',
                component: () =>
                    import ('../views/exam/Paperlist.vue'),
                meta: {
                    title: '试卷列表'
                }
            }, {
                path: '/exam/paperdetails',
                name: 'Paperdetails',
                component: () =>
                    import ('../views/exam/Paperdetails.vue'),
                meta: {
                    title: '',
                }
            }
        ]
    },
    {
        path: '/activity',
        name: 'Activity',
        component: Home,
        meta: {
            title: '活动管理'
        },
        children: [{
            path: '/activity/createactivity',
            name: 'Createactivity',
            component: () =>
                import ('../views/activity/Createactivity.vue'),
            meta: {
                title: '创建活动'
            }
        }, {
            path: '/activity/activitylist',
            name: 'Activitylist',
            component: () =>
                import ('../views/activity/Activitylist.vue'),
            meta: {
                title: '活动列表'
            }
        }]
    },
    {
        path: '/sign_in',
        name: 'Sign_in',
        component: Home,
        meta: {
            title: '打卡管理'
        },
        children: [{
                path: '/sign_in/historyrecord',
                name: 'Historyrecord',
                component: () =>
                    import ('../views/sign_in/Historyrecord.vue'),
                meta: {
                    title: '历史记录'
                }
            },
            {
                path: '/sign_in/signinsetup',
                name: 'Signinsetup',
                component: () =>
                    import ('../views/sign_in/Signinsetup.vue'),
                meta: {
                    title: '设置打卡'
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '',
        },
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration,
        meta: {
            title: '',
        },
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router