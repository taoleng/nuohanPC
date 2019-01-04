<template>
  <div class="pull-down" @click="showUl()">
    <div class="pull-down-content">
      {{ value }}
      <i class="iconfont icon-tubiaozhizuo-"/>
    </div>
    <ul :style="{
      height: showul ? '300px' : '0px'
     }">
      <li
        v-for="(item, index) in arr"
        :key="index" @click="dianji(item)"
      >{{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      arr: {
        type: Array,
        default() {
          return []
        }
      },
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showul: false
      }
    },
    methods: {
      dianji(val) {
        //  传给父
        this.$emit('countryValue', val)
        this.$emit('cityValue', val)
      },
      showUl() {
        this.showul = !this.showul;
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .pull-down {
    position: relative;
    font-size: 16px;
    text-align: center;
    line-height: 50px;
    color: #333333;
  }
  .pull-down-content {
    position: relative;
    width: 206px;
    height: 52px;
    border: 2px solid #333333;
    i {
      position: absolute;
      line-height: 1;
      top: 50%;
      right: 20px;
      margin-top: -7px;
    }
  }
  ul {
    overflow: hidden;
    width: 100%;
    height: 0px;
    position: absolute;
    top: 52px;
    left: 0px;
    z-index: 5;
    cursor: pointer;
    transition: height 0.2s linear 0s;
    /*border: 1px solid #eaeaea;*/
    li {
      border-bottom: 1px solid #eaeaea;
      border-left: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      background: #ffffff;
      &:hover {
        background: #eaeaea;
      }
    }
  }
  .op1 {
    opacity: 1;
  }
</style>
