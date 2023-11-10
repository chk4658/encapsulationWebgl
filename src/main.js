import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import router from "./router";
import store from "./store";
import "@/styles/index.scss";

Vue.config.productionTip = false;

import "element-ui/lib/theme-chalk/index.css";

import resize from "vue-resize-directive";

Vue.use(Element, {
  size: "small", // set element-ui default size
});

Vue.directive("resize", resize);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
