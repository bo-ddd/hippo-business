<template>
<div class="home">
    <el-container>

        <el-header class="title">
            <el-breadcrumb>
                <el-breadcrumb-item><span>学客后台管理系统</span></el-breadcrumb-item>
            </el-breadcrumb>
            <div class="demo-basic--circle" @click="resultUser ? '' : getQuestions('Login') ">
                <div class="block">
                    <el-avatar :size="30" :src="circleUrl"></el-avatar>
                    <p :class="['fs-16','pd-10',resultUser ? 'cl-black' : 'cl-blue']" v-text="resultUser ? resultUser.avatorName : '请登录'"></p>
                </div>
            </div>
        </el-header>

        <el-container>

            <el-aside width="200px">

                <el-menu default-active="1" class="el-menu-vertical-demo aside" @open="handleOpen" @close="handleClose">
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
                            <el-menu-item @click="getQuestions('Mainarticle')" index="3-2">文章列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template #title>
                            <i class="el-icon-s-order"></i>
                            <span>角色管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="getQuestions('Rolemanagement')" index="4-1">创建角色</el-menu-item>
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
import {mapActions} from 'vuex';
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            resultUser:'',
        }
    },
    methods: {
        ...mapActions(['getUserInfo']),
        getQuestions: function (title) {
            this.$router.push({
                name: title,
            })
        },
    },
    async created(){
        let data = await this.getUserInfo();
        if(data.status){

            // 返回登录用户的信息
            this.resultUser=data.data;
        }
    }
}
</script>

<style scoped>
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom:1px solid #e5e5e5;
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
.pd-10{
    margin: 10px;
}

.cl-blue{
    color: #1890ff !important;
}

.cl-black{
    color: #000 !important;
}

.fs-16{
    font-size: 16px !important;
}
</style>
