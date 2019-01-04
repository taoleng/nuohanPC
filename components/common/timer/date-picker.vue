<template>
  <!--日历控件-->
  <div class="date-picker">
    <DatePicker
      :options="options"
      :open="open"
      :value="value3"
      :type="type"
      format="yyyy-MM-dd HH:mm"
      confirm
      @on-change="handleChange"
      @on-clear="handleClear"
      @on-ok="handleOk">
      <a :class="{'date-picker-btn': true, 'fucons': open }" href="javascript:void(0)" @click="handleClick"><span>{{ text }}</span></a>
    </DatePicker>
    <span v-if="value3" class="date-picker-date">{{ $t('lang.common.selected') }}：{{ value3[0] }} ~ {{ value3[1] }}</span>
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
          type: Object,
          default() {
            return {}
          }
        },
        type: {
          type: String,
          default: 'daterange'
        }
      },
      data () {
        return {
          open: false,
          value3: '',
          options: {
            disabledDate(date) {
            }
          }
        }
      },
      watch: {
        value(val) {
          if (val.hour === 0) {
            this.value3 = '';
          }
        }
      },
      methods: {
        handleClick () {
          this.open = !this.open;
        },
        handleChange (date) {
          this.value3 = date;
          var time = date[0].substring(0,19);
          time = time.replace(/-/g,'/');
          time = new Date(time).getTime();

          var time2 = date[1].substring(0,19);
          time2 = time2.replace(/-/g,'/');
          time2 = new Date(time2).getTime();
          var hour = time2 - time;
          hour = hour/1000/60/60;
          var timeObj = {
            hour: hour,
            date: date,
          }
          this.$emit('input', timeObj);
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

<style lang='less' type="text/less">
  .date-picker {
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
    .ivu-select-dropdown {
    }
    .ivu-picker-panel-body {
      .ivu-picker-panel-content {
        &:nth-child(1) {
          .ivu-time-picker-cells {
            .ivu-time-picker-cells-list {
              li {
                padding: 0 0 0 100px;
              }
              width: 214px;
              &:nth-child(2) {
                display: none;
              }
            }
          }
        }
        &:nth-child(2) {
          .ivu-time-picker-cells {
            .ivu-time-picker-cells-list {
              li {
                padding: 0 0 0 100px;
              }
              width: 214px;
              &:nth-child(2) {
                display: none;
              }
            }
          }
        }
      }
    }
  }
</style>
