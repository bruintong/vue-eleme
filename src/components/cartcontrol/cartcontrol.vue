<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="icon-remove_circle_outline cart-decrease" v-show="food.count > 0" @click="decreaseCart($event)"></div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="icon-add_circle cart-add" @click="addCart($event)"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
       type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$root.eventHub.$emit('add-cart', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
            return;
        }
        this.food.count--;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0px
    .move-enter-active, .move-leave-active
      transition .5s
    .move-enter, .move-leave-active
      opacity 0
      transform translate3d(24px, 0, 0) rotate(180deg)
    .cart-decrease, .cart-add
      font-size 24px
      line-height 24px
      display inline-block
      color rgb(0, 160, 220)
      padding 6px
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      font-size 10px
      text-align center
      color rgb(147, 153,159)
    .cart-add
      display inline-block
      padding 6px
</style>
