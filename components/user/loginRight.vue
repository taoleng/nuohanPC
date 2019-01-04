<template>
  <div class="loginword">
    <h3>Discover a different</h3>
    <span>world</span>
    <p>{{ $t('lang.user.login.world') }}</p>
  </div>
</template>

<script>
  export default {}
</script>

<style lang='less' type="text/less">
  @font-color: #fff;
  .loginhome {
    background: #bcbfbf url("../../assets/img/login/register.jpg") center top no-repeat;
    background-size: cover;
    .nuohan-container {
      padding-top: 212px;
      padding-left: 80px;
      overflow: hidden;
    }
    .loginword {
      width: 50%;
      float: right;
      text-align: right;
      h3 {
        font-size: 48px;
        color: @font-color;
        margin-bottom: -27px;
        font-weight: normal;
      }
      span {
        display: block;
        font-size: 48px;
        font-weight: normal;
        color: @font-color;
        margin-left: 321px;
        margin-bottom: 10px;
      }

      p {
        font-size: 24px;
        color: @font-color;
        margin-left: 260px;;
      }
    }
  }
</style>
