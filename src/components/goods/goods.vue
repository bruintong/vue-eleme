<template>
  <div class="container">
    <div class="goods">
      <div class="menu-wrapper" ref="menu">
        <ul class="menu">
          <li v-for="(item, index) in goods" class="menu-item" :class="{'current' : currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods">
        <ul>
          <li v-for="(item, index) in goods" class="food-list food-list-hook" >
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food, $event)" v-for="food in item.foods" class="food-item border-1px">
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
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :select-foods="selectFoods" v-bind:agent="agent"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>

</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcard/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';

  const ERR_OK = 0;
  export default {
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        agent: {},
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i=0; i<this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
              if (food.count) {
                  foods.push(food);
              }
          });
        });
        return foods;
      }
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
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.$axios.get('/api/restaurant').then((res) => {
        if (res.data.errno === ERR_OK) {
            this.agent = res.data.data.piecewise_agent_fee;
        }
      });
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu, {
            click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foods, {
            probeType: 3,
            click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i=0; i<foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      'shopcart': shopcart,
      'cartcontrol': cartcontrol,
      'food': food
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
        padding 0 12px
        &.current
          position relative
          z-index 10
          margin-top -1px
          font-weight 700
          background #fff
          .text
            border-none()
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
        overflow hidden
        text-overflow clip
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
            overflow hidden
            text-overflow clip
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
            margin-top 6px
            .now
              margin-right 8px
              color rgb(240, 20 20)
            .old
              text-decoration line-through
              font-size 10px
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
