<template>
  <div id="cart">
      <nav-bar class="nav-bar">
        <div slot="center">
        购物车({{length}})
        </div>
      </nav-bar>
      <CartList />
      <CartBottomBar />
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartButtomBar'

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
      ...mapGetters({
        length: 'cartLength'
      })
  },
  data () {
    return {
    };
  }
}
</script>
<style scoped>
  #cart {
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
    
  }
</style>