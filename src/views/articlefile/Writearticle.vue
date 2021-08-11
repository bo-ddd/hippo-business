<template>
  <div class="wrap">
    <div class="head">
      <div class="article-type">
        你要发表的文章类型:
        <!-- <el-form-item label="">
          <el-select v-model="region" placeholder="选择类型" class="type">
            <el-option label="HTML" value="HTML">HTML</el-option>
          </el-select>
        </el-form-item> -->
        <el-check-tag @change="onChange" :checked="checked" class="type">HTML</el-check-tag>
        <!-- <select name="type" id="">
          <option value="HTML">HTML</option>
          <option value="js">js</option>
          <option value="Vue">Vue</option>
        </select> -->
      </div>
      <div class="article-title">
        文章题目:&nbsp;&nbsp;
        <el-input
          class="title"
          type="text"
          placeholder="请输入内容"
          v-model="text"
          maxlength="30"
          show-word-limit
        >
        </el-input>
      </div>
    </div>
    <div class="article">
      <div class="left">
        <el-input
          type="textarea"
          :rows="22"
          placeholder="说点什么吧"
          v-model="textarea"
        >
        </el-input>
      </div>
      <div class="right">
        <el-scrollbar max-height="400px">
          <div v-html="changeMd(this.textarea)"></div>
        </el-scrollbar>
      </div>
    </div>
    <div class="foot">
      <el-button type="primary"
        >确认发布<i class="el-icon-upload el-icon--right"></i
      ></el-button>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
let md = MarkdownIt();
export default {
  data() {
    return {
      textarea: "",
      text: "",
      checked: false,
      region: "",
    };
  },
  methods: {
    changeMd(val) {
      // return md.renderInline(val);
      return md.render(val);
    },
    onChange(checked) {
      this.checked = checked;
    },
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
  justify-content: center;
  align-items: center;
}
</style>