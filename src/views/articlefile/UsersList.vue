<template>
<div class="wrap">
    <el-table :data="usersListArr" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50px" header-align="center">
        </el-table-column>
        <el-table-column prop="userId" label="用户ID" header-align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" header-align="center">
        </el-table-column>
        <el-table-column label="性别" header-align="center">{{ gender }}
        </el-table-column>
        <el-table-column prop="phoneNumber" label="电话" header-align="center">
        </el-table-column>
        <el-table-column prop="mail" label="邮箱" header-align="center">
        </el-table-column>
        <el-table-column prop="desc" label="备注" width="180" header-align="center">
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:current-page.sync="nowPage" :page-size="pageSize" layout="sizes, prev, pager, next" :page-count="countPage" :page-sizes="[2,3,4,5,10]">
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
            usersListArr: [],
            nowPage: 1,
            countPage: 1,
            pageSize: 10,
        };
    },
    methods: {
        ...mapActions(["usersList"]),
        handleCurrentChange(val) {
            this.nowPage = val;
            this.getList();
            console.log(`当前页: ${val}`);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        async getList() {
            let usersList = await this.usersList({
                // uuid:'vip',
                pageNum: this.nowPage,
                pageSize: this.pageSize
            });
            this.usersListArr = usersList.data.rows;
            console.log(usersList.data.countPage);
            this.countPage = usersList.data.countPage;
        },
    },
    computed: {
        gender: function (sex) {
            console.log(sex);
            return sex ? "男" : "女";
        },
    },
    async created() {
        this.getList();
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
