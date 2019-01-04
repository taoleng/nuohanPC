<template>
  <!--日历控件-->
  <div class="hour-minute">
    <TimePicker
      :open="open"
      :value="value3"
      :type="type"
      :steps="steps"
      format="HH:mm"
      confirm
      @on-change="handleChange"
      @on-clear="handleClear"
      @on-ok="handleOk">
      <a :class="{'hour-minute-btn': true, 'fucons': open }" href="javascript:void(0)" @click="handleClick"><span>{{ text }}</span></a>
    </TimePicker>
    <span v-if="value3" class="date-picker-date">已选择：{{ value3[0] }} - {{ value3[1] }}</span>
  </div>
</template>

<script>
  export default {
    model:{
      prop:'value',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
      event:'input'//这个字段，是指父组件监听 parent-event 事件
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      value: {
        type: Array,
        default() {
          return []
        }
      },
      type: {
        type: String,
        default: 'timerange'
      },
      steps: {
        type: Array,
        default() {
          return [1, 60,]
        }
      }
    },
    data () {
      return {
        open: false,
        value3: ''
      }
    },
    methods: {
      handleClick () {
        this.open = !this.open;
      },
      handleChange (date) {
        this.value3 = date;
        this.$emit('input', date);
      },
      handleClear () {
        this.open = false;
      },
      handleOk () {
        this.open = false;
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .hour-minute {
    &-btn {
      display: inline-block;
      height: 36px;
      font-size: 0px;
      color: #d9d9d9;
      line-height: 32px;
      border: 2px solid #ffffff;
      padding-left: 25px;
      padding-right: 25px;
      span {
        font-size: 18px;
      }
      &.fucons {
        color: #dd7116;
        border-color: #dd7116;
      }
      &:hover {
        color: #dd7116;
        border-color: #dd7116;
      }
    }
    .date-picker-date {
      display: block;
      font-size: 14px;
      color: #dd7116;
      line-height: 1;
      margin-top: 18px;
    }
  }
</style>
