<template>
<el-table :data="tableData" style="width: 100%" max-height="850">
    <el-table-column fixed prop="id" label="题号" width="180">
    </el-table-column>
    <el-table-column prop="uuid" label="出题人" width="240">
    </el-table-column>
    <el-table-column prop="type" label="类型" width="180">
    </el-table-column>
    <el-table-column prop="title" label="题目" width="360">
    </el-table-column>
    <el-table-column prop="options" label="选项" width="240">
        <ul v-for="(item,index) in options" :key="(item,index)">
            <li>{{item.key}}：{{item.value}}</li>
        </ul>
    </el-table-column>
    <el-table-column prop="result" label="答案" width="240">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="240">
        <template #default="scope">
        <el-button type="text" size="small">
            编辑
        </el-button>
        <el-button @click.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            移除
        </el-button>
        </template>
    </el-table-column>
</el-table>

</template>
<script>
export default {
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1);
        }
        },
        data() {
        return {
            tableData:[],
            options:[]
            }
        },
        async created(){
            this.tableData[0] = this.$route.query
            this.options = JSON.parse(this.tableData[0].options)
            console.log(this.options)
            if(this.tableData[0].uuid == 'vip'){
                this.tableData[0].uuid = '老苏'
            }
            if(this.tableData[0].type==1){
            this.tableData[0].type='单选'
            }else if(this.tableData[0].type==2){
                this.tableData[0].type='多选'
            }else if(this.tableData[0].type==3){
                this.tableData[0].type='简答'
            }
        }
    }
</script>