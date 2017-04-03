<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight' : totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight' : totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalPrice > 0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highlight' : totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc" :class="{'highlight' : totalPrice > 0}"><span>{{payDesc}}</span></div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'highlight' : totalCount > 0}">
          去结算
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      agent: {
        type: Object
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        console.log(this.selectFoods);
        this.selectFoods.forEach((food) => {
          total += Math.round(food.specfoods[0].price * 100 * food.count) / 100;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
          if (this.totalPrice === 0) {
            return '';
          } else if (this.totalPrice > 0 && this.totalPrice <= 20) {
            return '另需配送费￥5元';
          } else {
            return '免外送费';
          }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0
    bottom 0;
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0px
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        vertical-align top
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              color #80858a
              line-height 44px
              width 44px
              height 44px
              &.highlight
                color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #fff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 12px 0 0 12px
          font-size 10px
          &.highlight
            color #fff
      .content-right
        flex 0 0 105px
        width 105px
        text-align center
        .pay
          height 48px
          line-height 48px
          font-size 14px
          font-weight 700
          background #2b343c
          &.highlight
            background #00b43c
            color #fff

</style>
