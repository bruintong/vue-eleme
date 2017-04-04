<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{'active' : selectType === 2}">{{desc.all}}<span class="count">47</span></span>
      <span class="block positive" :class="{'active' : selectType === 0}">{{desc.positive}}<span class="count">36</span></span>
      <span class="block negative" :class="{'active' : selectType === 1}">{{desc.negative}}<span class="count">11</span></span>
    </div>
    <div class="switch">
      <span class="icon-check_circle"></span>
      <div class="text">只看有内容的评价</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
//  const POSITIVE = 0;
//  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .ratingselect
    .rating-type
      padding 18px 0
      margin 0px 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0px
      .block
        display inline-block
        font-size 12px
        font-weight 600
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        color rgb(77, 85, 93)
        line-height 16px
        &.active
          color #fff
        .count
          font-size 8px
          margin-left 2px
        &:last-child
          margin-right 0px
        &.positive
          background rgba(0, 160, 220, 0.2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, 0.2)
          &.active
            background rgb(77, 85, 93)

</style>
