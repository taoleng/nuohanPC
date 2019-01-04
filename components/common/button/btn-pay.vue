<template>
  <div class="btn-pay hoverblack03">
    {{ text }}
  </div>
</template>

<script>
    export default {
      props: {
        text: {
          type: String,
          default: ''
        }
      },
      data() {
        return {

        }
      },
    }
</script>

<style scoped lang='less' type="text/less">
  .btn-pay {
    cursor: pointer;
    width: 266px;
    height: 62px;
    font-size: 18px;
    text-align: center;
    line-height: 60px;
    color: #999999;
    background: #f6f6f6;
    border: 2px solid #f6f6f6;
  }
</style>
