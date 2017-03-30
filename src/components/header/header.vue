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
          {{data.delivery_mode.text}} / {{data.piecewise_agent_fee.tips}}
        </div>
        <div v-if="data.activities" class="activity">
          <span class="icon" :class="classMap[data.activities[0].type]"></span>
          <span class="text">{{data.activities[0].description}}</span>
        </div>
      </div>
      <div v-if="data.activities" class="activity-count">
        <span class="count">{{data.activities.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="promotion">
      <span class="notice">公告：</span>
      <span class="promotion-info">{{data.promotion_info}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Object
      }
    },
    method: {},
    created() {
      this.classMap = {
        '102': 'decrease',
        '103': 'discount',
        '104': 'guarantee',
        '105': 'invoice',
        '106': 'special',
        'undefined': 'special'
      };
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .header
    color #fff
    background #999
    padding 24px 12px 8px 12px
    white-space nowrap
    font-size 0px
    .content-wrapper
      display flex
      flex-direction row
      line-height 1.5
      margin-bottom 8px
      .avatar
        display inline-block
        width 65px
        height 65px
        border-radius 2px
      .content
        display inline-block
        font-size 14px
        margin-left 14px
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
        right 12px
        bottom 18px
        padding 0 12px
        height 24px
        line-height 24px
        border-radius 12px
        background rgba(0,0,0,0.2)
        text-align center
        .count
          font-size 10px
        .icon-keyboard_arrow_right
          font-size 10px
          position relative
          &::after
            content ' '
            width 6px
            height 6px
            display: inline-block;
            position: absolute;
            top: 50%;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            margin-top: -4px;
            border-width: 1px 1px 0px 0px;
            border-color: #fff;
            border-style: solid;
    .promotion
      display flex
      flex-direction: row
      align-items center
      width: calc(100vw - 20px)
      font-size 12px
      line-height 1.4
      .notice
        vertical-align middle
      .promotion-info
        vertical-align middle
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        word-break: keep-all;
</style>
