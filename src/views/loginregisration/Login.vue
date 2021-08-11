<template>
<div class="wrap">
    <div class="header">
        <img src="../../assets/images/title-img.png" class="header_icon" alt="">
    </div>
    <div class="main">
        <div class="background-imgout">
        </div>
        <div class="input-content">
            <h3 class="title-tips">账号密码登录</h3>
            <div class="ipt-out">
                <input type="text" class="ipt-user" placeholder="请输入您的用户名">
                <img src="../../assets/images/icon_user.png" class="icon_tips" alt="">
            </div>
            <div class="ipt-out">
                <input type="password" class="ipt-pass" placeholder="请输入您的密码">
                <img src="../../assets/images/icon_pen.png" class="icon_tips" alt="">
            </div>
            <div class="ipt-out">
                <input type="text" placeholder="请输入验证码" class="ipt-code">
                <div class="verification-out"></div>
            </div>
            <button class="btn-login">登录</button>
            <div class="content-bottom">
                <div class="btm-text">忘记密码?</div>
                <div  @click="getQuestions('Registration')" class="btm-text">立即注册</div>
            </div>
        </div>
    </div>
    <div class="footer"><b>@Copyright 20210308</b></div>
</div>
</template>

<script>
export default {
    methods: {
        getQuestions: function (title) {
            this.$router.push({
                name: title,
            })
        }
    }
}
</script>

<style scoped>
.header {
    height: 66px;
    background-color: #fff;
    display: flex;
    align-items: center;
}

.main {
    height: calc(100vh - 176px);
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: red;
}

.header_icon {
    padding-left: 80px;
}

.footer {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
}

.input-content {
    align-self: flex-end;
    width: 462px;
    height: 482px;
    margin-right: 190px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    border-radius: 1%;
}

.background-imgout {
    align-self: flex-end;
    width: 50vw;
    height: calc(100vh - 176px);
    background-color: gold;
}

.title-tips {
    margin-top: 35px;
}

.content-bottom {
    width: 412px;
    height: 36px;
    margin: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.ipt-out {
    margin: 25px;
    display: flex;
    position: relative;
}

.ipt-code {
    width: 258px;
    height: 46px;
    font-size: 18px;
    outline: none;
    border: 1px solid #ccc;
    color: #ccc;
    text-indent: 2em;
}

.btn-login {
    width: 412px;
    height: 46px;
    border-radius: 10px;
    color: #fff;
    font-size: 18px;
    background-color: #409eff;
}

.ipt-user,
.ipt-pass {
    width: 412px;
    height: 46px;
    font-size: 18px;
    border: 1px solid #ccc;
    color: #ccc;
    outline: none;
    text-indent: 3em;
}

.btm-text {
    font-size: 18px;
    font-weight: 580;
}

.icon_tips {
    position: absolute;
    left: 15px;
    top: 15px;
}

.verification-out {
    height: 46px;
    width: calc(412px - 258px);
    background-color: red;
}
</style>
