<template>
    <div class="cart-list">
        <Scroll class="content" ref="scroll">
            <CartListItem v-for="(item, index) in cartList"
            :key="index"
            :itemInfo="item"/>
        </Scroll>
    </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  components: {
      Scroll,
      CartListItem
  },
  computed: {
      ...mapGetters(['cartList'])
  },
  activated() {
      this.$refs.scroll.refresh()
  },
  data () {
    return {
    };
  }
}
</script>
<style scoped>
    .cart-list {
        height: calc(100% - 44px - 49px - 40px);
    }
    .content {
        height: 100%;
        overflow: hidden;
    }
</style>