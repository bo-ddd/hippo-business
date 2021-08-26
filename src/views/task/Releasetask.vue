<template>
  <div class="wrap">
      <el-row>
              <el-col :span="24" class="article-content">
                <el-input type="textarea" :rows="8" placeholder="开始进行布置作业吧！" v-model="textarea"></el-input>
              </el-col>
      </el-row>
      <el-row>
              <el-col :span="24" class="pd-5_15">
                  <div class="block">
                    <span class="demonstration">截止时间:</span>
                    <el-date-picker
                      v-model="value2"
                      type="datetimerange"
                      :disabled-date="disabledDate"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </div>
              </el-col>
      </el-row>
      <el-row>
          <el-col :span="24" class="uploadjob-out"> 
            <el-button type="primary" @click="returnDate">确认发布<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    data(){
      return{
        disabledDate(time) {
            return time.getTime()+3600*1000*24 < Date.now();
        },
        textarea:'',
        value2:'',
      };
    },
    created(){
      this.$message('布置作业');
    },
    methods:{
      returnDate(){
        console.log(this.value2);
        console.log(this.value2[1].getTime());
      }
    },
}
</script>

<style>
  .header{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .uploadjob-out{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    margin: 20px 0 0 0;
  }
  .article-content{
    padding: 5px 15px;
  }
  .pd-5_15{
    padding: 5px 15px;
  }
</style>