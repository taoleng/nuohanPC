<template>
  <div class="protocol reserve-parent">
    <header>
      <div class="nuohan-container">
        <h3>
          {{ protocoldata.title }}
        </h3>
      </div>
    </header>
    <div class="protocol-content">
      <div class="nuohan-container" v-html="protocoldata.content">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    layout: 'layouts2',
    computed: {
      ...mapState(['protocoldata'])
    },

    head(){
      return {
        title:this.$t('lang.title.order')
      }
    },
    created() {
      // 写到隐私协议的位置
      var type = this.$route.query.type;
      var pay = this.$route.query.pay;
      if(pay){
        this.pay_protocol();
      }else{
        if (type) {
          // 请求协议
          this.register_Protocols({ type: type })
        } else {
          this.protocol();
        }
      }
    },
    methods: {
      ...mapActions(['protocol', 'register_Protocols','pay_protocol'])
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .protocol {
    &.reserve-parent {
      padding-top: 180px;
      .nuohan-container {
        h3 {
          line-height: 178px;
          color: #ffffff;
          font-size: 42px;
        }
      }
    }
    background-size: 100%;
    background: #f6f6f6 url("../assets/img/xieyi.jpg") center top no-repeat;
    &-content {
      min-height: 300px;
      padding-top: 70px;
      padding-bottom: 270px;
    }
  }
</style>
