<template>
  <div>
    <!-- 表格数据 -->
    <div class="table">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="activeList"
        style="width: 100%"
        height="600px"
      >
        <el-table-column
          fixed
          prop="title"
          label="活动名称"
          width="150"
        ></el-table-column>
        <el-table-column prop="region" label="活动地址" width="200">
        </el-table-column>
        <el-table-column  prop="nature"  label="活动类型"  width="120">
           <!-- <template #default="scope">
            <span>{{updateType(scope.row)}}
         
            </span>
          </template> -->
        </el-table-column>
        <el-table-column label="活动开始到结束时间" width="300">
          <template #default="scope">
            <span
              >{{updateTime(scope.row)}} ——
              {{updateTimeEnd(scope.row)}}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="banner" width="300">
          <template #default="scope">
            <img :src="scope.row.banner" alt="" style="height: 70px" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button @click.prevent="deleteRow(scope.row)" type="text"  size="small">删除</el-button>
            <el-button type="text" size="small" @click="showupdate(scope.row)">修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->


   <el-dialog title="修改活动信息" v-model="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>

      <el-form-item label="活动地址" :label-width="formLabelWidth">
      <el-input v-model="form.region" autocomplete="off"></el-input>
    </el-form-item>

      <el-form-item label="活动类型" :label-width="formLabelWidth">
      <el-input v-model="form.type" autocomplete="off"></el-input>
    </el-form-item>

      <el-form-item label="活动开始时间·" :label-width="formLabelWidth">
      <el-input v-model="form.startTime" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="活动结束时间·" :label-width="formLabelWidth">
      <el-input v-model="form.endTime" autocomplete="off"></el-input>
    </el-form-item>

      <el-form-item label="活动banner" :label-width="formLabelWidth">
      <el-input v-model="form.banner" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </span>
  </template>
</el-dialog>

    

  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      activeList: [],
      typeN: " ",
      loading: true,
      svg: `
          <path class="path" d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0);"/>
        `,
      
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          type: '',
          startTime: '',
          endTime: '',
          banner:'',
        },
        formLabelWidth: '120px',
        updateId:""
    };
  },

  methods: {
    ...mapActions(["getActiveList", "deleteActive","updateActive"]),
    
   async showupdate(data){
      console.log(data);
      this.dialogFormVisible = true;
      this.updateId=data.id
    },

  async update(){
      let res = await this.updateActive({
        id:this.updateId,
        title:this.form.name,
        nature:this.form.type,
        region:this.form.region,
        startTime:this.form.startTime,
        endTime:this.form.endTime,
        banner:this.form.banner
      })
      console.log(res);
      this.getActiveData();
      this.dialogFormVisible = false
  },

      

    async getActiveData() {
      let res = await this.getActiveList({});
      this.activeList = res.data.rows;
    },

    open() {
      ElMessage.success({
        message: "删除成功",
        type: "success",
      });
    },

    async deleteRow(data) {
      let res = await this.deleteActive({
        id: data.id,
      });
      if (res.status == 1) {
        this.open();
        this.getActiveData();
      }
    },

    updateTime(val) {
      let date = new Date(val.startTime);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return `${y}-${m}-${d} ${h}:${minute}:${second}`;
    },

    updateTimeEnd(val) {
      let date = new Date(val.endTime);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return `${y}-${m}-${d} ${h}:${minute}:${second}`;
    },

    // updateType(val) {
    //   switch (val.nature) {
    //     case 1:
    //       this.typeN = "美食活动";
    //       break;

    //     case 2:
    //       this.typeN = "游戏比赛";
    //       break;

    //     case 3:
    //       this.typeN = "主题活动";
    //       break;

    //     case 4:
    //       this.typeN = "校园娱乐";
    //       break;

    //     case 5:
    //       this.typeN = "其他";
    //       break;

    //     default:
    //       break;
    //   }
    //      return this.typeN
    // },
  },
  async created() {
    this.getActiveData();

    setTimeout(() => {
      this.loading = false;
    }, 800);
  },
};
</script>

<style scoped>
.custom-loading-svg .el-loading-mask > .el-loading-spinner > .circular {
  animation: none;
}
</style>