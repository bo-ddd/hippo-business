<template>
<el-table :data="tableData" height="400" border style="width: 100%">
    <el-table-column fixed prop="id" label="题号" width="80">
    </el-table-column>
    <el-table-column prop="uuid" label="出题人" width="100">
    </el-table-column>
    <el-table-column prop="type" label="类型" width="180">
    </el-table-column>
    <el-table-column label="题目" width="460">
        <div v-html="changeMd(this.tableData[0].title)"></div>
    </el-table-column>
    <el-table-column prop="options" label="选项" width="380">
        <ul v-for="(item,index) in options" :key="(item,index)">
            <li>{{item.key}}：{{item.value}}</li>
        </ul>
    </el-table-column>
    <el-table-column prop="result" label="答案" width="200">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="280">
        <template #default="scope">

            <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-delete">编辑</el-button>

            <el-dialog title="收货地址" v-model="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="题目id">
                        {{form.id}}
                    </el-form-item>
                    <el-form-item label="题类型">
                        <el-select v-model="form.type" placeholder="请选择活动区域">
                            <el-option label="单选题" value="1"></el-option>
                            <el-option label="多选题" value="2"></el-option>
                            <el-option label="简答题" value="3"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="题目">
                        <el-input type="textarea" v-model="form.title"></el-input>
                    </el-form-item>

                    <!-- 单选题 -->
                    <el-form-item v-if="form.type=='1'" label="答案">
                        <el-button type="primary" @click="showInput" plain>添加答案</el-button>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm2" @blur="handleInputConfirm2">
                        </el-input>
                        <div class="answer">
                            <div class="answer-content" :key="(item,index)" v-for="(item,index) in form.options">
                                <el-tag closable :disable-transitions="false" @close="handleClose(index)">
                                    {{item.value}}
                                </el-tag>
                                <el-radio v-model="single" :label=index>正确</el-radio>
                            </div>
                        </div>
                    </el-form-item>

                    <!--多选题  -->
                    <el-form-item v-if="form.type=='2'" label="题目答案" prop="type">
                        <el-button type="primary" @click="showInput" plain>添加答案</el-button>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm2" @blur="handleInputConfirm2">
                        </el-input>
                        <div class="answer">
                            <div class="answer-content" :key="(item,index)" v-for="(item,index) in form.options">
                                <el-tag closable :disable-transitions="false" @close="handleClose(index)">
                                    {{item.value}}
                                </el-tag>
                                <el-checkbox @click="answer(item.key,index)" label=""></el-checkbox>
                            </div>
                        </div>
                    </el-form-item>

                    <!-- 简答 -->
                    <el-form-item v-else-if="form.type=='3'" label="题目答案" prop="type">
                        <el-checkbox-group v-model="form.type">
                            <el-tag closable :disable-transitions="false" @close="handleClose2()">
                                {{form.result}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="form.result" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">答案</el-button>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="活动性质">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">确认修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </span>
                </template>
            </el-dialog>

            <el-button @click.prevent="deleteRow(scope.$index, tableData)" type="primary" icon="el-icon-delete">
                移除
            </el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
import MarkdownIt from "markdown-it";
let md = MarkdownIt();
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            tableData: [],
            options: [],
            dialogFormVisible: false,
            inputVisible: false,
            falg: true,
            // tableData: [],
            dynamicTag: '',
            arr: [],
            option: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            single: '',
            result: [],
            listData: [],
            form: {
                id: '',
                type: '',
                title: '',
                options: [],
                result: '',
                categoryId: 0
            },
        }
    },
    methods: {
        ...mapActions(['topiclist']),
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        changeMd(val) {
            // return md.renderInline(val);
            return md.render(val);
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
                    key: this.option[this.form.options.length],
                    value: inputValue
                }
                this.form.options.push(josn);
            }
            this.inputVisible = false;
            this.dynamicTag = '';
        },
        handleInputConfirm() {
            let inputValue = this.dynamicTag;
            if (inputValue) {
                this.form.result += inputValue;
            }
            this.inputVisible = false;
        },
        handleClose(index) {
            this.form.options.splice(index, 1);
            this.dynamicTag = ''
        },
        handleClose2() {
            this.form.result = ''
        },
        answer(key, index) {
            if (this.arr.indexOf(key) == -1) {
                this.arr.push(this.option[index])
            }
            this.form.result = this.arr.join()
            this.form.result.trim()
        },
        async submitForm() {
            if (this.single.length != 0) {
                this.form.result = this.option[this.single]
            }
            if (this.form.type != 3 && (this.form.options.length < 2)) {
                console.log('选择题答案不得低于两个')
            } else if (this.form.type == 2 && (this.form.result.split(',').length < 2)) {
                console.log('多选题答案不得小于两个')
            } else if (this.form.title == '') {
                console.log('请输入题目')
            } else if (this.form.result == '') {
                console.log('请填写答案')
            } else if (this.form.categoryId == 0) {
                console.log('请选择题目类型')
            } else if (this.form.type == '') {
                console.log('请选择该题类型')
            } else {
                if (this.form.type == '1') {
                    this.form.title = '[单选题]' + this.form.title;
                } else if (this.form.type == '2') {
                    this.form.title = '[多选题]' + this.form.title;
                } else if (this.form.type == '3') {
                    this.form.title = '[简答题]' + this.form.title;
                }
            }
        },
    },
    async created() {
        this.tableData[0] = this.$route.query
        this.options = JSON.parse(this.tableData[0].options)
        this.form.id = this.tableData[0].id
        this.form.type = this.tableData[0].type
        this.form.title = this.tableData[0].title.substring(5)
        this.form.options = JSON.parse(this.tableData[0].options)
        this.form.result = this.tableData[0].result
        this.form.categoryId = this.tableData[0].categoryId
        console.log(this.form.options)
        // console.log(this.tableData[0])
        if (this.tableData[0].uuid == 'vip') {
            this.tableData[0].uuid = '老苏'
        }
        if (this.tableData[0].type == 1) {
            this.tableData[0].type = '单选'
        } else if (this.tableData[0].type == 2) {
            this.tableData[0].type = '多选'
        } else if (this.tableData[0].type == 3) {
            this.tableData[0].type = '简答'
        }
    }
}
</script>
