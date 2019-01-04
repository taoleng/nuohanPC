<template>
  <div class="input-ee1">
    <input v-model="msg" :placeholder="placeholder" type="text" @input="emitVal"/>
  </div>
</template>

<script>
  export default {
    model:{
      prop:'value',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
      event:'input'//这个字段，是指父组件监听 parent-event 事件
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      emitVal() {
        this.$emit('input', this.msg)
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .input-ee1 {
    input {
      width: 100%;
      height: 38px;
      background: #535353;
      border: none;
      padding-left: 20px;
      color: #ffffff;
      line-height: 38px;
      outline: none;
      &::-webkit-input-placeholder {
        color: #999999;
        font-size: 14px;
        line-height: 38px;
      }
      &:focus::-webkit-input-placeholder {
        color: #999999;
        font-size: 14px;
        line-height: 38px;
      }
      /* Firefox < 19 */
      &:-moz-placeholder {
        color: #999999;
        line-height: 38px;
        font-size: 14px;
      }
      &:focus:-moz-placeholder {
        color: #999999;
        line-height: 38px;
        font-size: 14px;
      }
      /* Firefox > 19 */
      &::-moz-placeholder {
        color: #999999;
        line-height: 38px;
        font-size: 14px;
      }
      &:focus::-moz-placeholder {
        color: #999999;
        line-height: 38px;
        font-size: 14px;
      }

      /* Internet Explorer 10 */
      &:-ms-input-placeholder {
        color: #999999;
        line-height: 38px;
        font-size: 14px;
      }
      &:focus:-ms-input-placeholder {
        color: #999999;
        line-height: 38px;
        font-size: 14px;
      }
    }
  }
</style>
