<template>
<el-space fill wrap fillRatio="30" direction="horizontal" style=" width: 100%">
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>试题</span>
            </div>
        </template>
        <div class="articleNum" ref="articleNum">
            图
        </div>
    </el-card>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>文章</span>
            </div>
        </template>
        <div class="questionsNum" ref="questionsNum">
            图
        </div>
    </el-card>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>班级</span>
            </div>
        </template>
        <div class="classNum" ref="classNum">
            图
        </div>
    </el-card>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>老师</span>
            </div>
        </template>
        <div class="teacherNum" ref="teacherNum">
            图
        </div>
    </el-card>
</el-space>
</template>

<script>
import {
    mapActions
} from "vuex";
import * as echarts from 'echarts';
export default {
  
    data() {
        return {
            classNum: {
                title: {
                    left: 'center'

                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [{
                    name: '班级人数',
                    type: 'pie',
                    radius: '50%',
                    data: [{
                            value: 1048,
                            name: '搜索引擎'
                        },
                        {
                            value: 735,
                            name: '直接访问'
                        },
                        {
                            value: 580,
                            name: '邮件营销'
                        },
                        {
                            value: 484,
                            name: '联盟广告'
                        },
                        {
                            value: 300,
                            name: '视频广告'
                        }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            },
            questionsNum: {
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [{
                    name: '类目数量',
                    type: 'pie',
                    radius: [30, 100],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: []
                }]
            },
            articleNum :{
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
               
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '当前数量',
                    type: 'bar',
                    barWidth: '40%',
                    data: []
                }]
            },
        }
    },
    methods: {
        ...mapActions(["getArticleCount","getTopicCount"]),
        },
     async created() {
       let questionsNode = await this.getArticleCount({
         type: 2
       })
      let questionNum =0;
       questionsNode.data.forEach(item => {
         questionNum = questionNum+item.count
         this.questionsNum.series[0].data.push(
           {value:item.count,
            name:item.key
           }
         )
       });
       this.questionsNum.series[0].data.unshift(
           {value:questionNum,
            name:"全部"
           }
         )
       this.questionsNum.series[0].data=this.questionsNum.series[0].data.sort((a,b) =>  b.value - a.value);
       let articlesNum =0;
       let articleNode = await this.getArticleCount({
         type: 1
       })
       articleNode.data.forEach(item =>{
         articlesNum= articlesNum+item.count
         this.articleNum.xAxis[0].data.push(item.key)
         this.articleNum.series[0].data.push(item.count)
       })
       console.log(articlesNum);
       this.articleNum.xAxis[0].data.unshift("全部")
         this.articleNum.series[0].data.unshift(articlesNum)
      //  let questionsNum = await this.getTopicCount()
      //  console.log(questionsNum);
        this.$nextTick(() => {
            var classNode = echarts.init(this.$refs.classNum);
            classNode.setOption(this.classNum);
            var questionsNode = echarts.init(this.$refs.questionsNum);
            questionsNode.setOption(this.questionsNum);
            var articleNode = echarts.init(this.$refs.articleNum);
            articleNode.setOption(this.articleNum);
            
        })
    }
}
</script>

<style>
.box-card {
    width: 40.9vw;

}

.classNum {
    width: 40.9vw;
    height: 32vh;
}

.articleNum {
    width: 40.9vw;
    height: 29vh;
}

.questionsNum {
    width: 40.9vw;
    height: 29vh;
}

.teacherNum {
    width: 40.9vw;
    height: 32vh;
}

.card-header {
    display: flex;
    justify-content: center;
}
</style>
