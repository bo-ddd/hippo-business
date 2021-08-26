<template>
<div>
    试卷列表
</div>
</template>

<script>
export default {
    methods: {
        //跳转入试卷详情页方法
        jumpPage: function () {
            this.$router.push({
                name: 'Paperdetails',
            })
        },
    }
}
</script>

<style>

</style>
