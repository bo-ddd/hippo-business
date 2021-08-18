<template>
<div class="wrap">
    <el-table :data="usersListArr" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50px" header-align="center"> </el-table-column>
        <el-table-column prop="userId" label="用户ID" header-align="center"> </el-table-column>
        <el-table-column prop="username" label="用户名" header-align="center"> </el-table-column>
        <el-table-column prop="sex" label="性别" header-align="center"> </el-table-column>
        <el-table-column prop="phoneNumber" label="电话" header-align="center"> </el-table-column>
        <el-table-column prop="mail" label="邮箱" header-align="center"> </el-table-column>
        <el-table-column prop="desc" label="备注" width="180" header-align="center"> </el-table-column>
        <!-- <el-table-column prop="del" label="操作信息">
            <el-row>
                <el-button type="danger">删除</el-button>
            </el-row>
        </el-table-column> -->
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    data() {
        return {
            usersListArr:[],
            tableData: [{
                    date: "1",
                    name: "耿磊",
                    address: "老师",
                    del: '删除',
                },
                {
                    date: "2",
                    name: "高绍松",
                    address: "学生",
                    del: '删除',
                },
                {
                    date: "3",
                    name: "盖腾飞",
                    address: "学生",
                    del: '删除',
                },
                {
                    date: "4",
                    name: "苏奕宇",
                    address: "学生",
                    del: '删除',
                },
            ],
        };
    },
    methods: {
        ...mapActions(["usersList","getArticleList"]),
    },
    async created() {
        let usersList = await this.usersList({
            // uuid:'vip',
            // pageNum:1,
            // pageSize:4
        });
        console.log(usersList.data);
        this.usersListArr=usersList.data.rows
        console.log(this.usersListArr);

        // let article = await this.getArticleList({});
        // console.log(article);

    },
};
</script>

<style scoped>
.wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
