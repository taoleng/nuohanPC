<template>
  <div class="home-container">
    <header-adaption/>
    <nuxt/>
  </div>
</template>

<script>
  import headerAdaption from '../components/common/header-adaption';
  import bottom from '../components/common/bottom';
  export default {
    components: {
      headerAdaption,
      bottom
    },
    data() {
      return {}
    },
  }
</script>

<style scoped lang='less' type="text/less">
  .home-container {
    .header-adaption {
      &-nav {
        &-list {
          li {
            a {
              color: #ffffff !important;
            }
          }
        }
      }
    }
  }
</style>
