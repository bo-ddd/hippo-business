<template>
   <div>
  <el-table :data="tableData" height="500px"  max-height="680px"  style="width:90%">
      <el-table-column prop="key"  label="试题类目" width="160px"></el-table-column>
      <el-table-column prop="iconUrl"  label="icon地址" width="620px"></el-table-column>
      <el-table-column label="图标" width="140px">
      <template #default="scope">
        <img :src="scope.row.iconUrl" class="iconShow">
      </template>
      </el-table-column>
      <el-table-column label="操作">
           <template #default="scope">
            <el-button type="primary" icon="el-icon-edit"   circle  @click="showupdate(scope.$index,tableData)"></el-button>
            <el-button type="danger" icon="el-icon-delete"  circle  @click.prevent="deleteRow(scope.$index,tableData)"  size="small"></el-button>
         </template>
      </el-table-column>
  </el-table>
  
     
    <el-button type="primary" @click="dialogFormVisible = true,show2 = !show2" class="addbtn">添加</el-button>

    <!-- Form -->

<el-dialog title="添加类目" v-model="dialogFormVisible">
    <el-form :model="form">
    <el-form-item label="类目标题" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="类目icon" :label-width="formLabelWidth">
      <el-input v-model="form.iconUrl" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="hidd">取 消</el-button>
      <el-button type="primary" @click="addtitle">确 定</el-button>
    </span>
  </template>
</el-dialog>

  <!-- 修改 -->
  <el-dialog title="添加类目" v-model="dialogFormupdate">
    <el-form :model="form">
    <el-form-item label="类目标题" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="类目icon" :label-width="formLabelWidth">
      <el-input v-model="form.iconUrl" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="hidd">取 消</el-button>
      <el-button type="primary" @click="updateRow">确 定</el-button>
    </span>
  </template>
</el-dialog>


</div>
</template>

<script>
 import {mapActions} from 'vuex'
//  import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
  export default {

  async  created(){
      let res= await this.getCategoryList({
         type:"1"
       })
      this.tableData = res.data


    },
  
    methods: {
      ...mapActions(["createCategory","getCategoryList","deleteCategory","updateCategory"]),

  
      // handleUserList(){
          
      // },
     
      showupdate(index,rows){
            this.dialogFormupdate = true;
            this.updateId = rows[index].id
      },

       deletetips(message) {
          ElMessage.warning({
            message: message,
            type: 'warning'
          });
        },
      
  async  deleteRow(index, rows) {
        let res = await this.deleteCategory({
           type:"1",
           id:rows[index].id
          })
        if(res.status==1){
          this.catlistdata();
        }else{
         this.deletetips(res.message)
        }
      }, 
 async updateRow(){
    this.dialogFormupdate = false;
    let res = await this.updateCategory({
         type:"1",
         id:this.updateId,
         key:this.form.name,
         iconUrl:this.form.iconUrl
    })
     if(res.status==1){
      alert("修改成功")
    }else{
      alert("修改失败")
    }
    this.form.name= "",
    this.form.iconUrl="" 
    this.catlistdata();  
 },

      hidd(){
      this.dialogFormVisible = false
      this.dialogFormupdate = false
         this.form.name = ""
         this.form.iconUrl = ""
      },
    async  catlistdata(){
       let res= await this.getCategoryList({
         type:"1"
       })
      this.tableData = res.data
      },

async addtitle(){
  this.i=0;
  this.dialogFormVisible = false
  this.tableData.forEach(item => {
      if(item.key == this.form.name || this.form.name==""){
            this.i++
        }
     });
        
    if(!this.i){
      let res = await this.createCategory({
        type:"1",
        key:this.form.name,
        iconUrl:this.form.iconUrl
      });
      console.log(res);

       this.catlistdata();
       this.form.name = ""
       this.form.iconUrl = ""
      }else{  
       this.form.iconUrl = ""
      }
       }  
    },
    data() {
      return {
        tableData: [ ],
        dialogFormVisible: false,
        dialogFormupdate: false,
        form: {
          name: '', 
          iconUrl: ''
        },
        updateId:'',
        show2: true,
        // currentPage:1,  //初始页是第一页
        // pagesize:5, //每页10条，
        // userList:[] //所有数据
      }
    }
}
</script>

<style scoped>
.addbtn{
  margin-left:940px;
}

.iconShow {
    width: 30px;
}

.block {
    margin-top: 20px;
    float: left;
}

</style>
