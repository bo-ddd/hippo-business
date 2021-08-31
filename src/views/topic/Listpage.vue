<template>
<el-table :data="tableData" max-height="750" border style="width: 100%" :row-class-name="rowClassName">
    <el-table-column label="题目类型" prop="categoryId" width="80">
    </el-table-column>
    <el-table-column label="题目" prop="title">
    </el-table-column>
    <el-table-column label="选项" prop="options">
        <ul>
            <li v-for="(item,index) in options" :key="(item,index)">
                {{item.key}}：{{item.value}}
            </li>
        </ul>
    </el-table-column>
    <el-table-column align="right">
        <template #header>
            <el-input v-model="search" placeholder="请输入题目类型" style="width:70%">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="selTypeTest(this.search)">搜索</el-button>
        </template>
        <template #default="scope">
            <el-button type="primary" icon="el-icon-search" @click="handleEdit(scope.$index, scope.row)">查看/编辑</el-button>
        </template>
    </el-table-column>
</el-table>

<div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 500, 1000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count">
    </el-pagination>
</div>

<!-- <div class="center-pagination">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataCount">
    </el-pagination>
</div> -->
</template>

<script>
import MarkdownIt from "markdown-it";
let md = MarkdownIt();
import {
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            res: {},
            tableData: [],
            search: '',
            options: [],

        currentPage:1,  //初始页是第一页
        pagesize:10, //每页10条，
        count:0
    
        }
    },
    methods: {
        ...mapActions(['getTopicList']),
        handleEdit(index, row) {
            console.log(index, row);
            this.$router.push({
                name: 'Viewtestquestions',
                query: {
                    id: this.tableData[index].id,
                    uuid: this.tableData[index].uuid,
                    type: this.tableData[index].type,
                    title: this.tableData[index].title,
                    options: JSON.stringify(this.tableData[index].options),
                    result: this.tableData[index].result,
                    categoryId: this.tableData[index].categoryId
                }
            })

        },

      async   TopicList(){
           this.res = await this.getTopicList({
            pageNum:this.currentPage,
            pageSize:this.pagesize
        });
        this.tableData = this.res.data.rows
        console.log(this.tableData);
         console.log(this.tableData.length);
        console.log(this.res.data)
        console.log(this.tableData)
        for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].categoryId == 1) {
                this.tableData[i].categoryId = 'HTML'
            } else if (this.tableData[i].categoryId == 2) {
                this.tableData[i].categoryId = 'CSS'
            } else if (this.tableData[i].categoryId == 3) {
                this.tableData[i].categoryId = 'JS'
            } else if (this.tableData[i].categoryId == 4) {
                this.tableData[i].categoryId = 'VUE'
            }
        }
        },

        changeMd(val) {
            // return md.renderInline(val);
            return md.render(val);
        },
        handleSizeChange(size) {
            this.pagesize = size;
            console.log(size);
              this.currentPage = 1;
              this.TopicList();
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            console.log(currentPage);
              this.TopicList();
        },
        searchs() {
            this.pageNum = 1;
            // this.getOrderData();
        },
        async selTypeTest(categoryId) {
            this.res = {}
            this.tableData = []
            if (categoryId == 'html') {
                categoryId = '1'
            } else if (categoryId == 'css') {
                categoryId = '2'
            } else if (categoryId == 'js') {
                categoryId = '3'
            } else if (categoryId == 'vue') {
                categoryId = '4'
            }
            this.res = await this.getTopicList({
                categoryId: categoryId
            });
            this.tableData = this.res.data.rows
            console.log(this.res)
            for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].categoryId == 1) {
                    this.tableData[i].categoryId = 'HTML'
                } else if (this.tableData[i].categoryId == 2) {
                    this.tableData[i].categoryId = 'CSS'
                } else if (this.tableData[i].categoryId == 3) {
                    this.tableData[i].categoryId = 'JS'
                } else if (this.tableData[i].categoryId == 4) {
                    this.tableData[i].categoryId = 'VUE'
                }
            }
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        rowClassName({
            row,
            rowIndex
        }) {
            //把每一行的索引放进row
            row.index = rowIndex;
            // console.log(row)
            this.options = this.tableData[row.index].options
        },
    },
    async created() {
     this.res = await this.getTopicList({
            pageNum:1,
        });
        this.count = this.res.data.rows.length
        this.tableData = this.res.data.rows
        console.log(this.tableData);
         console.log(this.tableData.length);
        console.log(this.res.data)
        console.log(this.tableData)
        for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].categoryId == 1) {
                this.tableData[i].categoryId = 'HTML'
            } else if (this.tableData[i].categoryId == 2) {
                this.tableData[i].categoryId = 'CSS'
            } else if (this.tableData[i].categoryId == 3) {
                this.tableData[i].categoryId = 'JS'
            } else if (this.tableData[i].categoryId == 4) {
                this.tableData[i].categoryId = 'VUE'
            }
        }
        this.TopicList();
    }
}
</script>

<style lang="less" scoped>
</style>
 