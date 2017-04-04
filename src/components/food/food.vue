<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img v-if="food.image_path" :src="food.image_path.substring(0, food.image_path.lastIndexOf('.jpeg') + 5)">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.month_sales}}</span>
            <span class="rating">好评率100%</span>
          </div>
          <div class="price">
            <span class="now" v-if="food.specfoods && food.specfoods[0]">￥{{food.specfoods[0].price}}</span>
            <span class="old" v-if="food.specfoods && food.specfoods[0] && food.specfoods[0].original_price">￥{{food.specfoods[0].original_price}}</span>
          </div>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst($event)">加入购物车</div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
        this.$root.eventHub.$emit('add-cart', event.target);
      }
    },
    components: {
      'cartcontrol': cartcontrol
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .move-enter-active, .move-leave-active
    transition 0.25s linear
    transform translate3d(0, 0, 0)
  .move-enter, .move-leave-active
    transform translate3d(100%, 0, 0)
  .food
    position fixed
    width 100%
    left 0
    top 0
    bottom 48px
    z-index 30
    background #fff
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0px
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      padding 18px
      .title
        font-size 16px
        line-height 16px
        margin-bottom 8px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        font-size 0
        line-height 10px
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153,159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        font-size 16px
        margin-top 6px
        .now
          margin-right 8px
          color rgb(240, 20 20)
        .old
          text-decoration line-through
          font-size 10px
    .cartcontrol-wrapper
      position absolute
      right 12px
      bottom 12px
    .fade-enter-active, .fade-leave-active
      transition opacity  0.2s
    .fade-enter, .fade-leave-active
      opacity 0
    .buy
      position absolute
      right 18px
      bottom 18px
      z-index 10
      line-height 24px
      padding 0 12px
      height 24px
      box-sizing border-box
      font-size 10px
      border-radius 12px
      color #fff
      background rgb(0, 160, 220)
</style>
