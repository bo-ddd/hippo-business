<template>
  <div>   
      <!-- 动画 -->
      <transition name="el-zoom-in-center">
        <div v-show="showMain" class="transition-box">
           <!-- 活动表单 -->
            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
  <el-form-item label="活动名称">  
       <el-input v-model="sizeForm.name" placeholder="请输入内容"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <!-- <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select> -->
      <el-input v-model="sizeForm.region" placeholder="请输入内容"></el-input>
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
      v-model="sizeForm.value1"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="defaultTime1">
    </el-date-picker>

  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="sizeForm.type">
      <el-checkbox-button label="美食活动" name="type"></el-checkbox-button>
      <el-checkbox-button label="游戏比赛" name="type"></el-checkbox-button>
      <el-checkbox-button label="主题活动" name="type"></el-checkbox-button>
      <el-checkbox-button label="校园娱乐" name="type"></el-checkbox-button>
      <el-checkbox-button label="其他" name="type"></el-checkbox-button>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="活动logo">  
    <!-- sizeForm.resource -->

  <!-- 图片上传 -->
 <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">
    点击上传
  </el-button>
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
    <!-- <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
           

          
        </div>
      </transition>

      
  </div>
</template>



<script>

  export default {
    
    data: () => ({
      showMain: false,

      //图片上传数据
    fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
               {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

      //表单数据
       sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          desc: '',
          value1: [],
        },

          defaultTime1: [
          new Date(2000, 1, 1, 12, 0, 0),
        ], // '12:00:00'
        defaultTime2: [
          new Date(2000, 1, 1, 12, 0, 0),
          new Date(2000, 2, 1, 8, 0, 0)
        ] // '12:00:00', '08:00:00'
      
    }),

      methods: {
      onSubmit() {
        console.log('submit!');
        console.log(this.sizeForm.value1[0].getTime());
      },
      handleRemove(file, fileList) {
        console.log(2);
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(1);
        console.log(file);
      }
    },
    
    mounted(){
      this.showMain=true
    }
  }
</script>


<style>
  .transition-box {
    width: 100%;
    height: 600px;
    border-radius:4px;
    background-color: #a1dfe4;
    color: #fff;
    box-sizing: border-box;
  }
</style>


