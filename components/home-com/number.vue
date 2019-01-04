<template>
  <div class="number">
    <p
      :class="{ 'number-num': true, 'checked': homePageIdx === 1 || homePageIdx === 3 }">{{ num }}</p>
    <p
      :class="{ 'number-line': true, 'checked': homePageIdx === 1 || homePageIdx === 3 }"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      num: {
        type: String,
        default: '01'
      }
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapState(['homePageIdx'])
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .number {
    display: inline-flex;
    align-items: center;
    &-num {
      font-size: 18px;
      line-height: 1;
      color: #ffffff;
      margin-right: 10px;
      &.checked {
        color: black;
      }
    }
    &-line {
      width: 76px;
      height: 1px;
      background: #ffffff;
      vertical-align: middle;
      &.checked {
        background: black;
      }
    }
  }
</style>
