import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/wedding",
      name: "wedding",
      meta: {
        title: "wedding"
      },
      component: () => import("./views/wedding.vue")
    },
    {
      path: "*",
      redirect: "/wedding"
    }
  ]
});
