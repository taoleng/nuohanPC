<template>
  <div class="pop-btn">
    {{ $t('lang.btn.home') }}
  </div>
</template>

<script>
    export default {
      props: {
        text: {
          type: String,
          default: ''
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .pop-btn {
    width: 238px;
    height: 64px;
    text-align: center;
    background: #dd7116;
    line-height: 64px;
  }
</style>
