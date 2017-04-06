<template>
  <div id="app">
    <v-header v-bind:data="restaurant"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :data="restaurant"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import header from 'components/header/header';
import {urlParse} from 'common/js/util';

const ERR_OK = 0;

export default {
  data() {
    return {
      restaurant: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$axios.get('/api/restaurant?id=' + this.restaurant.id).then((res) => {
      if (res.data.errno === ERR_OK) {
        this.restaurant = Object.assign({}, this.restaurant, res.data.data);
      }
    });
  },
  name: 'app',
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl";
  #app
    .tab
      display: flex
      width: 100%
      height: 45px
      line-height: 45px
      border-1px(#e9e9e9)
      .tab-item
        flex: 1;
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: #4a4a4a
          font-weight 600
          &.active
            color: #85bdf1
</style>
