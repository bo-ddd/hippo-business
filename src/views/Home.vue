<template>
<div class="home">
    <el-container>

        <el-header class="title">
            <el-breadcrumb>
                <el-breadcrumb-item><span>学客后台管理系统</span></el-breadcrumb-item>
            </el-breadcrumb>
            <div class="demo-basic--circle" @click="getQuestions('Login')">
                <div class="block">
                    <el-avatar :size="30" :src="circleUrl"></el-avatar>
                    <span class="fs-24">请登录</span>
                </div>
            </div>
        </el-header>

        <el-container>
            <el-aside width="200px">
                <el-menu :default-active='titleIndex' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-submenu index="1">
                        <template #title>
                            <i class="el-icon-location"></i>
                            <span>类目管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="getQuestions('Testquestions')" index="1-1">试题</el-menu-item>
                            <el-menu-item @click="getQuestions('Article')" index="1-2">文章</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template #title>
                            <i class="el-icon-edit"></i>
                            <span>试题</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="getQuestions('Establish')" index="2-1">创建</el-menu-item>
                            <el-menu-item @click="getQuestions('Listpage')" index="2-2">列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template #title>
                            <i class="el-icon-s-order"></i>
                            <span>文章</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="getQuestions('Writearticle')" index="3-1">写文章</el-menu-item>
                            <el-menu-item @click="getQuestions('Mainarticle')" index="3-2">文章列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template #title>
                            <i class="el-icon-user-solid"></i>
                            <span>角色管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="getQuestions('Rolemanagement')" index="4-1">创建角色</el-menu-item>
                            <el-menu-item @click="getQuestions('UsersList')" index="4-2">用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template #title>
                            <i class="el-icon-s-comment"></i>
                            <span>消息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="getQuestions('Increasenews')" index="5-1">添加消息</el-menu-item>
                            <el-menu-item @click="getQuestions('Systemnews')" index="5-2">系统消息管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template #title>
                            <i class="el-icon-postcard"></i>
                            <span>我的权限</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="getQuestions('Classmanage')" index="6-1">班级管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            index: '1-1'
        }
    },
    methods: {
        getQuestions: function (title) {
            this.$router.push({
                name: title,
            })
        }
    },
    computed: {
        titleIndex() {
            if (this.$route.name == 'Testquestions') {
                return '1-1'
            } else if (this.$route.name == 'Article') {
                return '1-2'
            } else if (this.$route.name == 'Establish') {
                return '2-1'
            } else if (this.$route.name == 'Listpage') {
                return '2-2'
            } else if (this.$route.name == 'Writearticle') {
                return '3-1'
            } else if (this.$route.name == 'Mainarticle') {
                return '3-2'
            } else if (this.$route.name == 'Rolemanagement') {
                return '4-1'
            } else if (this.$route.name == 'UsersList') {
                return '4-2'
            } else if (this.$route.name == 'Increasenews') {
                return '5-1'
            } else if (this.$route.name == 'Systemnews') {
                return '5-2'
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
}

.title span {
    font-size: 30px;
    color: #1890ff;
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
</style>
