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
                    <div v-html="changeMd(article.article)"></div>
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
        ...mapActions(["detail"]),
        changeMd(val) {
            // return md.renderInline(val);
            return md.render(val);
        },
    },
    async created(){
        let result = await this.detail({
            id:this.$route.query.id
        });
        console.log(this.$route.query.id);
        this.article = result.data
        console.log(this.article);
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
    border: 1px solid #99c3ff;
}
</style>