import {debounce} from 'common/utils'

export const itemListenerMixin = {
    // components: {

    // },
    // methods: {

    // },
    data() {
        return {
            itemImgListener: null 
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        this.itemImgListener = () =>{
            refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    }
}