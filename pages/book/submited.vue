<template>
  <div class="submited reserve-parent bg1">
    >
    <header>
      <div class="nuohan-container">
        <h3>提交成功</h3>
      </div>
    </header>
    <section class="reserve-parent-content">
      <div class="nuohan-container">
        <span>我们已收到您的需求，我们将会在1小时内回复您，请保持您的手机畅通</span>
        <div class="affirm-listbtn margintop55">
          <div class="btn1">
            <router-link to="/">
              <btn-right :text="'返回首页'"/>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import btnRight from '~/components/common/button/btn-right';
    export default {
      components: {
        btnRight
      },
      layout: 'layouts2'
    }
</script>

<style scoped lang='less' type="text/less">
  .submited {
    &.bg1 {
      background: #202020 url("../../assets/img/book/activebg.jpg") center top no-repeat;
    }
    h3 {
      line-height: 167px !important;
    }
    span {
      font-size: 18px;
      color: #ffffff;
    }
  }
</style>
