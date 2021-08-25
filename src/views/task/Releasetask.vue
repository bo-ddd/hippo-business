<template>
  <div class="wrap">
      <el-row>
            <el-col :span="24" class="header">发布作业</el-col>
            <el-col :span="12">
              <el-input type="textarea" :rows="22" placeholder="说点什么吧" v-model="textarea"></el-input>
            </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    data(){
      return{
        textarea:'',
      };
    }
}
</script>

<style>
  .header{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>