<template>
<div class="wrap">
    <div class="query">
        <div class="type">
            <span>选择查询的文章类型：</span>
            <el-select v-model="caregoryList.key" placeholder="全部">
                <el-option v-for="item in caregoryList" :key="item" :label="item.key" :value="item.key" @click="getArticleListOnPage({categoryId:item.id,pageSize: 5})"></el-option>
            </el-select>
        </div>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 800px" >
            <el-table-column type="index" label="序号" width="50" header-align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="250" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="作者" width="100" header-align="center" align="center">老苏
            </el-table-column>
            <el-table-column label="类型" width="100" header-align="center" align="center">
                <template #default="scope">
                    <p>{{ formatType(scope.row) }}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center" prop="id">
                <template #default="scope">
                    <div class="operation-a">
                        <div class="operation" @click="toArticle(scope.row)">查看</div>
                        <div class="operation" @click="updateArticle(scope.row)">编辑</div>
                        <div class="operation" @click="deleteArticlee(scope.row)">删除</div>
                    </div>
                    <!-- <el-button icon="el-icon-search" size="mini" @click="toArticle(scope.row)">查看</el-button>
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateArticle(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteArticlee(scope.row)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
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
            tableData: [],
            caregoryList: [],
        };
    },
    methods: {
        ...mapActions([
            "getArticleList",
            "getCategoryList",
            "getCategoryList",
            "updateArticle",
            "deleteArticle",
        ]),
        //详情
        toArticle(data) {
            console.log(data);
            this.$router.push({
                query: {
                    id: data.id,
                },
                name: "ArticleDetail",
            });
        },
        //修改
        updateArticle(data) {
            this.$router.push({
                query: {
                    id: data.id,
                },
                name: "UpdateArticle",
            });
        },
        //文章类型
        formatType(data) {
            let type = "";
            this.caregoryList.forEach((item) => {
                if (data.categoryId == item.id) {
                    type = item.key;
                }
            });
            return type;
        },
        //删除文章
        async deleteArticlee(data) {
            let delres = await this.deleteArticle({
                id: data.id.toString(),
            });
            location.reload();
            console.log(delres);
        },
        //获取文章列表
        async getArticleListOnPage(data) {
            if (data.categoryId) {
                let article = await this.getArticleList(data);
                this.tableData = article.data.rows;
            } else {
                let article = await this.getArticleList({
                    pageSize: 5
                });
                this.tableData = article.data.rows;
            }
        }
    },
    async created() {
        this.getArticleListOnPage({})
        //类目列表
        let caregoryList = await this.getCategoryList({
            type: "2",
        });
        this.caregoryList = caregoryList.data;
        this.caregoryList.unshift({
            id: 0,
            key: "全部",
        });
    },
};
</script>

<style scoped>
.wrap {
    width: 100%;
    background-color: #fdfdfd;
}

.query {
    margin: 0 250px;
}

.table {
    max-height: 500px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.class {
    width: 50px;
    height: 30px;
    margin-left: 10px;
}

.operation {
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #8a8686;
    cursor: pointer;
}

.operation:hover {
    color: #9d9dff;
}

.operation-a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
