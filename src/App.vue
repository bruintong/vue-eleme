<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header';

export default {
  name: 'app',
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display: flex;
      width: 100%;
      height: 45px;
      line-height: 45px;
      .tab-item
        flex: 1;
        text-align: center;

</style>
