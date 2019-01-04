<template>
  <div class="more-btn hoverblack03">
    <p class="more-btn-line" />
    <span class="more-btn-text">{{ text }}</span>
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

<style scoped lang="less" type="text/less">
  .more-btn {
    cursor: pointer;
    width: 266px;
    height: 62px;
    color: white;
    font-size: 18px;
    background: #dd7116;
    text-align: center;
    &-line{
      display: inline-block;
      vertical-align: middle;
      position: relative;
      width: 90px;
      height: 2px;
      background: #ffffff;
      margin-right: 23px;
      &::after {
        content: '';
        position: absolute;
        right: 0px;
        bottom: 4px;
        display: block;
        width: 11px;
        height: 2px;
        background: #ffffff;
        transform: rotate(45deg);
      }
    }
    &-text {
      display: inline-block;
      vertical-align: middle;
      line-height: 62px;
    }
  }
</style>
