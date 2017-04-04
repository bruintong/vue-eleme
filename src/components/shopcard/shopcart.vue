<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
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
    <div class="ball-container">
        <div v-for="ball in balls" v-show="ball.show">
          <transition
            name="drop-outer"
            v-on:before-enter="beforeEnterOuter"
            v-on:enter="enterOuter"
            v-on:after-enter="afterEnterOuter">
            <div class="ball" v-show="ball.show">
              <transition
                name="drop-inner"
                v-on:before-enter="beforeEnterInner"
                v-on:enter="enterInner"
                v-on:after-enter="afterEnterInner">
              <div class="inner inner-hook" v-show="ball.show"></div>
              </transition>
            </div>
          </transition>
        </div>
      </div>
    <transition
        name="fold"
        v-on:before-enter="beforeEnterFold"
        v-on:enter="enterFold"
        v-on:after-enter="afterEnterFold"
        v-on:before-leave="beforeLeaveFold"
        v-on:leave="leaveFold"
        v-on:after-leave="afterLeaveFold">
        <div class="shopcart-list" v-show="listShop">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{(food.specfoods[0].price * food.count).toFixed(2)}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
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
    created() {
      this.$root.eventHub.$on('add-cart', (target) => {
        // 体验优化，异步执行下落动画
        this.$nextTick(() => {
          this.drop(target);
          });
      });
    },
    beforeDestroy() {
      this.$root.eventHub.$off('add-cart');
    },
    data() {
      return {
        balls: [{
          show: false
        },
          {
          show: false
        },
          {
          show: false
        },
          {
          show: false
        },
          {
          show: false
        }
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += (food.specfoods[0].price * food.count);
        });
        if (total > 0) {
          total = total.toFixed(2);
        }
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
      },
      listShop() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        return show;
      }
    },
    methods: {
      drop(el) {
        for (let i=0; i<this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnterOuter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
          }
        }
      },
      enterOuter(el) {
        /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, 0, 0)`;
            el.style.transform = `translate3d(0, 0, 0)`;
          });
      },
      afterEnterOuter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      beforeEnterInner(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = (rect.left - 32);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(${x}px,0,0)`;
            el.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enterInner(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.display = '';
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnterInner(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      beforeEnterFold(el) {
        el.style.display = '';
        el.style.transform = 'translate3d(0,0,0)';
      },
      enterFold(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        el.style.display = '';
        el.style.transform = 'translate3d(0,-100%,0)';
      },
      afterEnterFold(el) {
        console.log('afterEnterFold');
      },
      beforeLeaveFold(el) {
        el.style.display = '';
        el.style.transform = 'translate3d(0,-100%,0)';
      },
      leaveFold(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        el.style.display = '';
        el.style.transform = 'translate3d(0,0,0)';
      },
      afterLeaveFold(el) {
        console.log('afterLeaveFold');
      },
      toggleList() {
        if (!this.totalCount) {
           return;
        }
        this.fold = !this.fold;
      }
    },
    components: {
      'cartcontrol': cartcontrol
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

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
    .ball-container
      .drop-outer-enter-active
        transition: all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        .drop-inner-enter-active
          transition: all .5s
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0, 160, 220)
    .fold-enter-active, .fold-leave-active
      transition all 0.4s
    .shopcart-list
      position absolute
      top 0
      left 0
      z-index -1;
      width 100%
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          color rgb(0, 160, 220)
          font-size 12px
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            font-size 14px
            line-height 24px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-weight 700
            font-size 14px
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

</style>
