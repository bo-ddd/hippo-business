<template>
<div class="wrap">

    <el-space wrap>
        <el-card class="box-card" style="width: 80vw">
            <template #header>
                <div class="card-header">
                    <span>现有角色类目:</span>
                </div>
            </template>
            <el-tag class="currentRole-item" v-for="item in rolesArr" :key="item" type="success">{{item}}</el-tag>
        </el-card>
    </el-space>

    <div class="operate">
        <el-space wrap>
            <el-card class="box-card" style="width: 80vw">
                <template #header>
                    <div class="card-header">
                        <span>管理角色(点击红色字体时更改角色):</span>
                    </div>
                </template>
                <div class="changeRole">
                    <div class="updateRole">
                        <el-input class="input-new-tag" v-if="roleShow" v-model="inputValue" ref="tag" size="small" @blur="updateConfirm" @keyup.enter="handleEnter">
                        </el-input>
                        <el-tag v-else type="danger" :key="tag" v-for="(tag,index) in rolesArr" closable :disable-transitions="false" @close="handleClose(tag)" @click="update(index)">
                            {{tag}}
                        </el-tag>
                    </div>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter="handleEnter" @blur="handleInputConfirm">
                    </el-input>
                    <el-button type="success" v-else class="button-new-tag" size="small" @click="showInput">新增角色</el-button>
                </div>
            </el-card>
        </el-space>
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
            RoleListArr:[],
            rolesArr: [],
            inputVisible: false,
            inputValue: '',
            roleShow: false,
            currentTagIndex: 0,
            roleId:100,
        }
    },
    methods: {
        ...mapActions(["getRole","createRole","updateRole","deleteRole"]),
        handleClose(tag) {
            this.rolesArr.splice(this.rolesArr.indexOf(tag), 1);
            this.RoleListArr.forEach(item=>{
                if(item.name==tag){
                    this.roleId=item.id;
                    this.deleteRoles();
                }
            })
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(function () {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleEnter(e) {
            e.target.blur()
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                if (this.rolesArr.includes(inputValue)) {
                    this.$alert('已有该角色,请勿重复添加!', '新增提示', {
                        confirmButtonText: '确定',
                    });
                } else {
                    this.rolesArr.push(inputValue);
                    this.createRoles();
                }
            } else {
                this.$alert('角色不能为空!', '新增提示', {
                    confirmButtonText: '确定',
                });
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        update(index) {
            this.currentTagIndex = index;
            this.roleShow = true;
            this.$nextTick(function () {
                this.$refs.tag.$refs.input.focus();
            });
        },
        updateConfirm() {
            let inputValue = this.inputValue;
            if (!inputValue) {
                this.$alert('角色不能为空!', '更改提示', {
                    confirmButtonText: '确定',
                });
            } else if (this.rolesArr.includes(inputValue)) {
                this.$alert('已有该角色,更改失败!', '更改提示', {
                    confirmButtonText: '确定',
                });
            } else {
                let index = this.currentTagIndex;
                this.rolesArr[index] = this.inputValue;
                this.$alert('更改角色成功!', '更改提示', {
                    confirmButtonText: '确定',
                });
                this.RoleListArr.forEach(item=>{
                if(item.name==this.inputValue){
                    this.roleId=item.id;
                    this.deleteRoles();
                }
            })
                this.updateRoles();
            }
            this.roleShow = false;
            this.inputValue = '';
        },
        async getRoles() {
            let RoleList = await this.getRole({

            });
            console.log(RoleList);
            this.RoleListArr=RoleList.data.rows;
            RoleList.data.rows.forEach(item => {
                this.rolesArr.push(item.name)
            });
        },
        async createRoles() {
           let RoleList = await this.createRole({
               name:this.inputValue
            });
            console.log(RoleList);
        },
        async updateRoles() {
           let RoleList = await this.updateRole({
               id:this.roleId,
               name:this.inputValue
            });
            console.log(RoleList);
        },
        async deleteRoles() {
           let RoleList = await this.deleteRole({
               id:this.roleId
            });
            console.log(RoleList);
        }
    },
    created() {
        this.getRoles();
    },
}
</script>

<style lang="less" scoped>
.wrap {
    height: 100vh;
    display: flex;
    flex-direction: column;

    & .currentRole {
        display: flex;

    }

    & .currentRole-item {
        margin-left: 10px;
        margin-bottom: 10px;
    }

    & .operate {
        margin-top: 10px;
        margin-bottom: 10px;

        & .changeRole {
            display: flex;
        }

        & .create-input {
            margin-right: 10px;
        }

        & .el-tag+.el-tag {
            margin-left: 10px;
            margin-bottom: 10px;
        }

        & .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }

        & .input-new-tag {
            width: 80px;
            margin-left: 10px;
            vertical-align: bottom;
        }
    }
}
</style>
