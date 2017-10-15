import Vue from 'vue/dist/vue.esm'
import Autocomplete from '../components/autocomplete.vue'
import Validator from '../components/validator.vue'

const app = new Vue({
  el: '#app',
  components: { Autocomplete, Validator }
});

