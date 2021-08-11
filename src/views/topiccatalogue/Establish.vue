<template>
<div>
    <el-row>
        <el-col :span="12">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="题目名称" prop="data.title">
                    <el-input type="textarea" autosize v-model="data.title"></el-input>
                </el-form-item>
                <el-form-item label="所属类目" prop="data.categoryId">
                    <el-radio v-model="data.categoryId" :label=1>html</el-radio>
                    <el-radio v-model="data.categoryId" :label=2>css</el-radio>
                    <el-radio v-model="data.categoryId" :label=3>js</el-radio>
                    <el-radio v-model="data.categoryId" :label=4>vue</el-radio>
                </el-form-item>
                <el-form-item label="题目类型">
                    <el-select v-model="data.type" placeholder="请选择题目类型">
                        <el-option label="单选" @click="choice()" value="1"></el-option>
                        <el-option label="多选" @click="choice()" value="2"></el-option>
                        <el-option label="简答题" @click="choice()" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item v-if="data.type==1" label="题目答案" prop="type">
                    <el-button type="primary" @click="showInput" plain>添加答案</el-button>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm2" @blur="handleInputConfirm2">
                    </el-input>
                    <div class="answer">
                        <div class="answer-content" :key="(tag,index)" v-for="(tag,index) in data.options">
                            <el-tag closable :disable-transitions="false" @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-radio v-model="data.result" :label=index>正确</el-radio>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item v-if="data.type==2" label="题目答案" prop="type">
                    <el-button type="primary" @click="showInput" plain>添加答案</el-button>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm2" @blur="handleInputConfirm2">
                    </el-input>
                    <div class="answer">
                        <div class="answer-content" :key="(tag,index)" v-for="(tag,index) in data.options">
                            <el-tag closable :disable-transitions="false" @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-checkbox @click="answer(index)" label=""></el-checkbox>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item v-else-if="data.type==3" label="题目答案" prop="type">
                    <el-checkbox-group v-model="data.type">
                        <el-tag :key="tag" v-for="tag in data.options" closable :disable-transitions="false" @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">answer</el-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
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
import {
    mapActions
} from "vuex";
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
            arr: [],
        };
    },
    methods: {
        ...mapActions(["create"]),
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        async submitForm() {
            console.log(this.data);
            console.log(this.arr)
            if (this.data.type != 3 && (this.data.options.length < 2)) {
                console.log('选择题答案不得低于两个')
            } else if (this.data.type == 2 && (this.data.result.split(',').length < 2)) {
                console.log('多选题答案不得小于两个')
            } else {
                let list = await this.create(this.data);
                console.log(list)
            }
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

        handleInputConfirm2() {
            let inputValue = this.dynamicTag;
            if (inputValue) {
                this.data.options.push(inputValue);
            }
            this.inputVisible = false;
            this.dynamicTag = '';

        },
        categorIdget(index) {
            this.data.categoryId = index;

        },
        answer(index) {
            if (this.arr.indexOf(index) == -1) {
                this.arr.push(index)
            }
            this.data.result = this.arr.join()
            this.data.result.trim()
            // console.log(arr)
            // this.data.result += index
            // console.log(this.result)
        },
        choice() {
            this.data.options = []
        }
    }

}
</script>

<style>
.answer {
    display: flex;
}

.answer-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10px;
}
</style>
