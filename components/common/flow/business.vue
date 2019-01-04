<template>
  <div class="business">
    <div class="business-title">
      {{ $t('lang.compon.busin.order') }}
    </div>
    <ul>
      <li v-for="(item, index) in arr" :key="index" :class="{ 'checked': value == item }">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
    export default {
      props: {
        value: {
          type: String,
          default: ''
        }
      },
      data() {
        return {
          arr: [
            this.$t('lang.compon.busin.arr[1]'),
            this.$t('lang.compon.busin.arr[2]'),
            this.$t('lang.compon.busin.arr[3]'),
            this.$t('lang.compon.busin.arr[4]')
          ]
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .business {
    &-title {
      line-height: 1;
      color: #333333;
      font-size: 20px;
      margin-bottom: 18px;
    }
    ul {
      display: inline-block;
      background: #eeeeee;
      overflow: hidden;
      border-radius: 15px;
      li {
        float: left;
        width: 172px;
        height: 30px;
        text-align: center;
        font-size: 14px;
        color: #333333;
        line-height: 30px;
        border-radius: 15px;
        &.checked {
          color: #ffffff;
          background: #dd7116;
        }
      }
    }
  }
</style>
