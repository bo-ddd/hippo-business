<template>
<div class="wrap">
    <el-row>
        <el-col :span="14" class="article-content ipt-out">
             <div class="block article-content">
                <span class="demonstration pd-r_15">选择日期:</span>
                <el-date-picker
                v-model="value2"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :shortcuts="shortcuts"
                >
                </el-date-picker>
            </div>
            <div class="option-out">
                <span class="pd-r_15">项目负责人:</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-col>
    </el-row>
     <el-row>
        <el-col :span="14" class="article-content">
            <el-table
                :data="tableData"
            >
                <el-table-column
                prop="date"
                label="任务发布人"
                class="tx-center"
                width="180">  
                </el-table-column>
                <el-table-column
                prop="name"
                label="任务描述"
                class="tx-center"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                class="tx-center"
                label="任务完成状态">
                </el-table-column>
                <el-table-column
                class="tx-center"
                width="180"
                label="任务执行人">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="14" class="btn-out">
              <el-button type="primary" @click="sayThat">查询信息</el-button>
        </el-col>
    </el-row>
</div>
</template>

<script>
  import { ref } from 'vue'
  import {mapActions} from 'vuex';
export default {
    data(){
        return{
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
         shortcuts: [{
          text: '最近一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        }, {
          text: '最近一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        }, {
          text: '最近三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        }],
        value2: '',
        input: ref(''),
        options: [{
          value: '老师',
          label: '老师',
        }, {
          value: '学生',
          label: '学生'
        }, ],
        value: '',
        personoptions:[],
      }
    },
     methods: {
         ...mapActions(['usersList','getRole']),
         sayThat(){
             console.log(this.value);
         },
    },
    async created(){
      let data = await this.usersList({identity:32});
      console.log(data);
      if(data.status){
        this.options=[];
        (data.data).rows.forEach(element => {
            this.options.push({value:element.username,label:element.username});
        });
      }
    }
}
</script>

<style>
    .article-content{
        padding: 5px 15px;
    }
    .tx-center{
        text-align: center;
    }
    .pd-r_15{
        padding-right: 15px;
    }
    .ipt-out{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .option-out{
        display: flex;
        align-items: center;
    }
    .btn-out{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
        padding: 20px;
    }
</style>
