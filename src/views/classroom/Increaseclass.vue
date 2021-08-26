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
      <el-table :data="gradeList" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="" label="班级名称"></el-table-column>
        <el-table-column prop="" label="管理员"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
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

        <el-form-item label="班主任 ID">
          <el-input v-model="addForm.headmasterid"></el-input>
        </el-form-item>

      </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
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
      queryInfo: {
        query: "",
        pageNo: 1,
        pageSize: 5,
      },
      addForm: {
        classname: "",
        headmasterid: "",
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},

    };
  },
  created() {
      this.getClasslist()
  },
  methods:{
    ...mapActions(["usersList"]),
    async getGradeList(){
      let acc = await this.usersList({
          name:this.addForm.classname,
          admin:this.addForm.headmasterid
      });
        console.log(acc);  
    },
    async getClasslist(){
      let classlist = await this.usersList({
          name:this.addForm.classname,
          admin:this.addForm.headmasterid
      });
      this.classlist=classlist
    },
    add(){
        this.getGradeList()
        this.dialogFormVisible = false
    }
  }
};
</script>



<style>

</style>