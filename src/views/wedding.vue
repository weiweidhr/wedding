<template>
  <div class="home">
    <div class="loading_box" v-if="loading">
      <div><img src="../assets/images/loading.png" alt=""/></div>
      <p>努力加载中...</p>
    </div>
    <template v-else>
      <div class="page_box" v-if="!err.errmsg.length">
        <audio autoplay loop id="media">
          <source src="../assets/music/LostInParadies.mp3" type="audio/mpeg">
        </audio>
        <!--<img class="music" :class="{ 'move': move }" @click.self="control" src="../assets/images/yinfu.png" alt="">-->
        <cat :move="move"></cat>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list">
              <img v-lazy="item.url" alt="best wishes to you">
            </div>
          </div>
        </div>
      </div>
      <err v-else :errmsg="err.errmsg" :btnText="err.btnText" @handleErr="handleErr"></err>
    </template>

  </div>
</template>
<script>
import Swiper from "swiper";
import err from "../components/err.vue";
import cat from "../components/cat/cat.vue";
import mock from '../mock';

export default {
  name: "home",
  components: {
    err,
    cat
  },
  computed: {
    queryObj () {
//      return tools.parseQuery();
    }
  },
  data() {
    return {
      loading: false,
      err: {
        errmsg: '',
        btnText: '刷新'
      },
      list: [],
      swiper: null,
      move: true,
      option: {
        max: 60,
        now: 56,
        unit: 10,
        time: 20000
      }
    }
  },
  mounted() {
    let page = this;
    if (navigator.userAgent.indexOf('Android') > -1) {
      this.list = mock.photos;
    } else {
      this.allocation(10);
    }
    this.$nextTick(() => {
      setTimeout(function() {
        page.initSwiper();
        page.move = !document.getElementById("media").paused;
      }, 500);
    });
  },
  methods: {
    loadPhoto(n) {
      let page = this;
      for (let i = n - this.option.unit; i < n; i++) {
        if(i < this.option.now) {
          this.list.push({
            url: require(`../assets/images/${i}.jpg`)
          });
        } else {
          this.allocation = null;
        }
      }
      console.log('数量', page.list.length);
    },
    allocation(now = 10) {
      let page = this;
      page.loadPhoto(now);
      if(now < this.option.max) {
        setTimeout(function() {
          page.allocation(now + 10);
        }, page.option.time);
      }
    },
    handleErr() {
      window.location.reload();
    },
    control(data) {
      let m = document.getElementById("media");
      m.paused ? m.play() : m.pause();
      this.move = !this.move;
    },
    initSwiper() {
      if (this.swiper !== null) return;
      this.swiper = new Swiper(".swiper-container", {
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
          disableOnInteraction: false, // 手动滑动后是否禁止自动播放
          delay: 3000,
          stopOnLastSlide: false
        },
        fadeEffect: {
          crossFade: true,
        },
        effect: 'fade',
        observeParents: false,
        observer: true
      });
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/css/common.scss";
  .home{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #000;
  }
  .page_box{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .swiper-wrapper,.swiper-container,.swiper-wrapper,.swiper-slide{
    width: 100%;
    height: 100%;
  }
  .swiper-slide{
    @extend .flex_box;
    @extend .mid_center;
    background-color: #000;
    img{
      max-height: 100%;
      max-width: 100%;
    }
  }
/*  .music {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    z-index: 100;
  }
  .move{
    animation:
      animX 2s  cubic-bezier(0.36, 0, 0.64, 1) -1s infinite alternate,
      animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
      scale 4s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
  }
  @keyframes scale {
    0% {
      transform: scale(0.7)
    }
    50% {
      transform: scale(1)
    }
    100% {
      transform: scale(0.7)
    }
  }
  @keyframes animX {
    0% {right: 20px;}
    100% {right: 40px;}
  }
  @keyframes animY {
    0% {top: 20px;}
    100% {top: 24px;}
  }*/
  #media{
    position: absolute;
    left: -10px;
    top: -10px;
  }
</style>
