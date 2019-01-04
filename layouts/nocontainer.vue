<template>
  <div class="app-nocontainer">
    <header-adaption/>
    <div class="app-nocontainer-content">
      <nuxt/>
    </div>
    <bottom/>
  </div>
</template>

<style lang='less' type="text/less">
  .app-nocontainer {
    .loginweb {
      &-language {
        .language {
          color: #333333 !important;
        }
      }
      &-content {
        &-user {
          i {
            color: #333333 !important;
          }
          span {
            color: #333333 !important;
          }
        }
      }
    }
    &-content {
      padding-top: 120px;
    }
    .bottom-item5-bg-masking-bottom {
      background: #202020;
      &-content {
        width: 1200px;
      }
    }
  }
</style>

<script>
  import headerAdaption from '../components/common/header-adaption';
  import bottom from '../components/common/bottom';
  import { mapMutations } from 'vuex'
  export default {
    components: {
      headerAdaption,
      bottom
    },
    data() {
      return {

      }
    },
    created() {
      this.page(0)
    },
    methods: {
      ...mapMutations(['page'])
    }
  }
</script>

