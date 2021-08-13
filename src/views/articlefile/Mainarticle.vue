<template>
<div class="wrap">
    <el-table :data="tableData" style="width: 800px" border="true">
        <el-table-column type="index" label="序号" width="50" header-align="center"> </el-table-column>
        <el-table-column prop="title" label="标题" width="250" header-align="center"> </el-table-column>
        <el-table-column prop="uuid" label="作者" width="150" header-align="center"> </el-table-column>
        <el-table-column prop="categoryId" label="类型" width="150" header-align="center"> </el-table-column>
        <el-table-column label="操作" header-align="center" prop="id">
            <template #default="scope">
                <el-button type="primary" icon="el-icon-edit" size="small" @click="toArticle(scope.row)">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
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
            allType:null,
        };
    },
    methods: {
        ...mapActions(["getArticleList","getCategoryList"]),
        toAticle(id){
          console.log(id);
        },
        toArticle(data){
          this.$router.push({
              query:{id:data.id},
              name:'Articlethis',
          })
        }
    },
    async created() {
        let article = await this.getArticleList({});
        console.log(article);
        this.tableData = article.data.rows;
        let catlist = await this.getCategoryList({
            type: "2",
        });
        this.allType = catlist
        console.log(catlist);
    },
};
</script>

<style scoped>
.wrap {
    background-color: #fdfdfd;
    display: flex;
    justify-content: center;
}
</style>
