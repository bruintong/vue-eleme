<template>
  <div class="header">
    <div class="content-wrapper">
      <img class="avatar" :src="data.image_path">
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{data.name}}</span>
        </div>
        <div class="delivery">
          {{data.delivery_mode.text}} / {{data.order_lead_time}}分钟送达 / {{data.piecewise_agent_fee.tips}}
        </div>
        <div v-if="data.activities" class="activity">
          <span class="icon" :class="classMap[data.activities[0].type]"></span>
          <span class="text">{{data.activities[0].description}}</span>
        </div>
      </div>
      <div v-if="data.activities" class="activity-count" @click="showDetail">
        <span class="count">{{data.activities.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="promotion" @click="showDetail">
      <span class="promotion-title"></span>
      <span class="promotion-info">{{data.promotion_info}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="data.image_path" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{data.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="data.rating"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="data.activities" class="activities">
            <li class="activity-item" v-for="(item, index) in data.activities">
              <span class="icon" :class="classMap[data.activities[index].type]"></span>
              <span class="text">{{data.activities[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{data.promotion_info}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';

  export default {
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
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
    components: {
        'star': star
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .header
    color #fff
    font-size 0px
    position relative
    background rgba(7, 17, 27, 0.5)
    overflow hidden
    .content-wrapper
      display flex
      flex-direction row
      line-height 1.5
      margin-bottom 8px
      padding 24px 12px 0px 12px
      .avatar
        display inline-block
        width 65px
        height 65px
        border-radius 2px
      .content
        flex 1
        display inline-block
        font-size 14px
        margin-left 10px
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
          vertical-align top
        .name
          font-size 16px
          margin-left 6px
          font-weight bold
        .delivery
          font-size 12px
        .activity
          display flex
          flex-direction row
          align-items center
          margin-top 4px
          .icon
            display inline-block
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            font-size 10px
            line-height 12px
      .activity-count
        align-self flex-end
        padding 0 6px
        margin-bottom 4px
        height 20px
        line-height 20px
        border-radius 10px
        background rgba(0,0,0,0.2)
        text-align center
        .count
          font-size 10px
          vertical-align top
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 20px
          font-size: 10px
    .arrow_right
      position relative
      padding-right 4px
      &::after
        content ' '
        position absolute
        top: 50%
        margin-top -7px
        width 6px
        height 6px
        transform matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
        border-width 1px 1px 0px 0px
        border-color #fff
        border-style solid
    .promotion
      height 24px
      line-height 24px
      position relative
      padding 2px 12px 2px 12px
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      font-size 10px
      background rgba(7, 17, 27, 0.2)
      .promotion-title
        display inline-block
        vertical-align middle
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .promotion-info
        vertical-align middle
        margin 0px 8px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        right 8px
        top: 10px
        font-size: 10px
    .background
      position absolute
      top 0px
      left 0px
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      top 0
      left 0
      z-index 1
      width 100%
      height 100%
      overflow auto
      background rgba(7, 17, 27, 0.8)
      .detail-wrapper
        min-height 100%
        width 100%
        font-size 16px
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            text-align center
            line-height 16px
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 18px
            padding 0 2px
            text-align center
          .title
            display flex
            width 80%
            margin 30px auto 24px auto
            .line
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding 0 12px
              font-size 14px
          .activities
            width 80%
            margin 0 auto
            .activity-item
              padding 0 12px
              margin-bottom 12px
              font-size 0px
              &:last-child
                margin-bottom 0px
              .icon
                display inline-block
                height 16px
                width 16px
                margin-right 6px
                vertical-align middle
                background-size 16px 16px
                background-repeat no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                font-size 12px
                line-height 16px
                vertical-align middle
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              line-height 24px
              font-size 12px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
