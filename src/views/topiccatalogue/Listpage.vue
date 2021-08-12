
<template  v-slot:contrite>
<el-table :data="tableData" style="width: 100%" :row-class-name="rowClassName">
    <el-table-column label="题目类型" prop="categoryId">
    </el-table-column>
    <el-table-column label="题目" prop="title">
    </el-table-column>
    <el-table-column label="选项" prop="options">
      <ul>
        <li v-for="(item,index) in options" :key="(item,index)">
          {{item.key}}：{{item.value}}
        </li>
      </ul>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
      </template>
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看/编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        res:{},
        tableData: [],
        search: '',
        options:[]
      }
    },
    methods: {
      ...mapActions(['topiclist']),
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({
          name:'Viewtestquestions',
          query:{
            id:this.tableData[index].id,
            uuid:this.tableData[index].uuid,
            type:this.tableData[index].type,
            title:this.tableData[index].title,
            options:JSON.stringify(this.tableData[index].options),
            result:this.tableData[index].result
          }
        })
        // console.log(this.res)


      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      rowClassName({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
        // console.log(row)
        this.options = this.tableData[row.index].options
      },
    },
    async created(){
      this.res = await this.topiclist();
      this.tableData = this.res.data.rows
        console.log(this.res)
        for(let i = 0; i<this.tableData.length;i++){
          if(this.tableData[i].categoryId==1){
            this.tableData[i].categoryId='HTML'
          }else if(this.tableData[i].categoryId==2){
            this.tableData[i].categoryId='CSS'
          }else if(this.tableData[i].categoryId==3){
            this.tableData[i].categoryId='JS'
          }else if(this.tableData[i].categoryId==4){
            this.tableData[i].categoryId='VUE'
          }
        }
      }
  }
</script>

<style lang="less" scoped>

</style>


