<template>
<div class="wrap">
    <div class="user" v-if="gradeShow">
        <!-- <el-form :inline="true" :model="searchParams" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchParams.chanelName" style="width: 160px;" placeholder="请输入渠道名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.remark" style="width: 180px;" placeholder="请输入备注内容关键词" clearable></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-select style="width: 160px" v-model="searchParams.chanelType" clearable @change="channelChange" placeholder="请选择渠道类型">
                    <el-option :label="item.name" :value="item.value" v-for="item in chanelList" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="search-btn el-button--infoSearch" icon="el-icon-search" @click="submitSearch()"></el-button>
                <el-button class="search-btn el-button--infoSearch" @click="clearListSearch">清空</el-button>
            </el-form-item>
            <el-form-item class="rBtn">
                <el-button type="primary" @click="createItem('new')">新建</el-button>
            </el-form-item>
        </el-form> -->
        <div class="indexInput">
            <el-select class="select" v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
                <!-- <el-option >按用户ID查询</el-option>
                <el-option >按用户名查询</el-option>
                <el-option >按姓名查询</el-option>
                <el-option >按班级编号查询</el-option> -->
            </el-select>
            <el-input class="input" placeholder="请输入查询内容" prefix-icon="el-icon-search" v-model="input">
            </el-input>
            <el-button type="primary">搜索</el-button>
        </div>
        <!-- <el-select v-model="value" clearable placeholder="请选择">
            <el-option v-for="item in usersListArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select> -->
        <el-table :data="usersListArr" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" width="70px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="avatorName" label="姓名" width="120px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="50px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="电话" width="120px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="mail" label="邮箱" width="180px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="desc" label="备注" width="180" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="classId" label="班级编号" width="100px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="desc" label="更改班级" width="180" align="center" header-align="center" #default="scope">
                <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateClass(scope.row)">分班</el-button> -->
                <a class="updateClass" @click="updateClass(scope.row)">更改</a>
            </el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:current-page.sync="nowPage" :page-size="pageSize" layout="sizes, prev, pager, next" :page-count="countPage" :page-sizes="[2,3,4,5,10]">
        </el-pagination>
    </div>
    <div class="grade" v-else>
        <el-space wrap>
            <el-card class="box-card" style="width: 80vw">
                <template #header>
                    <div class="card-header">
                        <span>现有班级类目:</span>
                    </div>
                </template>
                <el-radio-group v-model="radio" v-for="(item) in classListArr" :key="item.id">
                    <el-radio class="classRadio" :label="item.id" @click="check(item.id)">{{item.name}}</el-radio>
                </el-radio-group>
            </el-card>
        </el-space>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    data() {
        return {
            usersListArr: [],
            nowPage: 1,
            countPage: 1,
            pageSize: 10,
            gradeShow: true,
            classListArr: [],
            radio: 0,
            userId: 0,
            input: '',
            options: [{
                value: '选项1',
                label: '按用户ID查询'
            }, {
                value: '选项2',
                label: '按用户名查询'
            }, {
                value: '选项3',
                label: '按姓名查询'
            }, {
                value: '选项4',
                label: '按班级编号查询'
            }],
            value:''
        };
    },
    methods: {
        ...mapActions(["usersList", "getClassList", "updateClass", "updateUser"]),
        handleCurrentChange(val) {
            this.nowPage = val;
            this.getList();
            // console.log(`当前页: ${val}`);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        updateClass(arr) {
            // console.log(arr);
            this.userId = arr.userId;
            this.gradeShow = false
        },
        async check(id) {
            let res = await this.updateUser({
                userId: this.userId,
                classId: id
            })
            console.log(res);
            this.getList();
            this.gradeShow = true
        },
        async getList() {
            let usersList = await this.usersList({
                // uuid:'vip',
                // avatorName: '北风',
                // classId: '25',
                // userId:123,
                username: '123121',
                pageNum: this.nowPage,
                pageSize: this.pageSize
            });
            console.log(usersList.data);
            this.usersListArr = usersList.data.rows;
            this.countPage = usersList.data.countPage;
            this.usersListArr.forEach(item => {
                if (item.sex == 1) {
                    item.sex = "男"
                } else {
                    item.sex = "女"
                }
            })
        },
        async getClass() {
            let classList = await this.getClassList({

            });
            console.log(classList.data);
            this.classListArr = classList.data.rows
        },
    },
    created() {
        this.getList();
        this.getClass();
    },
};
</script>

<style lang="less" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .user {
        & .select{
            width: 230px;
        }
        & .indexInput {
            width: 600px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            // & .input{
            //     width: 200px;
            // }
        }

        & .updateClass {
            color: rgb(62, 62, 143);
            text-decoration: underline;
            cursor: pointer;
        }
    }

    & .grade {
        & .classRadio {
            margin-right: 30px;
        }
    }
}
</style>
