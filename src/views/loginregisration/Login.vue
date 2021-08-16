<template>
    <div class="wrap">
        <el-row class="header"><img src="../../assets/images/title-img.png" alt=""></el-row>
        <el-row class="main flex-lc_mc">
            <el-row class="background-img">
                <img src="../../assets/images/background-img.png" class="bg_img" alt="">
            </el-row>
            <el-row class="login-outside">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm">
                <center><h3 class="title">账号密码登录</h3></center>
                        <el-form-item label="" prop="userName">
                        <el-input type="text" class="ipt" v-model="ruleForm.userName" placeholder="" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item  label="" prop="checkPass">
                        <el-input class="ipt" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                <el-form-item label="" prop="age">
                    <el-input class="ipt" v-model.number="ruleForm.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn-login" type="primary" @click="submitForm('ruleForm'),loginUser()">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-row>
        <el-row class="footer flex-lc_mc">
            <span>@copyright  20210308</span>
        </el-row>
    </div>    
</template>

<script>
import {mapActions} from "vuex";
export default{
     data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userName: '',
          checkPass: '',
          age: ''
        },
        rules: {
          userName: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
     methods: {
       ...mapActions(['userLogin']),
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
      async loginUser(){
        console.log(this.ruleForm.userName);
         if(this.ruleForm.userName.indexOf(" ")!=-1){
          this.$message('提交失败账号不能包含空格');
         }else if(this.ruleForm.userName.length<6){
           this.$message('提交失败账号长度不能小于6位');
         }else if(this.ruleForm.checkPass.indexOf(' ')!=-1){
           this.$message('提交失败密码不能包含空格');
         }else if(this.ruleForm.checkPass.length<6){
           this.$message('提交失败密码长度不能小于6位');
         }else{
           let data =await this.userLogin({username:this.ruleForm.userName,password:this.ruleForm.checkPass});
           console.log(data);
           console.log(data.data);
          // if(data.status){
            //  sessionStorage.setItem('token',data.data);
            //  this.$router.push({
            //    path:'/',
            //  }) 
          // }
         }
      }
    }
}
</script>

<style scoped>
    .header{
        height: 66px;
    }
    .footer{
        height: 110px;
        font-size: 18px;
        font-weight: 600;
    }
    .flex-lc_mc{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .main{
        position: relative;
        height: calc(100vh - 176px);
        background-color: gold;
        display: flex;
        align-items: center;
    }
    .bg_img{
        width:599px;
        height: 455px;
    }
    .login-outside{
        position: absolute;
        background-color: #fff;
        right: 190px;
        display: flex;
        justify-content: center;
        border-radius: 10px;
    }
    .title{
      padding: 20px;
      font-weight: 800;
    }
    .ipt{
      width: 412px;
      height: 45px;
      margin: 20px;
    }
    .btn-login{
      width: 412px;
      height:45px;
    }
</style>