<template>
<el-table :data="examList" border style="width: 100%">
    <el-table-column fixed prop="categoryId" label="类目id" width="150">
    </el-table-column>
    <el-table-column prop="categoryName" label="试题类目" width="120">
    </el-table-column>
    <el-table-column prop="classId" label="班级号" width="120">
    </el-table-column>
    <el-table-column prop="className" label="班级名字" width="120">
    </el-table-column>
    <el-table-column prop="startTime" label="开始时间" width="300">
    </el-table-column>
    <el-table-column prop="endTime" label="结束时间" width="420">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
        </template>
    </el-table-column>
</el-table>

<div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 500, 1000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count">
    </el-pagination>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            examList: [],
            currentPage: 1, //初始页是第一页
            pagesize: 10, //每页10条，
            count: 0
        }
    },
    methods: {
        ...mapActions(['getExamList']),
        //跳转入试卷详情页方法
        jumpPage: function () {
            this.$router.push({
                name: 'Paperdetails',
            })
        },
        handleSizeChange(size) {
            this.pagesize = size;
            console.log(size);
            this.currentPage = 1;
            this.selExamList();
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            console.log(currentPage);
            this.selExamList();
        },
        async selExamList() {
            let res = await this.getExamList({
                pageNum: this.currentPage,
                pageSize: this.pagesize
            })
            this.examList = res.data.rows
        }
    },
    async created() {
        let res = await this.getExamList({
            pageSize:1000
        })
        this.examList = res.data.rows
        this.count = res.data.rows.length
        console.log(this.count)
        console.log(this.examList);
        this.selExamList()
    }
}
</script>

<style>
.el-table .cell {
    text-align: center;
}
</style>
