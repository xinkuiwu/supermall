import axios from 'axios'

export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
        // baseURL:'http://123.207.32.32:8000',
        // baseURL: 'http://106.54.54.237:8000/api/w1',//0104
        baseURL: 'http://106.54.54.237:8000/api/hy', //0121
        timeout: 10000
    })
    //2、axios的拦截器
    instance.interceptors.request.use(config => {
        // console.log(config);
        return config;
    }, err => {
        // console.log
    })
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data;
    }, err => {
        console.log(err)
    })
    //3、发送真正的网络请求
     return instance(config)
}