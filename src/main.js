import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'amfe-flexible';
import VueLazyLoad from 'vue-lazyload';
import "swiper/dist/css/swiper.min.css";

Vue.use(VueLazyLoad, {
  error: require('./assets/images/lazy.jpg'),
  loading: require('./assets/images/lazy.jpg')
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
