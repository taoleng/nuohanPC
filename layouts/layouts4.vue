<template>
  <div class="layouts4">
    <header-adaption/>
    <nuxt/>
    <bottom/>
  </div>
</template>

<style lang='less' type="text/less">
  .layouts4 {
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
    .header-adaptione {
      &-nav {
        &-list {
          li {
            a {
              color: #333333 !important;
            }
          }
        }
      }
    }
    .bottom-item5-bg-masking-bottom {
      position: static;
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

