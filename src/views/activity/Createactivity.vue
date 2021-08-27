<template>
  <div>
    <!-- 动画 -->
    <transition name="el-zoom-in-center">
      <div v-show="showMain" class="transition-box">
        <p>&nbsp;</p>
        <div class="leftMain">
        <!-- 活动表单 -->
           <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
          <el-form-item label="活动名称">
            <el-input
              class="input"
              v-model="sizeForm.name"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动地址">
            <el-input
              v-model="sizeForm.region"
              placeholder="请输入活动地址"
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动时间">
            <!-- <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;"></el-time-picker>
    </el-col> -->
            <el-date-picker
              v-model="sizeForm.Timearr"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="defaultTime1"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-radio-group v-model="sizeForm.type" size="small">
              <el-radio-button label="美食活动"></el-radio-button>
              <el-radio-button label="游戏比赛"></el-radio-button>
              <el-radio-button label="主题活动"></el-radio-button>
              <el-radio-button label="校园娱乐"></el-radio-button>
              <el-radio-button label="其他"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动logo">
            <!-- sizeForm.resource -->

            <!-- 图片上传 -->
         <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <template #tip>
    <div class="el-upload__tip">
      只能上传 jpg/png 文件，且不超过 500kb
    </div>
  </template>
</el-upload>
            <!-- ------------- -->
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
         <p>&nbsp;</p>
        </el-form>
        </div>
       

      <div class="rightMain">
      1
      </div>
      </div>

    </transition>
    
  </div>
</template>


<script>
import { mapActions } from "vuex";
import { ElMessage } from "element-plus";
export default {
  data: () => ({
    showMain: false,
    fullscreenLoading: false, //遮罩层

    //图片上传数据
  

    //表单数据
    sizeForm: {
      name: "",
      region: "",
      type: "5",
      Timearr: [],
      bannerUrl:
        "https://img1.baidu.com/it/u=3842871917,1015194123&fm=26&fmt=auto&gp=0.jpg",
    },

    defaultTime1: [new Date(2000, 1, 1, 12, 0, 0)], // '12:00:00'
    defaultTime2: [
      new Date(2000, 1, 1, 12, 0, 0),
      new Date(2000, 2, 1, 8, 0, 0),
    ], // '12:00:00', '08:00:00'
  }),

  methods: {
    ...mapActions(["createActive"]),
    //弹框提示
    open() {
      ElMessage.success({
        message: "创建成功",
        type: "success",
      });
    },
    openerro() {
      ElMessage.error("创建失败");
    },
    dataFormat(type) {
      switch (type) {
        case "美食活动":
          this.sizeForm.type = 1;

          break;
        case "游戏比赛":
          this.sizeForm.type = 2;
          break;

        case "主题活动":
          this.sizeForm.type = 3;
          break;

        case "校园娱乐":
          this.sizeForm.type = 4;
          break;

        case "其他":
          this.sizeForm.type = 5;
          break;
        default:
          break;
      }
    },
    async onSubmit() {
      console.log("submit!");
      if (this.sizeForm) {
        this.dataFormat(this.sizeForm.type);
        let res = await this.createActive({
          title: this.sizeForm.name,
          region: this.sizeForm.region,
          nature: this.sizeForm.type,
          startTime: this.sizeForm.Timearr[0].getTime(),
          endTime: this.sizeForm.Timearr[1].getTime(),
          banner: this.sizeForm.bannerUrl,
        });
        this.openFullScreen(res);
        console.log(res);
      } 
    },
    handleRemove(file, fileList) {
      console.log(2);
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(1);
      console.log(file);
    },

    //遮罩层
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    openFullScreen(res) {
      const loading = this.$loading({
        lock: true,
        text: "正在创建活动...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        if (res.status == 1) {
          this.open();
        } else {
          this.openerro();
        }
      }, 1500);
    },
  },

  mounted() {
    this.showMain = true;
  },
};
</script>


<style scoped>
.transition-box {
  width: 80%;
  border-radius: 4px;
  background-image: url('../../assets/back.png');
  color: #fff;
  margin: 0 auto;
}

.input {
  width: 400px;
}

.transition-box button {
  width: 365px;
  height: 40px;
}

/* */


/* .rightMain{
 
  float: right;
  background: red;
  width: 600px;
  height: 400px;
} */
</style>


