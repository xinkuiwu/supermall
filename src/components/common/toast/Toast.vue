<template>
    <div class="toast" v-show="isShow">
        <div >
            {{message}}
        </div>
    </div>
</template>
<script>
export default {
  name: "Toast",
  props: {
    //   message: {
    //       type: String,
    //       default() {
    //           return ''
    //       }
    //   },
    //   isShow: {
    //       type: Boolean,
    //       default: false
    //   }
  },
  methods: {
      show(message='默认文字', duration=2000) {
          this.isShow = true;
          this.message = message;

          setTimeout(() => {
            this.isShow = false;
            this.message = '';
          }, duration)
      }
  },
  data () {
    return {
        message: '',
        isShow: false
    };
  }
}
</script>
<style scoped>
 .toast{
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     padding: 8px 10px;

     z-index: 99;

     background-color: rgba(0, 0, 0, .75);
     color: #fff;
 }
</style>