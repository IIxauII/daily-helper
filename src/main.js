import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,

  render: function(h) {
    return h(App);
  }
}).$mount("#app");
