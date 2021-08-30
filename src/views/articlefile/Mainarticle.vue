<template>
<div class="wrap">
    <el-table :data="tableData" style="width: 800px" border="true">
        <el-table-column type="index" label="序号" width="50" header-align="center"> </el-table-column>
        <el-table-column prop="title" label="标题" width="250" header-align="center"> </el-table-column>
        <el-table-column label="作者" width="100" header-align="center">老苏 </el-table-column>
        <el-table-column  label="类型"  width="100" header-align="center"> 
              <template #default="scope">
            <p>{{ formatType(scope.row)}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" prop="id" >
            <template #default="scope">
                <el-button icon="el-icon-search" size="mini" @click="toArticle(scope.row)">查看</el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateArticle(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteArticlee(scope.row)">删除</el-button>
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
            caregoryList:[],
        };
    },
    methods: {
        ...mapActions(["getArticleList","getCategoryList","getCategoryList","updateArticle","deleteArticle"]),
        toArticle(data){
          this.$router.push({
              query:{id:data.id},
              name:'ArticleDetail',
          })
        },
        updateArticle(data){
            this.$router.push({
              query:{id:data.id},
              name:'UpdateArticle',
          })
        },
        formatType(data){
            let type = ''
            this.caregoryList.forEach(item => {
                if (data.categoryId==item.id) {
                    type=item.key
                }
            });
            return type
        },
        async deleteArticlee(data){
            let delres = await this.deleteArticle({
                id:data.id.toString(),
            })
            // this.reload()
            location. reload()
            console.log(delres);
        }
    },
    async created() {
        let article = await this.getArticleList({});
        this.tableData = article.data.rows;
        let catlist = await this.getCategoryList({
            type: "2",
        });
        this.allType = catlist
        let caregoryList = await this.getCategoryList({
            type: "2",
        });
        this.caregoryList=caregoryList.data
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
