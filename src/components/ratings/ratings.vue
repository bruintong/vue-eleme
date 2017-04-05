<template>
  <div class="ratings">
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
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        restaurant: {}
      };
    },
    created() {
      this.$axios.get('/api/restaurant').then((res) => {
        if (res.data.errno === ERR_OK) {
          this.restaurant = res.data.data;
        }
      });
    },
    components: {
      'star': star
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
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
</style>
