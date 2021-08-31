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
                <el-menu :default-active='titleIndex' :unique-opened='opened' class="el-menu-vertical-demo">
                    <el-submenu :index="item.name" v-for="(item,index) in routes" :key="index">
                        <template #title>
                            <i :class="item.meta.icon"></i>
                            <span>{{item.meta.title}}</span>
                        </template>
                        <div v-if="item.children">
                            <el-menu-item-group v-show="children.meta.title" v-for="(children,childIdx) in item.children" :key="childIdx">
                                <el-menu-item @click="jumpPage(children.path)" :index="children.name">{{children.meta.title}}</el-menu-item>
                            </el-menu-item-group>
                        </div>
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
    mapActions,
    mapGetters
} from 'vuex';

export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            resultUser: '',
            loginImage: '',
            opened: true,
        }
    },
    methods: {
        ...mapActions(['getUserInfo']),
        jumpPage: function (title) {
            this.$router.push({
                path: title,
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
        ...mapGetters(['routes']),
        titleIndex() {
            return this.$route.name;
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
