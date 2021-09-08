<template>
<div>
    <el-tabs type="border-card">
        <el-tab-pane v-for="(item,index) in classList" :key="(item,index)" :label="item.name" :row-class-name="rowClassName">
            <div class="title">
                <el-table :data="item.children.rows" border style="width: 100%">
                    <el-table-column fixed prop="classId" label="班级id" width="150">
                    </el-table-column>
                    <el-table-column prop="userId" label="用户id" width="120">
                    </el-table-column>
                    <el-table-column prop="uuid" label="用户名" width="320">
                    </el-table-column>
                    <el-table-column prop="avatorName" label="昵称" width="120">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="phoneNumber" label="电话号" width="120">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" width="120">
                    </el-table-column>
                    <el-table-column prop="mail" label="邮箱" width="220">
                    </el-table-column>
                    <el-table-column prop="identity" label="身份" width="220">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template #default="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>

        </el-tab-pane>

    </el-tabs>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            classList: [],
            childrenList: []
        }
    },
    methods: {
        ...mapActions(['getClassList']),

        async getclass() {
            let claList = await this.getClassList()
            this.classList = claList.data.rows
            console.log(this.classList)
        }
    },
    async created() {
        this.getclass()
    }
}
</script>

<style>
.el-table .cell {
    text-align: center;
}
</style>
