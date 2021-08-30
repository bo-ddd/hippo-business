<template>
  <div id="app">

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
