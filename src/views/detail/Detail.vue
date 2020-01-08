<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"  @titleClick="titleClick"/>
        <Scroll class="content" ref="scroll">
            <DetailSwiper :topImages="topImages"/>
            <DetailBaseInfo :goods="goods"/>
            <DetailShopInfo :shop="shop"/>
            <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <DetailParamInfo ref="params" :param-info="paramInfo"/>
            <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
            <GoodsList ref="recommend" :goods="recommends"/>
        </Scroll>
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'


export default {
  name: "Detail",
  components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
   

  },
  mixins: [itemListenerMixin],
  data () {
    return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null
    };
  },
  created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        //   console.log(res.result.itemInfo.topImages)
         const data = res.result
         this.topImages = data.itemInfo.topImages
         this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
         this.shop = new Shop(data.shopInfo)
         this.detailInfo = data.detailInfo
         this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
         if (data.rate.cRate !== 0) {
             this.commentInfo = data.rate.list[0]
         this.getThemeTopY = debounce(() => {
            this.$nextTick(() => {
            this.themeTopYs = []
            
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            console.log(this.themeTopYs)
         })
         })
         }
     })
      
      getRecommend().then(res => {
          this.recommends = res.data.list
      })
  },
  mounted() {

  },
  updated() {
      
  },
  destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
  methods: {
      imageLoad() {
        //   this.$refs.scroll.refresh()//使用了下面的mixin防抖的refresh
          this.refresh()
          this.getThemeTopY()
        //下面是节流方式，上面用的是防抖动
        //     this.$nextTick(() => {
        //     this.themeTopYs = []
            
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //     // console.log(this.themeTopYs)
        //  })
      },
      titleClick(index) {
          console.log(index)
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      }
  }
}
</script>
<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px);
    }
</style>