import Vue from 'vue/dist/vue.esm'
// import VueResource from 'vue-resource'

import Autocomplete from '../components/autocomplete.vue'
import Validator from '../components/validator.vue'

// Vue.use(VueResource)

const app = new Vue({
  el: '#app',
  components: { Autocomplete, Validator }
});

