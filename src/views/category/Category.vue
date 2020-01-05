<template>
  <div class="wrapper">
      <ul class="content">
        <button @click="btnClick">按钮</button>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>   
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>   
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>    
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>  
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>    
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>    
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>    
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
        <li>分类列表</li>
      </ul>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'

export default {
  name: "Category",
  mounted() {
    this.scroll =new BScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        pullUpLoad: true,
        click: true
    })

    this.scroll.on('scroll', (position) => {
      // console.log(position);
    })

    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');  
    })
  },
  data () {
    return {
      scroll: null
    };
  },
  methods: {
    btnClick() {
      console.log('点了按钮')
    }
  }
}
</script>
<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;

     overflow: hidden;
     /* overflow-y: scroll;  */
  }
</style>