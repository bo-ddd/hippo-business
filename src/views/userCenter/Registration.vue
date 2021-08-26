<template>
<div class="wrap">
    <el-row class="header"><span class="header-title">学客后台管理系统</span></el-row>
    <el-row class="main">
        <el-row class="register-outside">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <center>
                    <h2 class="title">注册用户</h2>
                </center>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名长度不能小于6位并且不能包含空格!"></el-input>
                </el-form-item>
                <el-form-item label="密&nbsp; &nbsp; 码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入您的密码" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入您的密码" show-password></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="性&nbsp; &nbsp; 别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex" class="sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button class="submit" type="primary" @click="registerUser">注册用户</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </el-row>
    <el-row class="footer flex-lc_mc">
        <span>@copyright 20210308</span>
    </el-row>
</div>
</template>

<script>
import Animation from '@/assets/animation.js'
import {
    mapActions
} from "vuex";
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                this.$message.warning('请输入密码');
            } else if (value.length < 6) {
                this.$message.warning('密码长度不能小于6位')
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                this.$message.warning('请再次输入密码');
            } else if (value !== this.ruleForm.password) {
                this.$message.error('两次输入密码不一致!');
            } else {
                callback();
            }
        };
        var checkName = (rule, value, callback) => {
            if (value === '') {
                this.$message.warning('请输入用户名');
            } else if (value.indexOf(" ") != -1) {
                this.$message.warning('用户名不能包含空格!');
            } else if (value.length < 6) {
                this.$message.warning('用户名长度不能小于6位')
            } else {
                callback();
            }
        }
        return {
            date: new Date().getDate(),
            ruleForm: {
                username: '',
                password: '',
                checkPass: '',
                sex: '1',
                phone: '',
            },
            rules: {
                username: [{
                    required: true,
                    validator: checkName,
                    trigger: 'blur'
                }, ],
                password: [{
                    validator: validatePass,
                    trigger: 'blur',
                    required: true,
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: 'blur',
                    required: true,
                }],
                sex: [{
                    message: '请选择性别',
                    trigger: 'change'
                }],
                phone: [{
                    message: '请输入手机号',
                    trigger: 'blur'
                }]
            },
            foowwLocalStorage: {
                set: function (key, value, ttl_ms) {
                    var data = {
                        value: value,
                        expirse: ttl_ms
                    };
                    localStorage.setItem(key, JSON.stringify(data));
                },
                get: function (key) {
                    var data = JSON.parse(localStorage.getItem(key));
                    if (data !== null) {
                        if (data.expirse != null && data.expirse < new Date().getDate()) {
                            localStorage.removeItem(key);
                        } else {
                            return data.value;
                        }
                    }
                    return null;
                }
            }

        };

    },
    methods: {
        ...mapActions(["userRegister"]),
        async registerUser() {
            if (this.ruleForm.username.indexOf(" ") != -1) {
                this.$message.error("用户名不能包含空格!");
            } else if (this.ruleForm.username.length < 6) {
                this.$message.error("用户名长度不能小于6位");
            } else if (this.ruleForm.checkPass.length < 6) {
                this.$message.error("密码长度不能小于6位");
            } else {

                var text = this.foowwLocalStorage.get("test");
                console.log(text);
                if (!text) {
                    let data = await this.userRegister({
                        username: this.ruleForm.username,
                        password: this.ruleForm.checkPass,
                    });
                    console.log(data)
                    if (data.status == 1) {
                        this.foowwLocalStorage.set("test", "注册过", this.date)
                        this.$message.success('注册成功!');
                        this.$router.push({
                            name: "Login",
                        });
                    } else {
                        this.$message.error('账号已存在!!');
                    }

                } else {
                    this.$message.error('一天只可以注册一次');
                }

            }
        }
    },
    created() {
        if (this.$route.name == 'Registration') {
            this.$nextTick(() => {
                Animation()
            })
        } else {
            return
        }

    }
}
</script>

<style scoped>
.header {
    height: 66px;
    display: flex;
    align-items: center;
}

.header-title {
    padding-left: 30px;
    font-size: 30px;
    color: #1890ff;
}

.main {
    position: relative;
    height: calc(100vh - 176px);
    background-color: rgba(118, 176, 231, 0.5);
    display: flex;
    align-items: center;
}

.register-outside {
    position: absolute;
    right: 15%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    padding: 20px 60px 20px 20px;

}

.el-input {
    margin-right: 80px !important;
}

.title {
    padding: 30px;
    margin-left: 40px;
}

.sex {
    display: flex;
    justify-content: space-around;
    padding: 14px;
}

.submit {
    width: 220px !important;
}

.footer {
    height: 110px;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
}

canvas {
    background-color: #1890ff;
}
</style>
