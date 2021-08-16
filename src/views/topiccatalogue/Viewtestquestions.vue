<template>
<el-button type="primary" icon="el-icon-arrow-left" @click="backPage">返回列表</el-button>
<el-table :data="tableData" max-height="400" style="width: 100%">
    <el-table-column fixed prop="id" label="题号" width="80">
    </el-table-column>
    <el-table-column fixed prop="categoryId" label="所属类目" width="80">
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
        <template #default="scope" class="operation">

            <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-delete">编辑</el-button>

            <el-dialog title="修改信息" v-model="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="题目id">
                        {{form.id}}
                    </el-form-item>

                    <el-form-item label="所属类目">
                        <div class="listData-content">
                            <div class="list-content" v-for="(item,index) in listData" :key="(item,index)">
                                <el-tag :class="{active: currentIndex === index}" plain @click="changeColor(index,item.id)" type="button" style="cursor:pointer;">{{item.key}}</el-tag>
                            </div>
                        </div>
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
                        <el-button type="primary" @click="showInput2" plain>修改答案</el-button>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="dynamicTag" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm2" @blur="handleInputConfirm2">
                        </el-input>

                        <div class="answer">
                            <div class="answer-content" :key="(item,index)" v-for="(item,index) in form.options">

                                <div>
                                    <input v-model="item.value" :type="zhuangtai" :class="[zhuangtai=='button'?'icon-button':'icon-input']" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                                </div>

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
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">确认修改</el-button>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </span>
                </template>
            </el-dialog>

            <el-button @click="deleteRow(scope.$index,form)" type="primary" icon="el-icon-delete">
                移除
            </el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
import MarkdownIt from "markdown-it";
let md = MarkdownIt();
import {
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            tableData: [],
            options: [],
            dialogFormVisible: false,
            inputVisible: false,
            falg: true,
            dynamicTag: '',
            arr: [],
            option: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            single: '',
            result: [],
            listData: [],
            currentIndex: 0,
            zhuangtai: 'button',
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
        ...mapActions(['updateTopic', 'getCategoryList', 'deleteTopic']),
        async deleteRow(index, rows) {
            // rows.splice(index, 1);
            console.log(index)
            console.log(rows)
            let del = await this.deleteTopic({
                id: rows.id
            })
            if (del.status == 1) {
                this.$router.go(-1)
            }
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
        showInput2(index) {
            this.zhuangtai = 'text';
            console.log(this.zhuangtai)
            console.log(index)
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
            this.zhuangtai = "button"
        },
        handleClose(index) {
            this.form.options.splice(index, 1);
            this.dynamicTag = ''
        },
        handleClose2() {
            this.form.result = ''
        },
        changeColor(index, id) {
            this.currentIndex = index
            this.form.categoryId = id
            console.log(this.form.categoryId)
            console.log(index)
        },
        backPage() {
            this.$router.go(-1)
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
                if ((this.tableData[0].categoryId).toLowerCase() == 'html') {
                    this.tableData[0].categoryId = '1'
                } else if ((this.tableData[0].categoryId).toLowerCase() == 'css') {
                    this.tableData[0].categoryId = '2'
                } else if ((this.tableData[0].categoryId).toLowerCase() == 'js') {
                    this.tableData[0].categoryId = '3'
                } else if ((this.tableData[0].categoryId).toLowerCase() == 'vue') {
                    this.tableData[0].categoryId = '4'
                }
                let list = await this.updateTopic(this.form);
                if (list.status == 1) {
                    this.$options.methods.created()
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
        console.log(this.tableData[0])
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
        let res = await this.getCategoryList({
            type: "1"
        })
        this.listData = res.data
        console.log(this.listData)
    }
}
</script>

<style>
.el-table .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

li {
    list-style: none;
}

.listData-content {
    display: flex;
    align-items: center;
    /* flex-wrap: wrap; */
    justify-content: space-around;
}

.active {
    cursor: pointer;
    background: #409eff;
    color: #fff;
}

.icon-button {
    padding: 5px;
    border: none;
    background: #ff40898e;
}

.icon-input {
    display: inline-block;
    width: 300px;
    height: 50px;
    padding: 5px;
}

.answer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    flex-wrap: wrap;
}

.el-tag {
    width: 80px;
    background-color: #ecf5ff;
    border-color: #d9ecff;
    color: #409eff;
    display: inline-block;
    height: 28px;
    padding: var(--el-tag-padding);
    line-height: 30px;
    font-size: var(--el-tag-font-size);
    color: #409eff;
    border-width: 1px;
    border-style: solid;
    border-radius: var(--el-tag-border-radius);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
    text-align: center;
    line-height: 28px;
}
</style>
