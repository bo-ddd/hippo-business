<template>
   <div>
         <el-button type="primary" @click="dialogFormVisible = true" class="addbtn">添加</el-button>
  <el-table :data="tableData" height="460px" max-height="700" style="width:90%">
      <el-table-column prop="key"  label="所有试题类目" width="180px"></el-table-column>
      <el-table-column prop="iconUrl"  label="icon地址" width="670"></el-table-column>
      <el-table-column label="图标" width="160px" style="margin-left:130px">
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
     
  <div class="block">
 <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</div>

    <div class="block">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
    </div>

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
  export default {

  async  created(){
      let res= await this.catlist({
         type:"1"
       })
      this.tableData = res.data
    },
  
    methods: {
      ...mapActions(["catcreate","catlist","catdelete","catupdate"]),

      icon(){
         for (let index = 0; index < this.tableData.length; index++) {
           this.iconu = this.tableData.iconUrl
             console.log(this.iconu);
           
         }
      },

      showupdate(index,rows){
            this.dialogFormupdate = true;
            this.updateId = rows[index].id
      },
      
  async  deleteRow(index, rows) {
        let res = await this.catdelete({
           type:"1",
           id:rows[index].id
          })
        if(res.status==1){
          this.catlistdata();
        }else{
          alert("删除失败")
        }
      }, 
 async updateRow(){
    this.dialogFormupdate = false;
    let res = await this.catupdate({
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
       let res= await this.catlist({
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
      let res = await this.catcreate({
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
        iconu:""
      }
    }
}
</script>

<style scoped>
.addbtn{
 float: right;
}

.iconShow {
    width: 30px;
}

.block {
    margin-top: 20px;
    float: left;
}
</style>
