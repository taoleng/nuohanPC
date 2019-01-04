<template>
  <div class="more-btn flex-between-align-center hoverblack03">
    <p class="more-btn-line" />
    <span class="more-btn-text">{{ $t('lang.btn.lookmore') }}</span>
  </div>
</template>

<style scoped lang="less" type="text/less">
  .more-btn {
    cursor: pointer;
    width: 165px;
    height: 40px;
    color: white;
    font-size: 14px;
    background: #dd7116;
    padding-left: 26px;
    padding-right: 35px;
    .more-btn-text{
      display: block;
      white-space: nowrap;
      margin: 0px;
      margin-left: 10px;
    }
    &-line{
      position: relative;
      width: 55px;
      height: 1px;
      margin-bottom: 0px;
      background: #ffffff;
      &::after {
        content: '';
        position: absolute;
        right: 0px;
        bottom: 3px;
        display: block;
        width: 8px;
        height: 1px;
        background: #ffffff;
        transform: rotate(45deg);
      }
    }
  }
</style>
