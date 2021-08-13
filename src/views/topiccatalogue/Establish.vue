<template>
<div class="wrap">
    <el-row>
        <el-col :span="12">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="题目名称" prop="data.title">
                    <el-input type="textarea" :rows="10" v-model="data.title"></el-input>
                </el-form-item>
                <el-form-item label="所属类目" prop="data.categoryId">
                    <div class="listData-content">
                        <div class="list-content" v-for="item in listData" :key="item">
                            <el-radio v-model="data.categoryId" :label=item.id>{{item.key}}</el-radio>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="题目类型">
                    <el-select v-model="data.type" placeholder="请选择题目类型">
                        <el-option label="单选" @click="choice()" value="1"></el-option>
                        <el-option label="多选" @click="choice()" value="2"></el-option>
                        <el-option label="简答题" @click="choice()" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 单选 -->
                <el-form-item v-if="data.type==1" label="题目答案" prop="type">
                    <el-button type="primary" @click="showInput" plain>添加答案</el-button>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm2" @blur="handleInputConfirm2">
                    </el-input>
                    <div class="answer">
                        <div class="answer-content" :key="(item,index)" v-for="(item,index) in data.options">
                            <el-tag closable :disable-transitions="false" @close="handleClose(index)">
                                {{item.value}}
                            </el-tag>
                            <el-radio v-model="single" :label=index>正确</el-radio>
                        </div>
                    </div>
                </el-form-item>

                <!-- 多选 -->
                <el-form-item v-if="data.type==2" label="题目答案" prop="type">
                    <el-button type="primary" @click="showInput" plain>添加答案</el-button>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm2" @blur="handleInputConfirm2">
                    </el-input>
                    <div class="answer">
                        <div class="answer-content" :key="(item,index)" v-for="(item,index) in data.options">
                            <el-tag closable :disable-transitions="false" @close="handleClose(index)">
                                {{item.value}}
                            </el-tag>
                            <el-checkbox @click="answer(item.key,index)" label=""></el-checkbox>
                        </div>
                    </div>
                </el-form-item>

                <!-- 简答 -->
                <el-form-item v-else-if="data.type==3" label="题目答案" prop="type">
                    <el-checkbox-group v-model="data.type">
                        <el-tag closable :disable-transitions="false" @close="handleClose2()">
                            {{data.result}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="data.result" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">答案</el-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="1">
        </el-col>
        <el-col class="md-border" :span="11">
            <el-empty v-if="formathtml==''" image="https://inews.gtimg.com/newsapp_bt/0/13684665753/641" description="题目样式" :image-size="500"></el-empty>
            <div v-else v-html="formathtml"></div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import MarkdownIt from "markdown-it";
let md = MarkdownIt();
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
            option: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            single: '',
            result: [],
            listData: []
        };
    },
    methods: {
        ...mapActions(["createTopic", 'getCategoryList']),

        deleteRow(index, rows) {
            rows.splice(index, 1);
        },

        async submitForm() {
            if (this.single.length != 0) {
                this.data.result = this.option[this.single]
                console.log(this.data.result)
            }
            if (this.data.type != 3 && (this.data.options.length < 2)) {
                console.log('选择题答案不得低于两个')
            } else if (this.data.type == 2 && (this.data.result.split(',').length < 2)) {
                console.log('多选题答案不得小于两个')
            } else if (this.data.title == '') {
                console.log('请输入题目')
            } else if (this.data.result == '') {
                console.log('请填写答案')
            } else if (this.data.categoryId == 0) {
                console.log('请选择题目类型')
            } else if (this.data.type == '') {
                console.log('请选择该题类型')
            } else {
                if (this.data.type == '1') {
                    this.data.title = '[单选题]' + this.data.title;
                } else if (this.data.type == '2') {
                    this.data.title = '[多选题]' + this.data.title;
                } else if (this.data.type == '3') {
                    this.data.title = '[简答题]' + this.data.title;
                }

                console.log(this.data)
                let list = await this.createTopic(this.data);
                this.data = {
                    type: '',
                    title: '',
                    options: [],
                    result: "",
                    categoryId: 0
                };
                console.log(list);
            }
        },

        handleClose(index) {
            this.data.options.splice(index, 1);
            this.dynamicTag = ''
        },

        handleClose2() {
            this.data.result = ''
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm2() {
            let inputValue = this.dynamicTag;
            if (inputValue) {
                let josn = {
                    key: this.option[this.data.options.length],
                    value: inputValue
                }
                this.data.options.push(josn);
            }
            this.inputVisible = false;
            this.dynamicTag = '';
        },

        handleInputConfirm() {
            let inputValue = this.dynamicTag;
            if (inputValue) {
                this.data.result += inputValue;
            }
            this.inputVisible = false;
        },

        categorIdget(index) {
            this.data.categoryId = index;

        },

        answer(key, index) {
            if (this.arr.indexOf(key) == -1) {
                this.arr.push(this.option[index])
            }
            this.data.result = this.arr.join()
            this.data.result.trim()
        },

        choice() {
            this.data.options = [];
            this.data.result = '';
            this.dynamicTag = ''
        }
    },
    computed: {
        formathtml() {
            return md.render(this.data.title);
        }
    },
    async created() {
        let res = await this.getCategoryList({
            type: "1"
        })
        this.listData = res.data
        console.log(this.listData)
    }

}
</script>

<style>
.wrap{
    min-width: 1150px;
}
.answer {
    display: flex;
    flex-wrap: wrap;
}

.answer-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10px;
}

.md-border {
    border: 1px solid #b1d1f7;
}

.listData-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
}

.el-radio__label {
    font-size: var(--el-radio-font-size);
    padding-left: 5px;
}
</style>
