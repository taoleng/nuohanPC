<template>
  <div class="slider">
    <Slider v-model="selfValue" :max="10"></Slider>
  </div>
</template>

<script>
    export default {
      model: {
        prop: 'value',
        event:'input'
      },
      props: {
        value: {
          type: Number,
          default: 8
        }
      },
      data() {
        return {
          selfValue: 8
        }
      },
      watch: {
        selfValue(val) {
          this.$emit('input', val);
        }
      }
    }
</script>

<style lang='less' type="text/less">
  @import "../../../assets/less/common";
  .ivu-slider {
    width: 500px;
    border: 3px solid #eeeeee;
    border-radius: 5px;
    .ivu-slider-wrap {
      margin: 0;
      background-color: #ffffff;
      .ivu-slider-bar {
        .gradual-bgx(#f4ccae,#eb572f);
      }
      .ivu-tooltip-rel {
        .ivu-slider-button {
          position: relative;
          top: -3px;
          height: 18px;
          width: 18px;
          background: #eeeeee;
          border-color: #eeeeee;
        }
      }
    }
  }
</style>
