<template>
  <div class="wrap">

      <!-- 作业选项 -->
      <el-tabs v-model="activeName" type="card" class="pd-5_15" @tab-click="handleClick">
      <el-tab-pane label="班级作业" name="first">
          <el-row>
              <el-col :span="10" class="article-content">
                <el-input type="textarea" :rows="5" placeholder="开始进行布置作业吧！" v-model="textarea"></el-input>
              </el-col>
      </el-row>

      <!-- 这个是弄班级列表 -->
      <el-row>
         <el-col :span="24" class="pd-5_15 btn-out">
            <el-tag :class="['mg-10',item.bool ? 'bg-blue' : '',item.bool ? 'cl-white' : 'cl-black' ]"  v-for="(item,index) in classList" @click="checkMe(item)" :key="index" >{{item.name}}</el-tag>
         </el-col>
      </el-row>
      <el-row>  
          <el-col :span="12" class="pd-5_15">
              <div class="block">
                <span class="demonstration pd-15">截止时间:</span>
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
          <el-col :span="8" class="uploadjob-out"> 
            <el-button type="primary" @click="publishJob()">确认发布<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-col>
      </el-row>
      </el-tab-pane>

      <el-tab-pane label="个人作业" name="second">
            <el-row>
                <el-col :span="10">
                        <el-select v-model="classValue" class="pd-5_15"  placeholder="请选择">
                          <el-option
                            v-for="(item,index) in classList"
                            :key="index"
                            :label="item.name"
                            :value="index"
                            >
                          </el-option>
                        </el-select>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" class="article-content">
                <el-input type="textarea" :rows="5" placeholder="开始进行布置作业吧！" v-model="textareaOne"></el-input>
              </el-col>
      </el-row>

      <!-- 这个是个人 -->
      <el-row>
         <el-col :span="24" class="pd-5_15 btn-out">
            <el-tag :class="['mg-10',item.bool ? 'bg-blue' : '',item.bool ? 'cl-white' : 'cl-black' ]"  v-for="(item,index) in stuList" @click="checkMe(item)" :key="index"  >{{item.username}}</el-tag>
         </el-col>
      </el-row>
      <el-row>  
          <el-col :span="12" class="pd-5_15">
              <div class="block">
                <span class="demonstration pd-15">截止时间:</span>
                  <el-date-picker
                      v-model="dateValueOne"
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
          <el-col :span="8" class="uploadjob-out"> 
            <el-button type="primary" @click="publishStu()">确认发布<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-col>
      </el-row>
      </el-tab-pane>
      </el-tabs> 
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
        textarea:'',//放所有班级
        value2:'',//班级选择那个时间
        resultInformation:'',//放身份
        classList:[],//暂存班级的东西
        classArray:[],//存放被选的班级
        activeName: 'first',//标签选择
        dateValueOne:'',//个人选择那个时间
        textareaOne:'',//给个人布置作业的
        classValue:'',//放所选班级值
        studentList:'',//放学生
        classIndex:[],//存班级的下标
        studentIds:[],//存放学生id
      };
    },
    async created(){
      this.getUseMessage();
      this.getClass();
    },
    computed:{
      stuList(){
        if(this.classIndex.includes(this.classValue)){
          return this.classList[this.classValue].children.rows;
        }else{
          return '';
        }
      }  
    },
  methods:{
      //布置班级作业
      async publishJob(){
        if(!this.value2){
            this.$message('请选择截止时间');
            return;
          }
          if(!this.textarea){
            this.$message('请写作业内容');
            return;
          }
        let endTime =this.value2[1].getTime();//得到时间
        let textarea=this.textarea;//作业内容
        this.classArray=[];
        console.log(endTime);
        console.log(textarea);
          for(let i = 0;i<this.classList.length;i++){
              if(this.classList[i].bool){
                this.classArray.push(this.classList[i]);
              }else{
                continue;
              }
          }
          if(this.classArray.length==0){
            this.$message('您没有选择,给哪个班级布置作业');
            return;
          }else{
            console.log('aaa=========================');
            for(let i = 0;i<this.classArray.length;i++){
              if(this.classArray[i].children.rows.length>0){
                    for(let m =0;m<this.classArray[i].children.rows.length;m++){
                      console.log(this.classArray[i].children.rows[m]);

                      //////这个是选择班级 
                // let data = await this.createTask({
                //      uuid:this.resultInformation.uuid,
                //      content:textarea,
                //      endTime:endTime,
                //      classId:this.classArray[i],
                //  })
                //  if(data.status){
                //     this.$message('布置作业成功');
                //  }else{
                //    this.$message('布置作业失败');
                //  }
                }
              }else{
                continue;
              }
              }
            }
         },
      

      //这个是给某个学生提交作业;
      async publishStu(){
          if(!this.dateValueOne){
            this.$message('请选择截止时间');
            return;
          }
          if(this.textareaOne==""){
            this.$message('请写作业内容');
            return;
          }
          let endTime =this.dateValueOne[1].getTime();//得到时间
          let textarea=this.textareaOne;//作业内容
          console.log(endTime);
          console.log(textarea);
          for(let i=0;i<this.classList.length;i++){
            for(let m=0;m<this.classList[i].children.rows.length;m++){
                  if(this.classList[i].children.rows[m].bool){
                    this.studentIds.push(this.classList[i].children.rows[m]);
                    console.log(this.classList[i].children.rows[m]);
                  }else{
                    continue;
                  }
            }
          }
          if(this.studentIds.length==0){
            this.$message('学生不能为空');
          }else{
            console.log(this.studentIds);
          }
      },
      //布置个人作业
      ...mapActions(['createTask','getUserInfo','getClassList']),

      //这个是获取个人信息
      async getUseMessage(){
        let data = await this.getUserInfo();
        if(data.status){
            this.resultInformation=data.data;
            console.log(this.resultInformation);
        }else{
          this.$message('获取个人信息失败');
        } 
      },

      //这个是获取到所有的班级
      async getClass(){
        let classList = await this.getClassList();
        this.classList=[];
        this.classIndex=[];
        console.log(classList);
        if(classList.status){
          classList.data.rows.forEach((element,index) => {
            this.classList.push(element);
            element.children.rows.forEach(child=>{
              child.bool=false;
            })
            this.classIndex.push(index);
          });
          console.log(this.classList);
        }else{
          this.$message('获取班级信息失败');
        }
      },

      //这个是看哪个班级或者学生被选择
      checkMe(item){
        if(item.bool){
          item.bool=false;
          }else{
            item.bool=true;
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
    background-color: #1890ff;
  }
  .pd-15{
    padding-right: 15px;
  }
  .cl-white{
    color:#fff;
  }
  .cl-black{
    color:#000;
  }
  .mg-10:hover{
    cursor: pointer;
  }
  .btn-out{
    display: flex;
    align-items: center;
  }
</style>