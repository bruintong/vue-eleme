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
          <span>公告：</span>
          <span class="promotion-info">{{data.promotion_info}}</span>
        </div>
      </div>
    </div>
    <div v-if="data.activities" class="activity">
      <span class="icon"></span>
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
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .header
    color #fff
    background #000
    padding 24px 12px 8px 12px
    white-space nowrap
    font-size 0px
    .content-wrapper
      display flex
      flex-direction row
      .avatar
        display inline-block
        width 65px
        height 65px
      .content
        display inline-block
        font-size 14px
        margin-left 14px
        .name
          font-size 16px
        .delivery
          font-size 12px
        .promotion
          font-size 12px
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          word-break keep-all
    .activity
      font-size 12px
</style>
