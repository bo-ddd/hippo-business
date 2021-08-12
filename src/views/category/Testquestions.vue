<template>
   <div>
     <!-- <el-button type="text" @click="dialogFormVisible = true" >添加</el-button> -->
         <el-button type="primary" @click="dialogFormVisible = true" class="addbtn">添加</el-button>
  <el-table :data="tableData" height="460px" max-height="700" style="width:100%">
      <el-table-column prop="key"  label="所有试题类目" width="200px"></el-table-column>
      <el-table-column prop="iconUrl"  label="icon地址" width="460px"></el-table-column>
      <el-table-column label="图标" width="200px">
    
      <img :src="this.tableData[4].iconUrl" class="iconShow">
        <!-- <span v-for="(item,index) in this.tableData" :key="(item,index)"></span>
        <span>{{this.tableData[this.index].iconUrl}}</span> -->
      </el-table-column>
      <el-table-column label="操作">
           <template #default="scope">
            <el-button type="primary" icon="el-icon-edit"   circle    @click="dialogFormVisible = true"></el-button>
            <el-button type="danger" icon="el-icon-delete"  circle  @click.prevent="deleteRow(scope.$index, tableData)"  size="small"></el-button>
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
      ...mapActions(["catcreate","catlist"]),
      
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }, 
      hidd(){
      this.dialogFormVisible = false
         this.form.name = ""
         this.form.iconUrl = ""
      },
      indexi(){
             this.inde++
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
        form: {
          name: '', 
          iconUrl: ''
        },
        i:0,
        inde:0,
      }
    }
  }
</script>


<style scoped>
.addbtn{
  position: absolute;
  margin-left:1000px;
  z-index: 99;
}

.iconShow{
   width: 30px;
}

.block{
  margin-top: 20px;
  float: left;
}

</style>
