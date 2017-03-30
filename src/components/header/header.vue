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
        <div class="promotion">
          <span class="notice">公告：</span>
          <span class="promotion-info">{{data.promotion_info}}</span>
        </div>
      </div>
    </div>
    <div v-if="data.activities" class="activity">
      <span class="icon" :class="classMap[data.activities[0].type]"></span>
      <span class="text">{{data.activities[0].description}}</span>
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
    method: {
    },
    created() {
      this.classMap = { '1': 'decrease', '2': 'descount', '3': 'guarantee', '4': 'invoice', '5': 'special', 'undefined': 'special' };
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .header
    color #fff
    background #000
    padding 24px 12px 8px 12px
    white-space nowrap
    font-size 0px
    .content-wrapper
      display flex
      flex-direction row
      line-height 1.5
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
        .promotion
          display flex
          flex-direction: row
          align-items center
          width: calc(100vw - 100px)
          font-size 12px
          .notice
            vertical-align middle
          .promotion-info
            vertical-align middle
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            word-break: keep-all;
    .activity
      display flex
      flex-direction row
      align-items center
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
</style>
