<template>
    <div class='tab-bar-item' @click='itemClick'>
        <div v-if='!isActive'><slot  name='item-icon'></slot></div>
        <div v-else ><slot   name='item-icon-active'></slot></div>
        <div :style='activeStyle'><slot name='item-text'></slot></div>
    </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
      path: String,
      activeColor :{
          type: String,
          default: 'red'
      }
  },
  data () {
    return {
       // isActive: false,
    }
  },
  computed: {
      isActive() {
        //this.$route.path活跃的path，this.path是item的各自的path
          return !this.$route.path.indexOf(this.path)
      },
      activeStyle() {
          return this.isActive? {color: this.activeColor} : {}
      }
  },
  methods: {
      itemClick() {
       this.$router.replace(this.path)                 
      }
  }
}
</script>
<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
  /* .active {
      color: red;
  } */
</style>