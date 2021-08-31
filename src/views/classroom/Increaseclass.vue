<template>
  <div>
    <el-card v-if="management">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary"
                     @click="dialogFormVisible = true">添加班级</el-button>
        </el-col>
      </el-row>
      <el-table :data="classlist" border stripe>
        <el-table-column prop="id" label="序号"  width="50" fixed></el-table-column>
        <el-table-column prop="name" label="班级名称"></el-table-column>
        <el-table-column prop="admin" label="管理员"></el-table-column>
              <el-table-column label="操作" header-align="center" prop="id" >
                  <template #default="scope">
                    <div class="cella">
                      <a href="#" class="biaodan" @click="toArticle(scope.row)">查看</a>
                      <a href="#" class="biaodan" @click="updateArticle(scope.row)">编辑</a>
                      <a href="#" class="biaodan" @click="deleteArticlee(scope.row)">删除</a>
                     </div>
                  </template>
              </el-table-column> 
      </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:current-page.sync="queryInfo.nowPage" :page-size="pageSize" layout="sizes, prev, pager, next" :page-count="queryInfo.countPage" :page-sizes="[2,3,4,5,10]">
        </el-pagination>
    </el-card>

        <el-card  v-if="studentlist">
              <el-button type="primary" @click="toArticleS">返回班级</el-button>
          <el-container>
            <el-main class="content">
              <el-table :data="personnel" border style="width: 100%">
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
                      <a href="#" class="biaodan" @click="deleteArticlee(scope.row)">移除此学生</a>
                  </template>
              </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:current-page.sync="queryInfo.nowPage" :page-size="pageSize" layout="sizes, prev, pager, next" :page-count="queryInfo.countPage" :page-sizes="[2,3,4,5,10]">
          </el-pagination>
            </el-main>    
        </el-container>
      </el-card>


    <!-- 添加班级的对话框 -->
      <el-dialog title="添加班级" v-model="dialogFormVisible">

          <el-form 
               ref="addFormRef"
               :rules="addFormRules"
               label-width="100px">
        <el-form-item label="班级名称" >
          <el-input v-model="addForm.classname"></el-input>
        </el-form-item>

      </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 修改班级的对话框 -->
      <el-dialog title="修改班级" v-model="dialogTableVisible">

          <el-form 
               ref="addFormRef"
               :rules="addFormRules"
               label-width="100px">
        <el-form-item label="班级名" >
          <el-input v-model="Modifyclass.name"></el-input>
        </el-form-item>

        <el-form-item label="管理员的uuid">
          <el-input v-model="Modifyclass.admin"></el-input>
        </el-form-item>

      </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="mdifyclass">确 定</el-button>
          </span>
        </template>
      </el-dialog>

          

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
      infolist:[],
      queryInfo: {
        query: "",
        pageNo: 1,
        nowPage:1,
        countPage:1
      },
      pageSize: 10,
      addForm: {
        classname: "",
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      Modifyid:[],
      Modifyclass:{
        name:"",
        admin:"",
      },
      studentlist:false,
      management:true,
      personnel:[],
    };
  },
  created() {
      this.getinfolist()
      this.getclasslist()
  },
  methods:{
    ...mapActions(["createClass","getUserInfo","getClassList",'deleteClass',"updateClass","usersList"]),
        handleCurrentChange(val) {
            this.nowPage = val;
            this.getclasslist();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getclasslist();
    },
    async getGradeList(){
      let acc = await this.createClass({
          name:this.addForm.classname,
          admin:this.infolist
      });
        console.log(acc);
    },
    async getinfolist(){
      let infolist = await this.getUserInfo({
          name:this.addForm.classname,
          admin:this.addForm.headmasterid
      });
      this.infolist=infolist.data.uuid
      this.getclasslist()
    },
    async getclasslist(){
      let classlist = await this.getClassList({
            pageNum: this.queryInfo.nowPage,
            pageSize: this.pageSize
      });
      this.classlist=classlist.data.rows
      this.queryInfo.countPage = classlist.data.countPage;
      
      // console.log(classlist);
    },

    async updateArticle(data){
      this.dialogTableVisible = true
      this.Modifyid=data
    },
    async deleteArticlee(data){
            let delres = await this.deleteClass({
                id:data.id.toString(),
            })
            // this.reload()
            // location. reload()
            console.log(delres);
            this.getclasslist()
    },
    add(){
        this.getGradeList()
        this.dialogFormVisible = false
        location. reload()
    },
    async mdifyclass(){
        let modify = await this.updateClass({
                id:this.Modifyid.id,
                name:this.Modifyclass.name,
                admin:this.Modifyclass.admin
        })
            // this.reload()
            // location. reload()
        console.log(modify);
        this.getclasslist()
        this.dialogTableVisible = false
        
    },
    toArticle(data){
      this.studentlist=true
      this.management=false
      Object.values(this.classlist).filter((item) => {
        if(item.id==data.id){
          this.personnel=item.children.rows
        }
      })
      Object.values(this.personnel).forEach((item) => {
      if(item.sex==1){
          item.sex="男"
          }else{
          item.sex="女"
          }
        })
    },
    toArticleS(){
      this.studentlist=false
      this.management=true
    },
    
  }
};
</script>

<style scoped>
  .el-row{
    margin-bottom: 15px;
  }
  .biaodan{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    border: solid rgb(223, 217, 217) 1.5px;
  }
  .biaodan:hover{
    background-color: rgb(0, 153, 255);
    cursor:pointer;
  }
  .cella{
    display: flex;
  }
</style>