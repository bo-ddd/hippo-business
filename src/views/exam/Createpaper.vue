<template>
<div class="wrap">
    <div class="wrap_content">
        <div class="className"><b>选择您的班级:</b></div>
        <div class="class_content">
            <el-tag v-for="(item,index) in classlist" :key="item" :class="{active : nowIndex === index}" plain @click="changeClass(index,item.id,item.name)" type="button" style="cursor:pointer;">
                {{item.name}}
            </el-tag>

        </div>

        <div class="testpap_title"><b>请选择试卷类型:</b></div>
        <div class="testpap_content">
            <el-tag v-for="(item,index) in categoryList" :key="item" :class="{active : currentIndex === index}" plain @click="changeColor(index,item.id, item.key)" type="button" style="cursor:pointer;">
                {{item.key}}
            </el-tag>
        </div>
        <div class="testNum"><b>选择试题数量</b></div>
        <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <div class="block">
            <el-config-provider :locale="locale">
                <div class="demonstration"><b>选择考试起止日期：</b></div>
                <el-date-picker v-model="value2" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="defaultTime2">
                </el-date-picker>
            </el-config-provider>

        </div>
        <div class="getTestpap">
            <el-button size="medium" type="primary" round @click="getTestPage">生成试题</el-button>
        </div>

    </div>
</div>
</template>

<script>
import {
    ElConfigProvider
} from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import {
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            classlist: [],
            categoryList: [],
            ifAuth: false,
            currentIndex: 0,
            nowIndex: 0,
            categoryId: '',
            classId: '',
            end: '',
            start: '',
            value1: '',
            value2: '',
            startTime: '',
            endTime: '',
            uusID: [],
            className:'',
            categoryName:'',
            defaultTime1: [
                new Date(2000, 1, 1, 12, 0, 0),
            ], // '12:00:00'
            defaultTime2: [
                new Date(2000, 1, 1, 12, 0, 0),
                new Date(2000, 2, 1, 8, 0, 0)
            ],
            options: [{
                value: '5',
                label: '5道题'
            }, {
                value: '10',
                label: '10道题'
            }, {
                value: '20',
                label: '20道题'
            }, {
                value: '30',
                label: '30道题'
            }, {
                value: '40',
                label: '40道题'
            }, {
                value: '50',
                label: '50道题'
            }],
            value: ''
        }
    },
    components: {
        ElConfigProvider,
    },
    setup() {
        return {
            locale: zhCn,
        }
    },
    methods: {
        ...mapActions(['getCategoryList', 'getClassList', 'createExam', 'sendMessage']),
        changeColor(index, id, name) {
            this.currentIndex = index
            this.categoryList.categoryId = id
            this.categoryList.categoryName = name
            this.categoryId = this.categoryList.categoryId
            this.categoryName = this.categoryList.categoryName
            console.log(this.categoryId);
            console.log(this.categoryName);
        },
        changeClass(index, id, name) {
            this.nowIndex = index
            this.classlist.id = id
            this.classlist.name = name
            this.classId = this.classlist.id
            this.className = this.classlist.name
            console.log(this.className);
            
            /**
             * 添加考试学员
             */
            this.uusID = []
            let uuids = []
            this.classlist.forEach((item)=>{
                uuids.push(item.children.rows)
            })
            console.log(uuids);
            console.log(Array.from(uuids[this.nowIndex]).length);
            if(Array.from(uuids[this.nowIndex]).length){
                uuids[this.nowIndex].forEach((ele)=>{
                    this.uusID.push(ele.uuid)
                })
            }else{
                alert('本班还没有学生')
            }

            console.log('--------');
            console.log(this.uusID);
        },
        async getTestPage() {
            console.log(this.categoryId);
            let day1 = new Date(this.value2[0]);
            let day2 = new Date(this.value2[1])
            this.startTime = day1.getTime()
            this.endTime = day2.getTime()

            let res = await this.createExam({
                classId: this.classId,
                className:this.className,
                categoryId: this.categoryId,
                categoryName: this.categoryName,
                startTime: this.startTime,
                endTime: this.endTime,
                count: this.value
            })
            let newMessage ='您所在的班级'+ this.classId+',将于'+this.startTime+'开始考试,请准时参加'
            console.log(newMessage);
            let message = await this.sendMessage({
                toUserId: this.uusID,
                postMessage: '考试测试'
            })
            // console.log('--------');
            // console.log(uuids);
            
            // console.log('--------');
            console.log(res);
            console.log('--------');
            console.log(message);
            // console.log('--------');
            // console.log(this.categoryId);
        },
        async getCategory() {
            let res = await this.getCategoryList({
                type: '1'
            })
            this.categoryList = res.data
            console.log(this.categoryList);
        },
        async getClass() {
            let claList = await this.getClassList()
            this.classlist = claList.data.rows
            console.log(this.classlist)
        }
    },
    async created() {
        this.getCategory();
        this.getClass();
    }
}
</script>

<style lang="less" scoped>
.wrap {
    border-radius: 30px;

    & .wrap_content {
        height: 80vh;
        border-radius: 30px;
        width: 60%;
        padding: 20px;
        border: 10px solid rgba(16, 51, 248, 0.596);
    }

    // display: none;
    & .testpap_title {
        margin-top: 50px;
        font-size: 30px;
    }

    & .className {
        margin-top: 50px;
        font-size: 30px;
    }

    & .testNum {
        margin-top: 50px;
        font-size: 30px;
        margin-bottom: 30px;
    }

    & .testpap_content {
        display: flex;
        margin-top: 20px;

        & .el-tag {
            width: 100px;
            height: 40px;
            font-size: 18px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
            margin: 0 20px;
        }
    }

    & .class_content {
        display: flex;
        margin-top: 20px;

        & .el-tag {
            width: 100px;
            height: 40px;
            font-size: 18px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
            margin: 0 20px;
        }
    }

    & .block {
        margin-top: 50px;

        & .demonstration {
            margin-bottom: 20px;
            font-size: 30px;
        }

    }

    & .getTestpap {
        margin-top: 30px;
        display: flex;
        justify-content: center;

        & .el-button--medium.is-round {
            width: 200px;
            height: 50px;
        }
    }
}

.active {
    background: skyblue;
    color: #fff;
}
</style>
