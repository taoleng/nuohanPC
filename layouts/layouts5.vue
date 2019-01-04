<template>
  <div class="layouts5">
    <header-adaption/>
    <div class="layouts5-container">
      <nuxt/>
    </div>
    <bottom/>
  </div>
</template>

<style lang='less' type="text/less">
  .layouts5 {
    &-container {
      padding-top: 120px;
      margin: 0 auto;
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
      background: #202020;
      &-content {
        width: 1200px;
      }
    }
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
