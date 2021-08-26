<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入班级名称"
                    v-model="queryInfo.query"
                    clearable
                    @clear="getGradeList">
            <el-button 
                       icon="el-icon-search"
                       @click="getGradeList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="dialogFormVisible = true">添加班级</el-button>
        </el-col>
      </el-row>
      <el-table :data="classlist" border stripe>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="name" label="班级名称"></el-table-column>
        <el-table-column prop="" label="管理员"></el-table-column>
              <el-table-column label="操作" header-align="center" prop="id" >
                  <template #default="scope">
                      <el-button icon="el-icon-search" size="mini" @click="toArticle(scope.row)">查看</el-button>
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateArticle(scope.row)">编辑</el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteArticlee(scope.row)">删除</el-button>
                  </template>
              </el-table-column> 
      </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:current-page.sync="queryInfo.nowPage" :page-size="queryInfo.pageSize" layout="sizes, prev, pager, next" :page-count="queryInfo.countPage" :page-sizes="[2,3,4,5,10]">
        </el-pagination>
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
        pageSize: 5,
        nowPage:1,
        countPage:1
      },
      addForm: {
        classname: "",
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},
      Modifyid:[],
      Modifyclass:{
        name:'',
        admin:'',
      },
    };
  },
  created() {
      this.getinfolist()
      this.getclasslist()
  },
  methods:{
    ...mapActions(["createClass","getUserInfo","getClassList",'deleteClass',"updateClass"]),
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
            pageSize: this.queryInfo.pageSize
      });
      this.classlist=classlist.data.rows
      this.queryInfo.countPage = classlist.data.countPage;
      console.log(classlist);
    },

    async updateArticle(data){
      this.dialogTableVisible = true
      this.Modifyid=data
      console.log(this.Modifyid.id);
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
        this.dialogFormVisible = false
    }
  }
};
</script>



<style>

</style>