<template>
<div class="wrap">
    <div class="user" v-if="gradeShow">
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
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateClass(scope.row)">编辑</el-button>
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
            userId: 0
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
                userId:this.userId,
                classId:id
            })
            console.log(res);
            this.getList();
            this.gradeShow = true
        },
        async getList() {
            let usersList = await this.usersList({
                // uuid:'vip',
                avatorName:'北风',
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

    & .grade {
        & .classRadio {
            margin-right: 30px;
        }
    }
}
</style>
