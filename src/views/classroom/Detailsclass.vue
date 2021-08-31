<template>
  <div>
    <el-card>
        <el-button type="primary" @click="anhui">返回班级</el-button>
          <el-container>
            <el-main class="content">
              <el-table :data="acc" border style="width: 100%">
              <el-table-column prop="userId" label="用户ID"  width="50" header-align="center">
              </el-table-column>
              <el-table-column prop="username" label="用户名" header-align="center">
              </el-table-column>
              <el-table-column prop="sex" label="性别" header-align="center">
              </el-table-column>
              <el-table-column prop="" label="学习成绩" header-align="center">
              </el-table-column>
              <el-table-column prop="classId" label="班级名称"  header-align="center">
              </el-table-column>
              <el-table-column prop="" label="操作"  header-align="center">
                  <template #default="scope">
                      <a href="#" class="biaodan" @click="check(scope.row)">移除此学生</a>
                  </template>
              </el-table-column>
          </el-table>
            </el-main>    
        </el-container>
      </el-card>
  </div>
</template>
<script>
import {
    mapActions
} from "vuex";
export default {
  data() {
    return {
      classlist:[],
      acc:[]
    }
  },
  created() {
      console.log(this.$route.query);
      this.getclasslist()
  },
  methods:{
    ...mapActions(["getClassList","updateUser"]),
    async check(id) {
      let res = await this.updateUser({
                userId:id.userId,
                classId:0
    })
      console.log(res);
      this.getclasslist()
    },
    async getclasslist(){
      let classlist = await this.getClassList({
      });
      this.classlist=classlist.data.rows
      console.log(this.classlist);
      Object.values(this.classlist).filter((item) => {
        if(item.id==this.$route.query.data){
          this.acc=item.children.rows
        }
      })
      Object.values(this.classlist).forEach((item) => {
      if(item.sex==1){
          item.sex="男"
          }else{
          item.sex="女"
          }
      })
    },
    anhui(){
          this.$router.push({
            path: '/classroom/increaseclass',
          })
    }
  }
};
</script>

<style>

</style>