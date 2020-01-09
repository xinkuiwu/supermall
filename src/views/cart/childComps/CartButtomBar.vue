<template>
<div class="bottom-bar">
    <div class="check-content">
        <checkButton 
        :is-checked="isSelectAll" 
        class="check-button"
        @click.native="checkClick"/>
        <span>全选</span>
    </div>
    <div class="price">
        合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
        去计算({{checkLength}})
    </div>
</div>
</template>
<script>
import checkButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
      checkButton
  },
  methods: {
      checkClick() {
          if (this.isSelectAll) {
              this.cartList.forEach(item => item.checked = false)
          } else {
              this.cartList.forEach(item => item.checked = true)

          }
      },
      calcClick() {
          if (!this.isSelectAll) {
              this.$toast.show('请选择购买的商品', 2000)
          }
      }
  },
  computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
          return '￥' + this.cartList.filter(item => {
              return item.checked
          }).reduce((preValue, item) => {
              return preValue + item.price * item.count
          }, 0).toFixed(2)
      },
      checkLength() {
          return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
          if (this.cartList.length === 0) return false
        //   return !(this.cartList.filter(item => !item.checked).length)
        return !this.cartList.find(item => !item.checked)
      }
  },
  data () {
    return {
    };
  }
}
</script>
<style scoped>
    .bottom-bar {
        position: relative;
        display: flex;

        height: 40px;
        line-height: 40px;
               
        background-color: #eee;

        font-size: 14px;
        
    }
    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;
    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .price {
        margin-left: 20px;
        flex: 1;
    }
    .calculate {
        width: 90px;
        background-color: #f00;
        color: #fff;
        text-align: center;
    }
</style>