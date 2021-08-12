<template>
  <div class="wrap">
    <el-scrollbar max-height="600px">
      <div class="main">
        <div class="badges">
          <el-badge :value="3" :max="99" class="item">
            <el-button size="small">评论</el-button>
          </el-badge>
          <el-button icon="el-icon-share" class="item" size="mini">收藏</el-button>
          <el-button icon="el-icon-delete" class="item" size="mini">删除</el-button>
          <span class="readall">查看全文</span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  dara() {},
  methods: {
    ...mapActions(["detile"]),
  },
  async created() {
    let article = await this.detile({
      id: "1",
    });
    console.log(article);
  },
};
</script>

<style scoped>
.wrap {
  background-color: #fdfdfd;
}
.main {
  width: 80%;
  height: 250px;
  overflow: hidden;
  margin: 20px auto;
  background-color: #fff;
  position: relative;
  border-bottom: #ececec solid 1px;
}
.badges {
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
} 
.item {
  margin-left: 100px;
}
.readall {
  margin-left: 100px;
  cursor: pointer;
  color: #ccc;
}
.readall:hover {
  color: #64b1ff;
}
</style>