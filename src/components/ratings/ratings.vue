<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{restaurant.rating}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家69.2%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="3.9"></star>
            <span class="score">3.9</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="4.0"></star>
            <span class="score">4.0</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{restaurant.order_lead_time}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType1" :only-content="onlyContent1" :desc="desc" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rating_star, rating.rating_text)" v-for="rating in ratings" class="rating-item border-1px">
            <div class="avatar">
              <img width="28px" height="28px" :src="rating.avatar">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.rating_star"></star>
                <span class="delivery">{{rating.time_spent_desc}}</span>
              </div>
              <p class="text">{{rating.rating_text}}</p>
              <div class="time">{{rating.rated_at}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import ratingselect from 'components/ratingselect/ratingselect';
  import split from 'components/split/split';

  const ERR_OK = 0;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        restaurant: {},
        ratings: [],
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    created() {
      this.$axios.get('/api/restaurant').then((res) => {
        if (res.data.errno === ERR_OK) {
          this.restaurant = res.data.data;
        }
      });
      this.$axios.get('/api/ratings').then((res) => {
        if (res.data.errno === ERR_OK) {
          this.ratings = res.data.data;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      });
      this.$root.eventHub.$on('ratingtype.select', (type) => {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      });
      this.$root.eventHub.$on('content.toggle', (onlyContent) => {
        this.onlyContent = !onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      });
    },
    computed: {
      selectType1() {
        return this.selectType;
      },
      onlyContent1() {
        return this.onlyContent;
      }
    },
    methods: {
      needShow(ratingStar, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        // All: 显示所有的评论
        // POSITIVE: 显示5星评论
        // NEGATIVE: 显示低于5星的评论
        if (this.selectType === ALL) {
          return true;
        } else if (this.selectType === POSITIVE) {
          return ratingStar === 5;
        } else if (this.selectType === NEGATIVE) {
          return ratingStar < 5;
        } else {
          return true;
        }
      }
    },
    components: {
      'star': star,
      'ratingselect': ratingselect,
      'split': split
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .ratings
    position absolute
    top 170px
    left 0px
    bottom 0px
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        width 137
        padding 6px 0
        border-right 1px solid rgba(7, 17, 27, 0.2)
        text-align center
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
        .score
          line-height 28px
          font-size 24px
          margin-bottom 6px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          font-size 12px
          line-height 12px
          font-weight 600
          color rgb(7, 17, 27)
        .rank
          font-size 10px
          line-height 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0px 6px 24px
        @media only screen and (max-width: 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0px
          .title
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .star
            display inline-block
            margin 0 8px
            vertical-align top
          .score
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rbg(255, 153, 0)
        .delivery-wrapper
          font-size 0px
          .title
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .delivery
            font-size 12px
            margin-left 8px
            line-height 18px
            vertical-align top
            color rgb(147, 153, 159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        padding 18px 0
        display flex
        border-1px(rgba(7, 17, 27, 0.2))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          .name
            margin-bottom 4px
            font-size 10px
            line-height 12px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 4px
            font-size 0px
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .delivery
              display inline-block
              font-size 10px
              line-height 12px;
              vertical-align top
              color rgb(147, 153, 159)
          .text
            line-height 18px
            font-size 12px
            margin-bottom 4px
            color rgb(7, 17, 27)
          .time
            position absolute
            top 18px
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
</style>
