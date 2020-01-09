<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"  @titleClick="titleClick" ref="nav"/>
        <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <DetailSwiper :topImages="topImages"/>
            <DetailBaseInfo :goods="goods"/>
            <DetailShopInfo :shop="shop"/>
            <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <DetailParamInfo ref="params" :param-info="paramInfo"/>
            <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
            <GoodsList ref="recommend" :goods="recommends"/>
        </Scroll>
          <DetailBottomBar @addCart="addToCart"/>
          <back-top @click.native="backClick" v-show="isShowBackTop"/>
          <!-- <Toast :message="message" :show="show"/> -->
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
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {BACKTOP_DISTANCE} from 'common/const'

import {mapActions} from 'vuex'

// import Toast from 'components/common/toast/Toast'

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
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast
   

  },
  mixins: [itemListenerMixin,backTopMixin],
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
        getThemeTopY: null,
        currentIndex: 0,
        // message: '',
        // show: false
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
            this.themeTopYs.push(Number.MAX_VALUE);
            // console.log(this.themeTopYs)
           
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
      ...mapActions(['addCart']),
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
        //   console.log(index)
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
          const positionY = -position.y

          let length = this.themeTopYs.length
          for(let i = 0; i < length - 1; i++) {
              if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))
                this.currentIndex = i
                this.$refs.nav.currentIndex = this.currentIndex
        }
        this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
      },
      addToCart() {
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        
        this.addCart(product).then(res => {
          // this.show = true;
          // this.message = res;

          // setTimeout(() => {
          //   this.show = false;
          //   this.message = ''
          // }, 1500)
       
          this.$toast.show(res)
        })


        // this.$store.commit('addCart', product)
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })

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
        background-color: #fff;
        height: calc(100% - 44px - 49px);
    }
</style>