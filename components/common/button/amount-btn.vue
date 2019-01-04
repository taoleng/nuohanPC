<template>
  <div class="amount-btn">
    <div class="amount-btn-content">
      <div class="amount-btn-content-jian" @click="calculate('jian')">
        <i class="iconfont icon-jiansvg"/>
      </div>
      <div class="amount-btn-content-num">
        <input v-model="value" text="number"/>
      </div>
      <div class="amount-btn-content-jia" @click="calculate('jia')">
        <i class="iconfont icon-jia"/>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      model:{
        prop:'msg',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
        event:'input'//这个字段，是指父组件监听 parent-event 事件
      },
      props: {
        msg: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          value: '0'
        }
      },
      watch: {
        value(val, oldval) {
          var value = val + '';
          var reg=/^[0-9]*[1-9][0-9]*$/;
          if (!val) {

          } else {
            if (!reg.test(value)) {
              this.value = 0;
            }
          }
          this.$emit('input', Number(this.value))
        }
      },
      methods: {
        calculate(val) {
          if (val === 'jian') {
            if (this.value <= 0) {
              return;
            }
            this.value = this.msg - 1;
          } else if(val === 'jia'){
            this.value = this.msg + 1;
          }
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .amount-btn {
    &-content {
      width: 146px;
      height: 42px;
      text-align: center;
      line-height: 42px;
      background: #e5e5e5;
      overflow: hidden;
      i {
        font-size: 14px;
        color: #b5b5b5;
      }
      div {
        float: left;
        display: inline-block;
      }
      &-jia {
        vertical-align: middle;
        width: 28px;
        height: 42px;
        background: #eeeeee;
      }
      &-num {
        position: relative;
        top: -1px;
        input {
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          width: 90px;
          height: 38px;
          font-size: 20px;
          color: #ffffff;
          background: #535353;
          border: none;
          outline: none;
        }
      }
      &-jian {
        vertical-align: middle;
        width: 28px;
        height: 42px;
        background: #eeeeee;
      }
    }
  }
</style>
