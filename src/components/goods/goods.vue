<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul class="menu">
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon" >
                <img width="57" height="57" :src="food.image_path">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.month_sales}}份</span>
                  <span>好评率：100%</span>
                </div>
                <div class="price">
                  <span class="now" v-if="food.specfoods && food.specfoods[0]">￥{{food.specfoods[0].price}}</span>
                  <span class="old" v-if="food.specfoods && food.specfoods[0] && food.specfoods[0].original_price">￥{{food.specfoods[0].original_price}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = 0;
  export default {
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      };
    },
    created() {
      this.classMap = {
        '1': 'normal',
        '2': 'decrease',
        '3': 'discount',
        '4': 'guarantee',
        '5': 'invoice',
        '6': 'special'
      };
      this.$axios.get('/api/menu').then((res) => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data;
        }
      });
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    width 100%
    top 170px
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        line-height 14px
        margin 0 auto
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.normal
            display none
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
      flex 1
      .title
        padding 0px 0px 0px 14px
        margin 0
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0px
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            padding 0px
            margin 2px 0 6px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc, .extra
            line-height 1.2
            font-size 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom 6px
          .extra
            .count
              margin-right 8px
          .price
            font-weight 700
            font-size 16px
            .now
              margin-right 8px
              color rgb(240, 20 20)
            .old
              text-decoration line-through
              font-size 10px

</style>
