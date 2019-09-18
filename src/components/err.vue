<!--报错页面的组件,刷新不具体拉某个接口,会直接刷新当前页面-->
<template>
    <div class="err_box">
        <div class="title">{{title || '出错喽~'}}</div>
        <div class="err_reason" v-if="errmsg.length">{{errmsg}}</div>
        <img class="err_icon" src="../assets/images/err.png" alt="">
        <div class="refresh" @click="handleErr">{{btnText}}</div>
    </div>
</template>

<script>
  import tools from "../services/tools";
  export default {
    name: "err",
    props: ["errmsg", "btnText", 'title'],
    data() {
      return {
      }
    },
    mounted () {
    },
    methods: {
      handleErr () {
        this.$emit('handleErr');
      }
    }
  };
</script>

<style scoped lang="scss" type="text/scss">
    @import "../assets/css/common.scss";
    $c6: #666;
    $c9: #999;
    .err_box{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        padding-top: 70px;
        background-color: #fff;
    }
    .title{
        text-align: center;
        color: $c6;
        font-size: 20px;
        margin-bottom: 12px;
    }
    .err_reason{
        text-align: center;
        color: $c9;
        font-size: 16px;
    }
    .err_icon{
        display: block;
        margin: 0 auto 30px;
    }
    .refresh{
        @extend .flex_box;
        @extend .mid_center;
        border: 1px solid #ccc;
        color: $c6;
        width: 160px;
        height: 40px;
        border-radius: 1px;
        margin: 0 auto;
        font-size: 18px;
    }
</style>
