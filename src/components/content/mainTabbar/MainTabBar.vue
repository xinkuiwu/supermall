<template>
      <tab-bar>
          <TabBarItem path='/home' >
          <img slot='item-icon' src="~assets/img/tabbar/home.svg" alt="">
          <img slot='item-icon-active' src="~assets/img/tabbar/home_active.svg" alt="">
          <div slot='item-text' >首页</div>
          </TabBarItem>
          <TabBarItem path='/category' activeColor='blue'>
            <img slot='item-icon' src="~assets/img/tabbar/category.svg" alt="">
            <img slot='item-icon-active' src="~assets/img/tabbar/category_active.svg" alt="">
          <div slot='item-text' >分类</div>
          </TabBarItem>
          <TabBarItem path='/cart' activeColor='green'>
            <img slot='item-icon' src="~assets/img/tabbar/shopcart.svg" alt="">
            <img slot='item-icon-active' src="~assets/img/tabbar/shopcart_active.svg" alt="">
          <div slot='item-text' >购物车</div>
          </TabBarItem>
          <TabBarItem path='/profile'>
            <img slot='item-icon' src="~assets/img/tabbar/profile.svg" alt="">
            <img slot='item-icon-active' src="~assets/img/tabbar/profile_active.svg" alt="">
          <div slot='item-text' >我的</div>
          </TabBarItem>
      </tab-bar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  data () {
    return {
    };
  },
  components: {
    TabBar,
    TabBarItem,
  }
}
</script>
<style scoped>
</style>