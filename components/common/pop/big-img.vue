<template>
  <Modal
    :value="isShow">
  </Modal>
</template>

<script>
    export default {
      model:{
        prop:'isShow',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
        event:'input'//这个字段，是指父组件监听 parent-event 事件
      },
      props: {
        // 是否显示
        isShow: {
          type: Boolean,
          default: false
        },
      }
    }
</script>

<style scoped lang='less' type="text/less">

</style>
