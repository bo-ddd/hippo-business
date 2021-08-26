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
        <el-row>
            <el-input class="input-new-tag create-input" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button type="success" v-else class="button-new-tag" @click="showInput">新增角色</el-button>
            <el-button type="info" plain>更改角色</el-button>
            <el-button type="danger" @click="del">删除角色</el-button>
        </el-row>
    </div>

    <!-- <div class="operate">
        <el-tag type="danger" :key="tag" v-for="tag in rolesArr" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button type="success" v-else class="button-new-tag" size="small" @click="showInput">新增角色</el-button>
    </div> -->

    <div class="del" v-if="delShow">
        <el-space wrap>
            <el-card class="box-card" style="width: 80vw">
                <template #header>
                    <div class="card-header">
                        <span>删除角色:</span>
                    </div>
                </template>
                <el-tag class="create-input" type="danger" :key="tag" v-for="tag in rolesArr" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
        </el-tag>
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
            rolesArr: [],
            delShow: false,
            inputVisible: false,
            inputValue: '',
        }
    },
    methods: {
        ...mapActions(["createRole"]),
        del() {
            this.delShow = true
        },
        handleClose(tag) {
            this.rolesArr.splice(this.rolesArr.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(function () {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.rolesArr.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    },
    async created() {
        let createRole = await this.createRole({

        });
        console.log(createRole);
        createRole.rows.forEach(item => {
            this.rolesArr.push(item.name)
        });

        console.log(this.rolesArr);
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
    }

    & .operate {
        margin-top: 10px;
        margin-bottom: 10px;
        & .create-input{
            margin-right: 10px;
        }

        & .el-tag+.el-tag {
            margin-left: 10px;
        }

        & .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }

        & .input-new-tag {
            width: 100px;
            margin-left: 10px;
            vertical-align: bottom;
        }
    }
}
</style>
