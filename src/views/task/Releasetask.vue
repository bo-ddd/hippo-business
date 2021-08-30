<template>
  <div class="wrap">
      <el-row>
              <el-col :span="10" class="article-content">
                <el-input type="textarea" :rows="5" placeholder="开始进行布置作业吧！" v-model="textarea"></el-input>
              </el-col>
              <!-- <el-col :span="24" class="pd-5_15">
                      <el-upload
                      class="upload-demo"
                      ref="upload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      :auto-upload="false">
                      <template #trigger>
                        <el-button size="small" type="primary">选取文件</el-button>
                      </template>
                      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <template #tip>
                          <div class="el-upload__tip">
                            只能上传 jpg/png 文件，且不超过 500kb
                          </div>
                        </template>
                    </el-upload>
              </el-col> -->
      </el-row>

      <!-- 这个是弄班级列表 -->
      <el-row>
         <el-col :span="24" class="pd-5_15">
            <el-tag :class="['mg-10',item.bool ? 'bg-blue' : '']"  v-for="(item,index) in classList" @click="checkMe(index)" :key="index" v-text="item.className" ></el-tag>
         </el-col>
      </el-row>
      <el-row>
          <el-col :span="12" class="pd-5_15">
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
            <el-button type="primary" @click="publishJob">确认发布<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default { 
    data(){
      return{
        disabledDate(time) {
            return time.getTime()+3600*1000*24 < Date.now();
        },
        textarea:'',
        value2:'',
        resultInformation:'',
        classList:[],//暂存班级的东西
        classArray:[],//存放被选的班级
      };
    },
    async created(){
      this.$message('布置作业');
      this.getUseMessage();
      this.getClass();
    },
    methods:{
      async publishJob(){
        let endTime = this.value2[1].getTime();
        let textarea=this.textarea;
        for(let i = 0;i<this.classList.length;i++){
            if(this.classList[i].bool){
              this.classArray.push(this.classList[i]);
            }else{
              continue;
            }
        }
        console.log(this.classArray);
        if(this.classArray.length==0){
          this.$message('您没有选择,给哪个班级布置作业');
          return;
        }else{
          console.log('进入到调用接口')
          for(let i = 0;i<this.classArray.length;i++){
            let data = await this.createTask({
                uuid:this.resultInformation.uuid,
                 content:textarea,
                 endTime:endTime,
                 classId:this.classArray[i].classId,
             })
             if(data.status){
                this.$message('布置作业成功');
             }else{
               this.$message('布置作业失败');
             }
            }
       }
      },
      ...mapActions(['createTask','getUserInfo','getClassList']),
      // submitUpload() {
      //   this.$refs.upload.submit();
      // },
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      // handlePreview(file) {
      //   console.log(file);
      // }
      async getUseMessage(){
        let data = await this.getUserInfo();
        if(data.status){
            console.log(data.data);
            this.resultInformation=data.data;
        }else{
          this.$message('获取个人信息失败');
        } 
      },
      async getClass(){
        let classList = await this.getClassList();
        if(classList.status){
          classList.data.rows.forEach(element => {
            this.classList.push({className:element.name,checked:false,classId:element.id});
          });
          console.log(this.classList);
        }else{
          this.$message('获取班级信息失败');
        }
      },
      checkMe(index){
          if(this.classList[index].bool){
            this.classList[index].bool=false;
          }else{
            this.classList[index].bool=true;
          }
      },
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
  .mg-10{
    margin: 20px 20px 20px 0;
  }
  .bg-blue{
    background-color: greenyellow;
  }
</style>