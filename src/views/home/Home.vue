<template>
  <div id ="home">
      <nav-bar class ="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed" 
         />      
      <scroll class="content" 
              ref="scroll" 
              :probe-type="3" 
              @scroll="contentScroll"
              :pull-up-load='true'
              @pullingUp="loadMore"
             
              >
        <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <RecommendView :recommends="recommends"/>
        <FeatureView/>
        <tab-control :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2" 
         />
        <goods-list :goods="showGoods" />
      </scroll>  
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';
  
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';
  import BackTop from 'components/content/backTop/BackTop'


  import {getHomeMultidata, 
          getHomeGoods
          } from 'network/home';
  import {debounce} from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'
  

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView, 
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        // itemImgListener: null  也是放入mixin里了
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created(){
      // 请求多个数据
      this.getHomeMultidata();
      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
  

    },
    mounted() {
      // 下面的东西写在mixin里面了。
      //   // 防抖动包装
      //   const refresh = debounce(this.$refs.scroll.refresh, 50)
      //   // 监听item中图片加载完成（使用事件总线）
      //   this.itemImgListener = () => {
      //     refresh()          
      // }
      //   this.$bus.$on('itemImgLoad', this.itemImgListener)       
    },
    activated() {
      // console.log('shouyewiezhi')
      // console.log(this.saveY)
      //这里得设置一定时间，不然可能会回到顶部
      this.$refs.scroll.scrollTo(0, this.saveY, 0) 
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      /**
       * 事件监听的方法
       */

      tabClick(index) {
       switch(index) {
         case 0:
           this.currentType = 'pop';
           break;
          case 1:
           this.currentType = 'new';
           break;
          case 2:
           this.currentType = 'sell';
           break;                 
       }
       this.$refs.tabControl1.currentIndex = index;
       this.$refs.tabControl2.currentIndex = index;

      },
      contentScroll(position) {
        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 决定tabControl是否吸顶（position: fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      //最后那个scroll才是真正的scroll对象，前面的scroll是ref的特指
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 以下是网路请求的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
            this.goods[type].list.push(...res.data.list);

            this.goods[type].page += 1;
            // console.log(this.goods[type].list);
            this.$refs.scroll.finishPullUp();
        })
               
      }
    }

  }
</script>
<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;  */
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: calc(100% - (44px + 49px));
    overflow: hidden;
    margin-top: 44px;
  } */
</style>