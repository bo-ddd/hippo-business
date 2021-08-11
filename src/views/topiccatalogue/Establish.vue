<template>
<div>
    <el-row>
        <el-col :span="12">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="题目名称" prop="data.title">
                    <el-input type="textarea" autosize v-model="data.title"></el-input>
                </el-form-item>
                <el-form-item label="所属类目" prop="data.categoryId">
                    <el-button type="primary" @click="categorIdget(3)" plain>js</el-button>
                    <el-button type="primary" @click="categorIdget(2)" plain>css</el-button>
                    <el-button type="primary" @click="categorIdget(1)" plain>html</el-button>
                    <el-button type="primary" @click="categorIdget(4)" plain>vue</el-button>
                </el-form-item>
                <el-form-item label="题目类型">
                    <el-select v-model="data.type" placeholder="请选择题目类型">
                        <el-option label="单选" value="danxuan" @click="questiontype(true)"></el-option>
                        <el-option label="多选" value="duoxuan" @click="questiontype(true)"></el-option>
                        <el-option label="简答题" value="jianda" @click="questiontype(false)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="falg" label="题目答案" prop="type">
                    <el-button type="primary" @click="showInput" plain>添加答案</el-button>
                    <el-tag :key="tag" v-for="tag in data.options" closable :disable-transitions="false" @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                </el-form-item>
                <el-form-item v-else label="题目答案" prop="type">
                    <el-checkbox-group v-model="data.type">
                        <el-tag :key="tag" v-for="tag in data.options" closable :disable-transitions="false" @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('data')">提交</el-button>
                    <el-button @click="resetForm('data')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12">
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            data: {
                type: '',
                title: '',
                options: [],
                result: "",
                categoryId: 0
            },
            inputVisible: false,
            falg: true,
            tableData: [],
            dynamicTag: '',
        };
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClose(tag) {
            this.data.options.splice(this.data.options.indexOf(tag), 1);
            this.dynamicTag = ''
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.dynamicTag;
            if (inputValue) {
                this.data.options.shift();
                this.data.options.push(inputValue);
            }
            this.inputVisible = false;
        },
        questiontype(flag) {
            this.falg = flag
        },
        categorIdget(index) {
            this.data.categoryId == index
        }
    }

}
</script>

<style>

</style>
