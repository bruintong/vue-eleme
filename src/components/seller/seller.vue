<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{data.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="data.rating"></star>
          <span class="text">({{data.rating_count}})</span>
          <span class="text">月售{{data.recent_order_num}}单</span>
        </div>
        <div class="favorite" @click="toggleFavorite($event)">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content"><span class="stress">20</span>元</div>
          </li>
          <li class="block">
            <h2>配送价</h2>
            <div class="content"><span class="stress">4</span>元</div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content"><span class="stress">39</span>分钟</div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{data.description}}</p>
        </div>
      </div>
      <ul v-if="data.activities" class="activities">
        <li class="activity-item border-1px" v-for="(item, index) in data.activities">
          <span class="icon" :class="classMap[data.activities[index].type]"></span>
          <span class="text">{{data.activities[index].description}}</span>
        </li>
      </ul>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in data.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h1 class="title border-1px">商家信息</h1>
        <ul class="supports" v-show="data.supports">
          <li v-for="support in data.supports" class="support-item border-1px">{{support.description}}</li>
        </ul>
        <div class="address">地址：{{data.address}}</div>
        <div class="opening-hours">营业时间：{{filteredOpeningHours}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import {saveToLocal, loadFromLocal} from '../../common/js/save.js';

  export default {
    props: {
      data: {
        type: Object
      }
     },
    data() {
      return {
        favorite: (() => {
          let favorite = loadFromLocal(this.data.id, 'favorite', false);
          return favorite;
        })()
      };
    },
    created() {
      this.classMap = {
        '102': 'decrease',
        '103': 'discount',
        '104': 'guarantee',
        '105': 'invoice',
        '106': 'special',
        'undefined': 'special'
      };
    },
    mounted() {
      this._initScroll();
      this._initPics();
    },
    watch: {
      'data'() {
        this._initScroll();
        this._initPics();
      }
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.data.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.data.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.data.id, 'favorite', this.favorite);
      }
    },
    computed: {
      filteredOpeningHours() {
        if (this.data.opening_hours) {
          let hours = this.data.opening_hours[0].split('/');
          return (hours[0] + '-' + hours[1]);
        }
        return '';
      },
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      },
      restaurantId() {
        return this.data.id;
      }
    },
    components: {
      'star': star,
      'split': split
    }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .seller
    position absolute
    width 100%
    top 170px
    left 0px
    bottom 0px
    overflow hidden
    .overview
      padding 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
        margin-bottom 8px
      .desc
        font-size 0
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display inline-block
          vertical-align top
          margin-right 8px
        .text
          display inline-block
          line-height 18px
          font-size 10px
          vertical-align top
          margin-right 12px
          color rgb(77, 85, 93)
      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border none
          h2
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .content
            font-size 10px
            line-height 24px
            color rbg(7, 17, 27)
            .stress
              font-size 24px
    .favorite
      position absolute
      right 11px
      top 18px
      width 50px
      text-align center
      .icon-favorite
        display block
        font-size 24px
        line-height 24px
        color #d4d6d9
        &.active
          color rgb(240, 20, 20)
      .text
        font-size 10px
        line-height 10px
        color rgb(77, 85, 93)
    .bulletin
      padding 18px 18px 0 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
        margin-bottom 8px
      .content-wrapper
        padding 0px 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height 24px
          font-size 12px
          color rgb(240, 20, 20)
    .activities
      .activity-item
        padding 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0px
        &:last-child
          border-none()
        .icon
          display inline-block
          width 16px
          height 16px
          vertical-align top
          margin-right 6px
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          font-size 12px
          line-height 16px
          color rgb(7, 17, 27)
    .pics
      padding 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
        margin-bottom 8px
      .pic-wrapper
        width 100%
        white-space nowrap
        overflow hidden
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            width 120px
            height 90px
            margin-right 6px
            &.last-child
              margin-right 0px
    .seller-info
      padding 18px 18px 0px 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
        padding-bottom 12px
        border-1px(rgba(7, 17, 27, 0.1))
      .supports
        .support-item
          padding 16px 0px
          font-size 12px
          line-height 18px
          border-1px(rgba(7, 17, 27, 0.1))
      .address, .opening-hours
        padding 16px 0px
        font-size 12px
        line-height 18px
        border-1px(rgba(7, 17, 27, 0.1))
      .opening-hours
        border-none()
</style>
