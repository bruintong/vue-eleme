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
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst($event)">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.description"></split>
        <div class="info" v-show="food.description">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.description}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
        </div>
        <div class="rating-wrapper">
          <ul v-show="ratings && ratings.length > 0">
            <li v-for="rating in ratings" class="rating-item border-1px">
              <img class="avatar" :src="rating.avatar">
              <div class="rating-content">
                <span class="name">{{rating.username}}</span>
                <span class="time">{{rating.rated_at}}</span>
                <p class="text">
                  <span :class="{'icon-thumb_up' : rating.rating_star == 5, 'icon-thumb_down' : rating.rating_star < 5}"></span>
                  <span class="rating-text">{{rating.rating_text}}</span>
                </p>
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!ratings || ratings.length <= 0"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import ratingselect from 'components/ratingselect/ratingselect';
  import split from 'components/split/split';

  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        ratings: []
      };
    },
    created() {
      this.$axios.get('/api/ratings').then((res) => {
      if (res.data.errno === ERR_OK) {
        this.ratings = res.data.data;
      }
    });
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
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
      'cartcontrol': cartcontrol,
      'split': split,
      'ratingselect': ratingselect
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
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
      position relative
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
    .info
      padding 18px
      .title
        font-size 14px
        margin-bottom 6px
        line-height 14px
        color rgb(7, 17, 27)
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color rgb(77, 85, 93)
    .rating
      padding-top 18px
      .title
        font-size 14px
        margin-left 18px
        line-height 14px
        color rgb(7, 17, 27)
    .rating-wrapper
      padding 0 18px
      .rating-item
        position relative
        padding 16px 0
        border-1px(rgba(7, 17, 27, 0.2))
      .avatar
        position absolute
        border-radius 50%
        top 12px
        left 0px
        width 36px
        height 36px
      .rating-content
        margin-left 48px
        position relative
        .name
          display inline-block
          position absolute
          left 0px
          top 0px
          font-size 12px
          line-height 16px
          color rgb(147, 153, 159)
        .time
          display inline-block
          position absolute
          right 0px
          top 0px
          line-height 12px
          font-size 10px
          color rgb(147, 153, 159)
        .text
          display inline-block
          margin-top: 16px
          line-height 16px
          font-size 12px
          color rgb(7, 17, 27)
          .icon-thumb_up, .icon-thumb_down
            line-height 16px
            margin-right 4px
            font-size 12px
            vertical-align middle
          .icon-thumb_up
            color rgb(0, 160, 220)
          .icon-thumb_down
            color rgb(147, 153, 159)
          .rating-text
            font-size 12px
            line-height 16px
            color rgb(7, 17, 27)
            vertical-align middle
</style>
