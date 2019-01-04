<template>
  <div class="personal-content-left">
    <ul>
      <nuxt-link to="/user">
        <li :class="{ checked: $route.fullPath == '/user' }">{{ $t('lang.user.news.hyxx') }}</li>
      </nuxt-link>
      <nuxt-link to="/user/vip">
        <li :class="{ checked: $route.fullPath == '/user/vip' }">{{ $t('lang.user.news.hyqy') }}</li>
      </nuxt-link>
      <nuxt-link to="/user/order">
        <li :class="{ checked: $route.fullPath.indexOf('/user/order') !== -1 }">{{ $t('lang.user.news.ddgl') }}</li>
      </nuxt-link>
      <nuxt-link to="/user/news">
        <li :class="{ checked: $route.fullPath == '/user/news' }">{{ $t('lang.user.news.xxgl') }}</li>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
  export default{}
</script>

<style scoped lang='less' type="text/less">

</style>
