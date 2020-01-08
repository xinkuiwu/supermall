import {debounce} from 'common/utils'

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