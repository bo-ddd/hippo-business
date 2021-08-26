<template>
<div class="home">
    <el-container>
        <el-header class="title">
            <el-breadcrumb>
                <el-breadcrumb-item><img class="logo" src="../assets/images/logo.png" alt=""></el-breadcrumb-item>
            </el-breadcrumb>
            <div class="demo-basic--circle" @click="resultUser ? '' : jumpPage('Login') ">
                <div class="block">
                    <p class="img-out">
                        <img :src="resultUser ? loginImage : circleUrl" class="icon_role" alt="">
                    </p>
                    <p :class="['fs-16','pd-10',resultUser ? 'cl-black' : 'cl-blue']" v-text="resultUser ? resultUser.avatorName : '请登录'"></p>
                </div>
            </div>
        </el-header>

        <el-container>
            <el-aside width="200px">
                <el-menu :default-active='titleIndex' unique-opened='true' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-menu-item @click="jumpPage('Datastatistics')" index="1-1">数据统计</el-menu-item>
                    <el-submenu index="2">
                        <template #title>
                            <i class="el-icon-folder-opened"></i>
                            <span>类目管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Testquestions')" index="2-1">试题</el-menu-item>
                            <el-menu-item @click="jumpPage('Article')" index="2-2">文章</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template #title>
                            <i class="el-icon-edit"></i>
                            <span>试题</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Establish')" index="3-1">创建</el-menu-item>
                            <el-menu-item @click="jumpPage('Listpage')" index="3-2">列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template #title>
                            <i class="el-icon-tickets"></i>
                            <span>文章</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Writearticle')" index="4-1">写文章</el-menu-item>
                            <el-menu-item @click="jumpPage('Mainarticle')" index="4-2">文章列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template #title>
                            <i class="el-icon-user"></i>
                            <span>角色管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Rolemanagement')" index="5-1">创建角色</el-menu-item>
                            <el-menu-item @click="jumpPage('UsersList')" index="5-2">用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template #title>
                            <i class="el-icon-chat-dot-square"></i>
                            <span>消息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Increasenews')" index="6-1">添加消息</el-menu-item>
                            <el-menu-item @click="jumpPage('Systemnews')" index="6-2">系统消息管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="7">
                        <template #title>
                            <i class="el-icon-postcard"></i>
                            <span>我的权限</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Routemanage')" index="7-1">路由管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="8">
                        <template #title>
                            <i class="el-icon-reading"></i>
                            <span>作业管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Releasetask')" index="8-1">发布作业</el-menu-item>
                            <el-menu-item @click="jumpPage('Correcttask')" index="8-2">批改作业</el-menu-item>
                            <el-menu-item @click="jumpPage('Modifytask')" index="8-3">修改作业</el-menu-item>
                            <el-menu-item @click="jumpPage('Querytask')" index="8-4">查询作业信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="9">
                        <template #title>
                            <i class="el-icon-school"></i>
                            <span>班级管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Increaseclass')" index="9-1">添加班级</el-menu-item>
                            <el-menu-item @click="jumpPage('Manageclass')" index="9-2">管理班级</el-menu-item>
                            <el-menu-item @click="jumpPage('Classmanage')" index="9-3">班级列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="10">
                        <template #title>
                            <i class="el-icon-edit-outline"></i>
                            <span>考试管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Createpaper')" index="10-1">创建考卷</el-menu-item>
                            <el-menu-item @click="jumpPage('Examrecord')" index="10-2">考试记录</el-menu-item>
                            <el-menu-item @click="jumpPage('Paperlist')" index="10-3">试卷列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="11">
                        <template #title>
                            <i class="el-icon-coordinate"></i>
                            <span>活动管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Createactivity')" index="11-1">创建活动</el-menu-item>
                            <el-menu-item @click="jumpPage('Activitylist')" index="11-2">活动列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="12">
                        <template #title>
                            <i class="el-icon-coordinate"></i>
                            <span>打卡管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="jumpPage('Historyrecord')" index="12-1">历史记录</el-menu-item>
                            <el-menu-item @click="jumpPage('Signinsetup')" index="12-2">打卡设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            resultUser: '',
            index: '1-1',
            loginImage: '',
        }
    },
    methods: {
        ...mapActions(['getUserInfo']),
        jumpPage: function (title) {
            this.$router.push({
                name: title,
            })
        },
    },
    async created() {
        let data = await this.getUserInfo();
        if (data.status) {

            // 返回登录用户的信息
            this.resultUser = data.data;
            //登录后的头像
            this.loginImage = require(`../assets/images/avator/${(this.resultUser).avatorId}.png`)
        }
    },
    computed: {
        titleIndex() {
            if (this.$route.name == 'Testquestions') {
                return '2-1'
            } else if (this.$route.name == 'Article') {
                return '2-2'
            } else if (this.$route.name == 'Establish') {
                return '3-1'
            } else if (this.$route.name == 'Listpage') {
                return '3-2'
            } else if (this.$route.name == 'Writearticle') {
                return '4-1'
            } else if (this.$route.name == 'Mainarticle') {
                return '4-2'
            } else if (this.$route.name == 'Rolemanagement') {
                return '5-1'
            } else if (this.$route.name == 'UsersList') {
                return '5-2'
            } else if (this.$route.name == 'Increasenews') {
                return '6-1'
            } else if (this.$route.name == 'Systemnews') {
                return '6-2'
            } else if (this.$route.name == 'Routemanage') {
                return '7-1'
            } else if (this.$route.name == 'Datastatistics') {
                return '1-1'
            } else if (this.$route.name == 'Releasetask') {
                return '8-1'
            } else if (this.$route.name == 'Correcttask') {
                return '8-2'
            } else if (this.$route.name == 'Modifytask') {
                return '8-3'
            } else if (this.$route.name == 'Querytask') {
                return '8-4'
            } else if (this.$route.name == 'Increaseclass') {
                return '9-1'
            } else if (this.$route.name == 'Manageclass') {
                return '9-2'
            } else if (this.$route.name == 'Classmanage') {
                return '9-3'
            } else if (this.$route.name == 'Createpaper') {
                return '10-1'
            } else if (this.$route.name == 'Examrecord') {
                return '10-2'
            } else if (this.$route.name == 'Paperlist') {
                return '10-3'
            } else if (this.$route.name == 'Createactivity') {
                return '11-1'
            } else if (this.$route.name == 'Activitylist') {
                return '11-2'
            }  else if (this.$route.name == 'Historyrecord') {
                return '12-1'
            }  else if (this.$route.name == 'Signinsetup') {
                return '12-2'
            } else {
                return '1-1'
            }
        }
    }
}
</script>

<style scoped>
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    height: 80px;
}

.title span {
    color: #1890ff;
    font-size: 22px;
}

.aside {
    height: calc(100vh - 60px);
}

.block {
    display: flex;
    align-items: center;
}

.block span {
    font-size: 20px;
}

.pd-10 {
    margin: 10px;
}

.cl-blue {
    color: #1890ff !important;
}

.cl-black {
    color: #000 !important;
}

.fs-16 {
    font-size: 16px !important;
}

.img-out {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}

.icon_role {
    width: 100%;
}

.logo {
    height: 65px;
}

.main {
    height: 88vh;
    overflow: auto
}
</style>
