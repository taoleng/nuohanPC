<template>
  <!--list  value title-->
  <div class="select-ee">
    <Select
      :value="value"
      :placeholder="placeholder"
      class="select"
      @on-change="emitVal"
      @on-open-change="rotate"
    >
      <Option v-for="item in list" :value="item.value" :key="item.id">{{ item.title }}</Option>
    </Select>
    <div class="select-right">
      <i :class="{ 'iconfont': true, 'icon-tubiaozhizuo-': true, 'deg90': isClick}"/>
    </div>
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
        list: {
          type: Array,
          default() {
            return []
          }
        },
        placeholder: {
          type: String,
          default: '请选择'
        }
      },
      data() {
        return {
          isClick: false
        }
      },
      methods: {
        rotate() {
          this.isClick = !this.isClick;
        },
        emitVal(val) {
          this.$emit('input', val);
        }
      }
    }
</script>

<style lang='less' type="text/less">
  .select-ee {
    position: relative;
    .select {
      .ivu-select-selection {
        height: 38px;
        background: #535353;
        border-radius: 0px;
        border: none;
        box-shadow: none;
        input {
          outline: none !important;
        }
        .ivu-select-placeholder {
          line-height: 38px;
          color: #999999;
          font-size: 14px;
          padding-left: 30px;
        }
        .ivu-select-selected-value {
          color: #ffffff;
          line-height: 38px;
          padding-left: 30px;
        }
        .ivu-select-arrow {
          color: transparent;
        }
      }
      .ivu-select-dropdown {
        top: 34px !important;
        .ivu-select-item {
          padding-left: 30px;
        }
      }
    }
    .select-right {
      position: absolute;
      top: 0px;
      right: 0px;
      display: inline-block;
      width: 20px;
      height: 38px;
      background: #eeeeee;
      i {
        position: absolute;
        top: 10px;
        left: 4px;
        font-size: 13px;
        color: #333333;
        transition: all 0.2s linear;
        transform: rotate(-90deg);
        &.deg90 {
          transform: rotate(0deg);
        }
      }
    }
  }
</style>
