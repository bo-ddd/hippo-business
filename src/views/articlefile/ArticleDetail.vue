<template>
    <div class="wrap">
        <div class="main">
            <div class="head">
                <div></div>
                <div class="title center">
                    {{article.title}}
                </div>
                <div class="author">
                    作者:
                    {{article.uuid}}
                </div>
            </div>
            <div class="article" >
                <el-scrollbar max-height="400px">
                    <div>{{formatHtml}}</div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import MarkdownIt from "markdown-it";
let md = MarkdownIt();
export default ({
    data(){
        return {
            article:'',
        }
    },
    methods:{
        ...mapActions(["getArticleDetail"]),
       
    },
    async created(){
        let result = await this.getArticleDetail({
            id:this.$route.query.id
        });
        console.log(this.$route.query.id);
        this.article = result.data
        console.log(this.article);
    },
    computed:{
        formatHtml() {
            // return md.renderInline(this.article.article);
            let res = md.render(this.article.article);
            return res;
        },
    }
})
</script>

<style scoped>
.main{
    margin: 0 auto;
    width: 800px;
    display: flex;
    flex-direction: column;
}
.head{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-content: center;
}
.center{
    height: 100%;
    display: flex;
    align-items: center;
}
.title{
    font-size: 26px;
}
.author{
    display: flex;
    align-items: flex-end;
}
.article{
    width: 100%;
    margin-top: 20px;
}
</style>