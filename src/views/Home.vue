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
                    <span>请登录</span>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="1" class="el-menu-vertical-demo aside" @open="handleOpen" @close="handleClose">
                    <el-submenu index="1">
                        <template #title>
                            <i class="el-icon-location"></i>
                            <span>类目</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="getQuestions('Testquestions')" index="1-1">试题</el-menu-item>
                            <el-menu-item @click="getQuestions('Article')" index="1-2">文章</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template #title>
                            <i class="el-icon-user"></i>
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
                            <el-menu-item @click="getQuestions('Rolemanagement')" index="3-2">角色管理</el-menu-item>
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
        }
    },
    methods: {
        getQuestions: function (title) {
            this.$router.push({
                name: title,
            })
        }
    }
}
</script>

<style scoped>
.title {
    border: 1px solid #b1d1f7;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title span {
    font-size: 30px;
    color: #b1d1f7;
}

.aside {
    height: calc(100vh - 60px);
}
.block{
    display: flex;
    align-items: center;
}
.block span{
    font-size: 20px;
}
</style>
