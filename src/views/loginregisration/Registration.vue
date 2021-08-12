<template>
    <div class="wrap">
        <div class="header">
            <img src="../../assets/images/title-img.png" class="header_icon" alt="">
        </div>
        <div class="main"></div>
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
    }
</style>