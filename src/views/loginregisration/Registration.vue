<template>
    <div class="wrap">
        <div class="header">
            <img src="../../assets/images/title-img.png" class="header_icon" alt="">
        </div>
        <div class="main">
            <div class="ipt-content">
            <div><h3>注册账号</h3></div>
            <div class="ipt-out"> 
                <input type="text" placeholder="请输入用户名" class="ipt-user">
                <img src="../../assets/images/icon_user.png" class="icon_title" alt="">
            </div>
            <div class="ipt-out">
                <input type="password" placeholder="请输入密码" class="ipt-pass">
                <img src="../../assets/images/icon_pen.png" class="icon_title" alt="">
            </div>
            <div class="ipt-out">
                <input type="password" class="ipt-pass" placeholder="请再次确认密码">
                <img src="../../assets/images/icon_pen.png"  class="icon_title" alt="">
            </div>
            <div class="ipt-out">
                <input type="text" placeholder="请输入手机号" class="ipt-phone">
                <img src="../../assets/images/icon_pen.png" class="icon_title" alt="">
            </div>
            <div class="ipt-out">
                <input type="text" placeholder="请输入验证码" class="ipt-code">
                <div class="verification-out"></div>
            </div>
            <div class="ipt-out">
                <div class="btn-register">注册</div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    data() {
        
    },
}
</script>

<style  scoped>
    .header{
        height: 66px;
        display: flex;
        align-items: center;
    }
    .header_icon{
        padding-left: 80px;
    }
    .main{
        height: calc(100vh - 66px);
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ipt-out{
        display: flex;
        margin-top: 40px;
        position: relative;
    }
    .ipt-content{
        width: 575px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .ipt-user,.ipt-pass,.ipt-phone{
        width: 580px;
        height: 44px;
        outline: none;
        text-indent: 3em;
        color: #ccc;
        font-size: 18px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .btn-register{
        width: 580px;
        height: 44px;
        background-color: #f56c6c;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color:#fff;
    }
    .icon_title{
        position: absolute;
        left: 15px;
        top: 15px;
    }
    .ipt-code{
        width:425px;
        height: 44px;
        outline: none;
        border: 1px solid #ccc;
        text-indent: 3em;
        color: #ccc;
        font-size: 18px;
        border-radius: 5px;
    }
    .verification-out{
        height: 44px;
        width: 155px;
        background-image: url(../../assets/images/icon_code.png);
    }
</style>