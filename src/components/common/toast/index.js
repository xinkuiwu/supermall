import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
    // document.body.appendChild(Toast.$el)
    // 上面的方式由于没挂载，el是undefined
    const toastConstuctor = Vue.extend(Toast)
    const toast = new toastConstuctor()
    toast.$mount(document.createElement('div'))
    document.body.appendChild(toast.$el)
     

    Vue.prototype.$toast = toast;
}


export default obj