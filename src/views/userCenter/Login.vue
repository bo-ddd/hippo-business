<template>
  <div class="wrap">
    <el-row class="header"
      ><el-breadcrumb-item><img class="logo" src="../../assets/images/logo.png" alt=""></el-breadcrumb-item></el-row
    >
    <el-row class="main flex-lc_mc">
      <el-row class="login-outside">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width=""
          class="demo-ruleForm"
        >
          <center><h2 class="title">账号密码登录</h2></center>
          <el-form-item class="ipt-out" prop="userName">
            <el-input
              prefix-icon="../../assets/images/icon_user.png"
              type="text"
              class="ipt"
              v-model="ruleForm.userName"
              placeholder="请输入您的用户名"
              autocomplete="off"
            ></el-input>
            <img
              src="../../assets/images/icon_user.png"
              class="icon_tips"
              alt=""
            />
          </el-form-item>
          <el-form-item class="ipt-out" prop="checkPass">
            <el-input
              class="ipt"
              type="password"
              prefix-icon="../../assets/images/icon_user.png"
              placeholder="请输入您的密码"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
            <img
              src="../../assets/images/icon_pen.png"
              class="icon_tips"
              alt=""
            />
          </el-form-item>
          <el-form-item class="ipt-out" prop="age">
            <el-row>
              <el-col class="code-out" :span="15">
                <el-input
                  prefix-icon="../../assets/images/icon_user.png"
                  class="ipt-code"
                  placeholder="请输入验证码"
                  v-model.number="ruleForm.age"
                ></el-input>
                <img
                  src="../../assets/images/icon_pen.png"
                  class="icon_tips2"
                  alt=""
                />
              </el-col>
              <el-col :span="6">
                <img src="../../assets/images/icon_code.png" alt="" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <center>
              <el-button
                class="btn-login"
                type="primary"
                @click="submitForm('ruleForm'), loginUser()"
                >登录</el-button
              >
            </center>
          </el-form-item>
          <el-row class="text-btm">
            <el-col :span="12" class="text-l ft-16">忘记密码?</el-col>
            <el-col :span="12" class="text-r ft-16" @click="toRegister"
              >立即注册</el-col
            >
          </el-row>
        </el-form>
      </el-row>
    </el-row>
    <el-row class="footer flex-lc_mc">
      <span>@copyright 20210308</span>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Animation from "@/assets/animation.js";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        this.$message("验证码不能为空");
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        this.$message("请输入账号");
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        this.$message("请输入密码");
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        checkPass: "",
        age: "",
      },
      rules: {
        userName: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  created() {
    this.$nextTick(() => {
      Animation();
    });
  },
  methods: {
    ...mapActions(["userLogin"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message("提交信息");
        } else {
          this.$message("提交信息有误");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toRegister() {
      this.$router.push({
        name: "Registration",
      });
    },
    async loginUser() {
      if (this.ruleForm.userName.indexOf(" ") != -1) {
        this.$message("提交失败账号不能包含空格");
      } else if (this.ruleForm.userName.length < 6) {
        this.$message("提交失败账号长度不能小于6位");
      } else if (this.ruleForm.checkPass.indexOf(" ") != -1) {
        this.$message("提交失败密码不能包含空格");
      } else if (this.ruleForm.checkPass.length < 6) {
        this.$message("提交失败密码长度不能小于6位");
      } else {
        let data = await this.userLogin({
          username: this.ruleForm.userName,
          password: this.ruleForm.checkPass,
        });
        if (data.status) {
          sessionStorage.setItem("token", data.data);
          this.$router.push({
            path: "/",
          });
        } else {
          this.$message("账号或者密码有误");
        }
      }
    },
  },
};
</script>

<style scoped>
.header {
  height: 66px;
  display: flex;
  align-items: center;
}
.footer {
  height: 110px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-lc_mc {
  display: flex;
  align-items: center;
}
.main {
  position: relative;
  height: calc(100vh - 176px);
  background-color: rgba(118, 176, 231, 0.5);
  display: flex;
  align-items: center;
}
.login-outside {
  position: absolute;
  background-color: #fff;
  right: 15%;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  padding: 20px;
}
.title {
  padding: 30px;
}
.header-title {
  padding-left: 30px;
  font-size: 30px;
  color: #1890ff;
}
.btn-login {
  width: 356px;
  height: 45px;
}
.ipt-out {
  position: relative;
  margin-bottom: 20px;
}
.icon_tips {
  position: absolute;
  left: 10px;
  top: 10px;
}
.code-out {
  position: relative;
}
.icon_tips2 {
  position: absolute;
  left: 10px;
  top: 12px;
}
.icon_title {
  padding-left: 80px;
  width: 160px;
  height: 30px;
}
.text-l {
  display: flex;
  align-items: center;
  padding-left: 30px;
}
.text-r {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
}
ft-16 {
  font-size: 16px;
  font-weight: 800;
}
.text-btm {
  margin-bottom: 30px;
}
.logo{
  height: 65px;
  padding: 0 20px;
}
</style>