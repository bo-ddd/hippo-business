<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <el-row class="row1">
          <el-button>搜索ID</el-button>
          <el-col :span="6">
            <el-input v-model="inputId" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-button>搜索关键字</el-button>
          <el-col :span="6">
            <el-input v-model="inputName" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-button>性别筛选</el-button>
          <el-col :span="3">
            <el-select v-model="value" placeholder="请选择性别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="content">
        <el-table :data="studentsNewList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50px" header-align="center">
        </el-table-column>
        <el-table-column prop="userId" label="用户ID" header-align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" header-align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" header-align="center">
        </el-table-column>
        <el-table-column prop="" label="身份" header-align="center">
        </el-table-column>
        <el-table-column prop="" label="学习成绩" header-align="center">
        </el-table-column>
        <el-table-column prop="" label="班级名称" width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="" label="身份修改" width="180" header-align="center">
          <el-button type="primary" size="medium">主要按钮</el-button>
        </el-table-column>
         
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:current-page.sync="nowPage" :page-size="pageSize" layout="sizes, prev, pager, next" :page-count="countPage" :page-sizes="[2,3,4,5,10]">
    </el-pagination>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
    mapActions
} from "vuex";
 export default {
      name: "demo2",
      data(){
        return{
          studentsList:[],
          studentsNewList:[],
          inputName:'',
          inputId:null,
          options:[
            {value:3,label:'全部'},
            {value:1,label:'男'},
            {value:0,label:'女'}
          ],
          value:0,
          nowPage: 1,
          countPage: 1,
          pageSize: 10,
        }
      },
      methods:{
        ...mapActions(["usersList"]),
        handleCurrentChange(val) {
            this.nowPage = val;
            this.getStudentsNum();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getStudentsNum();
        },
        async getStudentsNum() {
          let studentsNewList = await this.usersList({
                // uuid:'vip',
                pageNum: this.nowPage,
                pageSize: this.pageSize
            });
            this.studentsNewList = this.studentsList = studentsNewList.data.rows;
            this.countPage = studentsNewList.data.countPage;
            Object.values(this.studentsNewList).forEach((item) => {
              if(item.sex==1){
                item.sex="男"
              }else{
                item.sex="女"
              }
            })
        },
        
        searchId(keywords) {
          return this.studentsList.filter(item =>{
            if(item.userId == keywords) {
              return item
            }
          })
        },
        searchName(keywords) {
          return this.studentsList.filter(item =>{
            if(item.username.includes(keywords)){
              return item
            }
          })
        },
        searchsex(keywords) {
          return this.studentsList.filter(item =>{
            if(item.sex == keywords){
              return item
            }
          })
        },
        numberToSex(num) {
          console.log(num);
            return num==1 ? '男' : '女';
        },
      },
      created() {
        this.getStudentsNum();
      },
      computed: {
        
      },
      watch:{
        inputId: function(val) {
          if(val == ''){
            this.studentsNewList = this.studentsList
          }else{
            this.studentsNewList = this.searchId(val)
          }
        },
        inputName: function(val) {
          if(val == ''){
            this.studentsNewList = this.studentsList
          }else{
            this.studentsNewList = this.searchName(val)
          }
        },
        value: function(val) {
          if(val == 3){
            this.studentsNewList = this.studentsList
          }else{
            this.studentsNewList = this.searchsex(this.numberToSex(val))
          }
        }
      },
};
</script>

<style scoped>
  .row1 el-col{
    display: flex;
    justify-content: center;
    align-content: center;
  }
</style>
