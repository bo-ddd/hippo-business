<template>
<div class="wrap">
    <div class="user">
        <!-- 用户列表搜索 -->
        <div class="indexInput">
            <el-select class="select" v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-input class="input" placeholder="请输入查询内容" prefix-icon="el-icon-search" v-model="input">
            </el-input>
            <el-button type="primary" @click="search(value)">搜索</el-button>
        </div>

        <!-- 用户列表表格 -->
        <el-table :data="usersListArr" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" width="70px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="avatorName" label="昵称" width="120px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="50px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="电话" width="120px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="mail" label="邮箱" width="180px" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="desc" label="备注" width="180" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="identity" label="角色编号" width="100px" align="center" header-align="center">
            </el-table-column>
            <el-table-column label="角色分配" width="180" align="center" header-align="center" #default="scope">
                <a class="updateClass" @click="updateRole(scope.row)">更改角色</a>
                <el-dialog title="现有角色类目" v-model="dialogVisible2" width="60%" :before-close="handleClose" :modal="false">
                            <el-radio-group v-model="radio" v-for="(item) in RoleListArr" :key="item.id">
                                <el-radio class="roleRadio" v-model="radio" :label="item.id" @click="checkRole(item.id)">{{item.name}}</el-radio>
                            </el-radio-group>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </el-table-column>
            <el-table-column prop="classId" label="班级编号" width="100px" align="center" header-align="center">
            </el-table-column>
            <el-table-column label="班级分配" width="180" align="center" header-align="center" #default="scope">
                <a class="updateClass" @click="updateClass(scope.row)">更改班级</a>
                <el-dialog title="现有班级类目" v-model="dialogVisible" width="60%" :before-close="handleClose" :modal="false">
                            <el-radio-group v-model="radio" v-for="(item) in classListArr" :key="item.id">
                                <el-radio class="classRadio"  :label="item.id" @click="check(item.id)">{{item.name}}</el-radio>
                            </el-radio-group>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:current-page.sync="nowPage" :page-size="pageSize" layout="sizes, prev, pager, next" :page-count="countPage" :page-sizes="[2,3,4,5,10]">
        </el-pagination>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    data() {
        return {
            avatorName:'',
            classId: 0,
            userId:0,
            username: '',
            identity:0,
            usersListArr: [],
            nowPage: 1,
            countPage: 1,
            pageSize: 10,
            dialogVisible: false,
            dialogVisible2: false,
            RoleListArr:[],
            classListArr: [],
            radio: 0,
            input: '',
            options: [{
                value: '选项1',
                label: '按用户ID查询'
            }, {
                value: '选项2',
                label: '按用户名查询'
            }, {
                value: '选项3',
                label: '按昵称查询'
            }, {
                value: '选项4',
                label: '按班级编号查询'
            }, {
                value: '选项5',
                label: '按角色编号查询'
            }, {
                value: '选项6',
                label: '全部'
            }],
            value: ''
        };
    },
    methods: {
        ...mapActions(["usersList","getRole", "getClassList", "updateUser"]),
        search(value){    
            if(value=='选项1'){
                this.userId=this.input;
                this.getList();
            }else if(value=='选项2'){
                this.username=this.input;
                this.getList();
            }else if(value=='选项3'){
                this.avatorName=this.input;
                this.getList();
            }else if(value=='选项4'){
                this.classId=this.input;
                this.getList();
            }else if(value=='选项5'){
                this.identity=this.input;
                this.getList();
            }else if(value=='选项6'){
                this.userId=0;
                this.username='';
                this.avatorName='';
                this.classId=0;
                this.identity=0;
                this.input='';
                this.getList();
            }else{
                this.$alert('请先选择搜索条目!', '提示', {
                    confirmButtonText: '确定',
                });
            }    

        },
        handleCurrentChange(val) {
            this.nowPage = val;
            this.getList();
            // console.log(`当前页: ${val}`);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        updateClass(arr) {
            this.dialogVisible = true;
            this.userId = arr.userId;
            this.gradeShow = false
        },
        async check(id) {
            let res = await this.updateUser({
                userId: this.userId,
                classId: id
            })
            console.log(res);
            this.getList();
            this.gradeShow = true
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(function () {
                    done();
                })
                .catch(function () {});
        },
        updateRole(arr) {
            this.dialogVisible2 = true;
            this.userId = arr.userId;
            this.radio=arr.identity;
        },
        async checkRole(id) {
            let res = await this.updateUser({
                userId: this.userId,
                identity: id
            })
            console.log(res);
            this.getList();
            this.gradeShow = true
        },
        async getList() {
            let usersList = await this.usersList({
                // uuid:'vip',
                userId:this.userId,
                username: this.username,
                avatorName: this.avatorName,
                classId: this.classId,
                identity:this.identity,
                pageNum: this.nowPage,
                pageSize: this.pageSize
            });
            console.log(usersList.data);
            this.usersListArr = usersList.data.rows;
            this.countPage = usersList.data.countPage;
            this.usersListArr.forEach(item => {
                if (item.sex == 1) {
                    item.sex = "男"
                } else {
                    item.sex = "女"
                }
            })
        },
        async getClass() {
            let classList = await this.getClassList({

            });
            console.log(classList.data);
            this.classListArr = classList.data.rows
        },
         async getRoles() {
            let RoleList = await this.getRole({
                pageSize:100
            });
            console.log(RoleList.data);
            this.RoleListArr = RoleList.data.rows;
        },
    },
    created() {
        this.getList();
        this.getClass();
        this.getRoles();
    },
};
</script>

<style lang="less" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .user {
        & .select {
            width: 230px;
        }

        & .indexInput {
            width: 600px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        & .updateClass {
            color: rgb(62, 62, 143);
            text-decoration: underline;
            cursor: pointer;
        }
    }

    & .grade {
        
        & .roleRadio{
             margin-left: 30px;
        }
        & .classRadio {
            margin-right: 30px;
        }

    }
}
</style>
