<template>
  <div class="layouts2">
    <header-adaption/>
    <nuxt/>
    <bottom/>
  </div>
</template>

<style lang='less' type="text/less">
  .layouts2 {
    .loginweb {
      &-language {
        .language {
          color: #ffffff !important;
        }
      }
      &-content {
        &-user {
          i {
            color: #ffffff !important;
          }
          span {
            color: #ffffff !important;
          }
        }
      }
    }
    .header-adaptione {
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

