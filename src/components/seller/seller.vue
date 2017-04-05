<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{data.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="data.rating"></star>
          <span class="text">({{data.rating_count}})</span>
          <span class="text">月售{{data.recent_order_num}}单</span>
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
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';

  export default {
    props: {
      data: {
        type: Object
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

</style>
