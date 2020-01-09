import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    // components: {

    // },
    // methods: {

    // },
    data() {
        return {
            itemImgListener: null,
            refresh: null 
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () =>{
            this.refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
          },
    }
}