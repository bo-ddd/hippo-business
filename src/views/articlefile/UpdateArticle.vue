<template>
<div class="wrap">
    <div class="head">
        <div class="article-type">
            你要修改文章类型:
            <el-check-tag @change="onChange(index)" :checked="checked[index]" class="type" v-for="(item, index) in tap" :key="(index, item)">{{ item.key }}</el-check-tag>
        </div>
        <div class="article-title">
            文章题目:&nbsp;&nbsp;
            <el-input class="title" type="text" placeholder="请输入内容" v-model="text" maxlength="30" show-word-limit>
            </el-input>
        </div>
    </div>
    <div class="article">
        <div class="left">
            <el-input type="textarea" :rows="22" placeholder="说点什么吧" v-model="textarea">
            </el-input>
        </div>
        <!-- <el-button icon="el-icon-edit" size="mini" @></el-button> -->
        <div class="right">
            <el-scrollbar max-height="400px">
                <div v-html="changeMd(textarea)"></div>
            </el-scrollbar>
        </div>
    </div>
    <div class="foot">
        <el-button type="primary" @click="submit">确认修改<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import MarkdownIt from "markdown-it";
let md = MarkdownIt();
export default {
    data() {
        return {
            tap: [],
            textarea: "",
            text: "",
            checked: {},
        };
    },
    methods: {
        ...mapActions(["getCategoryList", "updateArticle","getArticleDetail"]),
        changeMd(val) {
            // return md.renderInline(val);
            return md.render(val);
        },
        onChange(index) {
            for (const key in this.checked) {
                this.checked[key] = false
            }
            this.checked[index] = true;
        },
        async submit() {
            let typeId = ''
            for (const key in this.checked) {
                if (this.checked[key]) {
                    typeId = this.tap[key].id
                }
            }
            if (!typeId) {
                alert('请选择文章类型')
            } else if (!this.text) {
                alert('请填写标题')
            } else if (!this.textarea) {
                alert('内容不能为空!!!')
            } else {
                let result = await this.updateArticle({
                    id:this.$route.query.id,
                    title: this.text,
                    article: this.textarea,
                    categoryId: typeId.toString(),
                });
                console.log(result.status);
                this.$router.push({
                    name: 'Mainarticle',
                });
            }
        },
    },
    async created() {
        let catlist = await this.getCategoryList({
            type: "2",
        });
        this.tap = catlist.data
        let selectres = await this.getArticleDetail({
            id:this.$route.query.id,
        })
        this.textarea =selectres.data.article
        this.text =selectres.data.title
    },
};
</script>

<style scoped>
.head {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.article-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.article-type {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.type {
    margin-left: 20px;
}

.article {
    width: 100%;
    display: flex;
    justify-content: space-around;
    overflow: hidden;
}

.title {
    width: 80%;
}

.left {
    width: 45%;
}

.right {
    width: 45%;
    border: 1px solid #99c3ff;
}

.foot {
    margin-top: 20px;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
