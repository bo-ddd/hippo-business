<template>
<div class="wrap">
    <div class="table">
        <el-table ref="multipleTable" :data="messageList" border="true" stripe="true" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="55">
            </el-table-column>
            <el-table-column prop="createdAt" label="时间" width="150">
            </el-table-column>
            <el-table-column prop="" label="面向群体" width="120">
            </el-table-column>
            <el-table-column prop="postMessage" label="内容"> </el-table-column>
            <el-table-column label="操作" width="200" #default="scope">
                <el-button type="primary" icon="el-icon-delete" @click="deleteNew(scope.row.id)">撤销</el-button>
            </el-table-column>
        </el-table>
        <el-empty description="暂无信息" v-if="emptybool"></el-empty>
    </div>
    <div class="footer">
        <el-pagination background layout="prev, pager, next" :total="10" page-size="10">
        </el-pagination>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            messageList: [],
            emptybool: false,
        }
    },
    methods: {
        ...mapActions(['getMessageList','deleteMessage']),
        transformTimestamp(timestamp) {
            let a = new Date(timestamp).getTime();
            const date = new Date(a);
            const Y = date.getFullYear() + '-';
            const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
            const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            const dateString = Y + M + D + h + m;
            return dateString;
        },
        async deleteNew(id){
          let res = await this.deleteMessage({
            id:id
          })
          location. reload()
          console.log(res);
        },

    },
    async created() {
        let res = await this.getMessageList({
            type: 2
        })
        this.messageList = res.data.rows
        this.messageList.forEach(item => {
            let sendTime = item.createdAt
            item.createdAt = this.transformTimestamp(sendTime)
        })
        console.log(this.messageList);
        if (this.messageList == 0) {
            this.emptybool = true
        }
    },
}
</script>

<style>
.table {
    margin-top: 20px;
}
</style>
