<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" />
        <Scroll class="content" ref="scroll">
            <DetailSwiper :topImages="topImages"/>
            <DetailBaseInfo :goods="goods"/>
            <DetailShopInfo :shop="shop"/>
            <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <DetailParamInfo :param-info="paramInfo"/>
            <DetailCommentInfo :comment-info="commentInfo"/>
            <GoodsList :goods="recommends"/>
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
        recommends: []
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
         }
     })
      
      getRecommend().then(res => {
          this.recommends = res.data.list
      })
  },
  mounted() {
 
  },
  destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
  methods: {
      imageLoad() {
          this.$refs.scroll.refresh()
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