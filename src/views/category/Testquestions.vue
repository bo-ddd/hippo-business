<template>
   <div>
     <!-- <el-button type="text" @click="dialogFormVisible = true" >添加</el-button> -->
         <el-button type="primary" @click="dialogFormVisible = true" class="addbtn">添加</el-button>
  <el-table :data="tableData" height="460px" max-height="700" style="width:100%">
      <el-table-column prop="alltitle"  label="所有试题类目" width="260px"></el-table-column>
      <el-table-column prop="iconUrl"  label="icon地址" width="360px"></el-table-column>
      <el-table-column prop="iconUrl"  label="图标" width="200px">
        <img src="@/assets/logo.png" class="iconShow">
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
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </span>
  </template>
</el-dialog>

   </div>

</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },      
    },
    data() {
      return {
        tableData: [{
          alltitle: 'Js',
          iconUrl:'www.baidu.com'
        },{
          alltitle: 'Node',
          iconUrl:'www.baidu.com'
        },{
          alltitle: 'Jquery',
          iconUrl:'www.baidu.com'
        },{
          alltitle: 'Java',
          iconUrl:'www.baidu.com'
        },{
          alltitle: 'HTML',
          iconUrl:'www.baidu.com'
        },{
          alltitle: 'HTML',
          iconUrl:'www.baidu.com'
        }
        ],
        dialogFormVisible: false,
        form: {
          name: '', 
          iconUrl: ''
        },
      }
    }
  }
</script>


<style scoped>
.addbtn{
  position: absolute;
  margin-left: 400px;
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
