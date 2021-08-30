<template>
<div class="wrap">
  <div class="type">
    请选择接收消息的群体:
    <el-radio-group v-model="radio">
      <el-radio-button label="所有人"></el-radio-button>
      <el-radio-button label="老师"></el-radio-button>
      <el-radio-button label="学生"></el-radio-button>
    </el-radio-group>
  </div>
  <div class="input">
    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 20}" placeholder="请输入消息内容" v-model="newstext" class="newstext">
    </el-input>
  </div>
  <div class="submit">
    <el-button type="primary" @click="addMsg">确认发布</el-button>
  </div>
</div>
</template>

<script>
  import {mapActions} from 'vuex'
export default {
  data(){
    return{
      newstext:'',
      radio:'所有人',
    }
  },
  methods:{
    ...mapActions(['sendMessage']),
    async addMsg(){
      let res = await this.sendMessage({
        postMessage:this.newstext,
      })
      location. reload()
      console.log(res);
    }
  },
};
</script>

<style>
  .input{
    width: 80%;
    margin-left: 10%;
    margin-top: 20px;
  }
  .submit{
    margin: 300px 45% 0;
  }
</style>
